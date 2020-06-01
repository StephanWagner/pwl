var app = {

  // Default random password settings
  defaultRandomPasswordSettings: {
    length: 16,
    uppercase: true,
    uppercaseChars: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: true,
    lowercaseChars: 'abcdefghijklmnopqrstuvwxyz',
    numbers: true,
    numbersChars: '0123456789',
    special: false,
    specialChars: '§±!@#$%^&*()-_=+[{]};:\'"\\|`~<,>.?/'
  }

};

$(document).ready(function () {

  // Textarea focus
  $('.edit__content-input').on('focus', function () {
    app.editTextareaBlurTimeout && clearTimeout(app.editTextareaBlurTimeout);
    $('.edit__textarea-options').addClass('enabled');
  }).on('blur', function () {
    app.editTextareaBlurTimeout = setTimeout(function () {
      $('.edit__textarea-options').removeClass('enabled');
    }, 200);
  });

  // Modal options
  var defaultModalOptions = {
    addClass: 'modal-vaulty',
    width: 620,
    height: 560,
    adjustDistance: 16,
    closeButton: 'title',
    getTitle: 'data-title'
  };

  // Edit modal
  new jBox('Modal', $.extend(defaultModalOptions, {
    addClass: 'modal-vaulty modal-vaulty--edit',
    attach: '[data-modal="edit"]',
    content: $('.modal-content--edit'),
    isolateScroll: false,
    onOpen: function () {
      if (!this.titleInitialized) {
        updateModalCloseIcon(this.titleContainer);
      }

      var sourceId = this.source.attr('data-id');
      var id = (sourceId === 'new') ? '' : sourceId;
      var title = (sourceId === 'new') ? '' : $('[data-password-title="' + id + '"]').html().trim();
      var content = (sourceId === 'new') ? '' : $('[data-password-content="' + id + '"]').html().trim();

      $('.edit__id-input').val(id);
      $('.edit__title-input').val(title);
      $('.edit__content-input').val(content);
    }
  }));

  // Passwords modal
  new jBox('Modal', $.extend(defaultModalOptions, {
    addClass: 'modal-vaulty modal-vaulty--passwords',
    attach: '[data-modal="passwords"]',
    content: $('.modal-content--passwords'),
    onOpen: function () {
      if (!this.titleInitialized) {
        updateModalCloseIcon(this.titleContainer);
      }
      createRandomPasswords();

      // Add buttons
      if (!this.titleInitialized) {
        this.titleContainer.prepend(
          $('<div class="modal-title__button modal-title__button--settings button-link"/>')
          .html('<span class="modal-title__icon modal-title__icon--options material-icons-sharp" onclick="toggleRandomPasswordOptions()">settings</span>')
        );
        this.titleContainer.prepend(
          $('<div class="modal-title__button modal-title__button--refresh button-link"/>')
          .html('<span class="modal-title__icon modal-title__icon--refresh material-icons-sharp">refresh</span>')
          .on('click', function () {
            createRandomPasswords();
          })
        );
        updateModalCloseIcon(this.titleContainer);
        this.titleInitialized = true;
      }

      // Update slider
      requestAnimationFrame(
        function () {
          $('.random-password__length-option').rangeslider('update', true);
        }
      );
      var settings = getPasswordSettings();
      $('.random-passwords__length-option-amount').html(settings.length);
    },
    onCreated: function () {
      updateRandomPasswordOptions();
    }
  }));

  // Init password length slider
  $('.random-password__length-option').rangeslider({
    polyfill: false,
    onSlide: function (position, value) {
      $('.random-passwords__length-option-amount').html(value);
    },
    onSlideEnd: function (position, value) {
      setPasswordOption('length', value);
      createRandomPasswords();
    }
  });

});

// Toggle remember login
function toggleRememberLogin() {
  var remember = $('#login-remember').val() === '1';
  remember = !remember;
  $('#login-remember').val(remember ? '1' : '0')
  $('.login__checkbox-wrapper')[remember ? 'addClass' : 'removeClass']('active');
}

// Update jBox close icon
function updateModalCloseIcon(el) {
  el.find('.jBox-closeButton')
    .addClass('modal-title__button modal-title__button--close button-link')
    .html('<span class="modal-title__icon modal-title__icon--close material-icons-sharp">close</span>');
}

// Toggle random password options
function toggleRandomPasswordOptions() {
  $('.modal-vaulty--passwords').toggleClass('password-options-active');
  $('.modal-title__button--settings').toggleClass('active');
}

// Create random passwords
function createRandomPasswords() {
  $('.random-passwords__list').html('');

  for (var i = 1; i <= 10; i++) {
    var password = getRandomPassword();

    $('.random-passwords__list').append(
      $('<div class="random-passwords__password button-link-container"/>').append(
        $('<div class="random-passwords__password-text"/>').text(password)
      ).append(
        $('<div class="random-passwords__copy-button button-link"/>')
        .html('<span class="random-passwords__copy-button-icon material-icons-sharp">file_copy</span>')
      ).on('click', function () {
        copyPassword(this);
      })
    );
  }

  var permutations = countPermutations();
  permutations = stringifyNumber(permutations);
  $('.random-passwords__probability-wrapper a').html(permutations);
}

// Copy password
function copyPassword(wrapper) {
  $(wrapper).addClass('used');
  animateEl($(wrapper).find('.random-passwords__copy-button-icon'), 'pulseUp');
  var password = $(wrapper).find('.random-passwords__password-text').html();
  copyToClipboard(password);
  new jBox('Notice', {
    color: 'green',
    stack: true,
    delayOnHover: false,
    autoClose: 4000,
    attributes: {
      x: 'right',
      y: 'bottom'
    },
    content: 'Password copied to clipboard' // TODO translate
  });
}

// Create a random password
function getRandomPassword() {
  var settings = getPasswordSettings();

  // Determine length
  var length = settings.length;

  // Create characters map
  var characters = getCharacterMap();

  // Create must contain list
  var mustContain = [];
  var activeOptions = getActiveRandomPasswordOptions();
  var containRatio = activeOptions / (activeOptions + 1) / activeOptions;
  var containAmount = Math.floor(containRatio * length);

  $.each(['uppercase', 'lowercase', 'numbers', 'special'], function (index, item) {
    if (settings[item]) {
      for (var i = 1; i <= containAmount; i++) {
        mustContain.push(getRandomChar(settings[item + 'Chars']));
      }
    }
  });

  // Fill must contain list
  while (mustContain.length < length) {
    mustContain.push(getRandomChar(characters));
  }

  // Create password
  var password = '';
  while (mustContain.length) {
    var index = Math.floor(Math.random() * mustContain.length);
    password += mustContain[index];
    mustContain.splice(index, 1);
  }

  // Return password
  return password;
}

// Get password settings
function getPasswordSettings() {
  return app.defaultRandomPasswordSettings; // TODO
}

// Get the characters usable for the password
function getCharacterMap() {
  var settings = getPasswordSettings();
  var characters = '';
  settings.uppercase && (characters += settings.uppercaseChars);
  settings.lowercase && (characters += settings.lowercaseChars);
  settings.numbers && (characters += settings.numbersChars);
  settings.special && (characters += settings.specialChars);
  return characters;
}

// Pick a ramdom character from a string
function getRandomChar(str) {
  return str.charAt(Math.floor(Math.random() * str.length));
}

// Update the password options
function updateRandomPasswordOptions() {
  var settings = getPasswordSettings();
  $.each(['uppercase', 'lowercase', 'numbers', 'special'], function (index, item) {
    var wrapperClass = '.random-passwords-options__label-container[data-option="' + item + '"]';
    var active = !!settings[item];
    $(wrapperClass)[active ? 'addClass' : 'removeClass']('active');
    $(wrapperClass + ' .random-passwords-options__checkbox-icon').html(active ? 'check_box' : 'check_box_outline_blank');
  });
  $('.random-password__length-option').val(settings.length).change();
  createRandomPasswords();
}

// Toggle a random password option
function toggleRandomPasswordOption(id) {
  var settings = getPasswordSettings();

  if (settings[id]) {
    var activeOptions = 0;
    $.each(['uppercase', 'lowercase', 'numbers', 'special'], function (index, item) {
      if (settings[item]) {
        activeOptions++;
      }
    });

    if (activeOptions <= 1) {
      animateEl($('.random-passwords-options__label-container[data-option="' + id + '"]'), 'shake');
      return false;
    }
  }

  setPasswordOption(id, !settings[id]);
  updateRandomPasswordOptions();
}

// Set a possword option
function setPasswordOption(option, value) {
  var settings = getPasswordSettings();
  settings[option] = value;
}

// Get amount of toggled permutations
function getActiveRandomPasswordOptions() {
  var settings = getPasswordSettings();
  var activeOptions = 0;
  $.each(['uppercase', 'lowercase', 'numbers', 'special'], function (index, item) {
    if (settings[item]) {
      activeOptions++;
    }
  });
  return activeOptions;
}

// Count permutations
function countPermutations() {
  var settings = getPasswordSettings();
  var characters = getCharacterMap();
  var charactersAmount = characters.length;
  var passwordLength = settings.length;
  var permutations = charactersAmount;

  while (passwordLength > 1) {
    permutations = permutations * charactersAmount;
    passwordLength--;
  }
  return permutations;
}

// Show a large number in text
function stringifyNumber(number) {

  // Validate input
  if (!number) {
    return null;
  }

  // Number names
  var numberNames = [
    'Thousand',
    'Million',
    'Billion',
    'Trillion',
    'Quadrillion',
    'Quintillion',
    'Sextillion',
    'Septillion',
    'Octillion',
    'Nonillion',
    'Decillion',
    'Undecillion',
    'Duodecillion',
    'Tredecillion',
    'Quattuordecillion',
    'Quindecillion',
    'Sexdecillion',
    'Septendecillion',
    'Octodecillion',
    'Novemdecillion',
    'Vigintillion',
    'Centillion',
    'Vigintillion',
    'Unvigintillion',
    'Duovigintillion',
    'Trevigintillion',
    'Quattuorvigintillion',
    'Quinvigintillion',
    'Sexvigintillion',
    'Septenvigintillion',
    'Octovigintillion',
    'Novemvigintillion',
    'Trigintillion',
    'Untrigintillion',
    'Duotrigintillion'
  ];

  // Return rounded number when not at least a billion
  if (number < 1000 * 1000 * 1000) {
    return number.toLocaleString();
  }

  // Get the number as a string
  var numberStr = number.toLocaleString('fullwide', {
    useGrouping: false
  });
  var numberStrOrg = numberStr;

  // Start a index null;
  var index = 0;

  // Keep looping when string is at least 4 chars
  while (numberStr.length >= 4) {
    numberStr = numberStr.substring(0, numberStr.length - 3);
    index++;
  }

  // Add decimals
  var decimal = numberStrOrg.substring(numberStr.length, numberStr.length + 1);
  if (numberStr.length <= 2 && decimal != 0) {
    numberStr += '.' + numberStrOrg.substring(numberStr.length, numberStr.length + 1);
  }

  // Substract 2 from index to fix wrong numbers
  index = index - 1;

  return numberStr + ' ' + numberNames[index];
}

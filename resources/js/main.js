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

  // Modal options
  var defaultModalOptions = {
    addClass: 'modal-vaulty',
    width: 620,
    height: 560,
    adjustDistance: 16,
    closeButton: 'title',
    getTitle: 'data-title',
    onOpen: function () {
      if (!this.titleInitialized) {
        updateModalCloseIcon(this.titleContainer);
      }
    }
  };

  // Create new modal
  new jBox('Modal', $.extend(defaultModalOptions, {
    addClass: 'modal-vaulty modal-vaulty--add',
    attach: '[data-modal="add"]',
    content: $('.modal-content--add')
  }));

  // Passwords modal
  new jBox('Modal', $.extend(defaultModalOptions, {
    addClass: 'modal-vaulty modal-vaulty--passwords',
    attach: '[data-modal="passwords"]',
    content: $('.modal-content--passwords'),
    onOpen: function () {
      createRandomPasswords();

      // Add buttons
      if (!this.titleInitialized) {
        this.titleContainer.prepend(
          $('<div class="modal-title__button modal-title__button--settings button-link"/>')
          .html('<span class="modal-title__icon modal-title__icon--options material-icons-sharp">settings</span>')
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
    },
    onCreated: function () {
      updateRandomPasswordOptions();
    }
  }));

  // Init password length slider
  $('.random-password__length-option').rangeslider({
    polyfill : false,
    onSlideEnd: function(position, value) {
      setPasswordOption('length', value);
      createRandomPasswords();
    }
  });

});

// Update jBox close icon
function updateModalCloseIcon(el) {
  el.find('.jBox-closeButton')
    .addClass('modal-title__button modal-title__button--close button-link')
    .html('<span class="modal-title__icon modal-title__icon--close material-icons-sharp">close</span>');
}

// Create random passwords
function createRandomPasswords() {
  $('.random-passwords__list').html('');

  for (var i = 1; i <= 10; i++) {
    var password = getRandomPassword();

    $('.random-passwords__list').append(
      $('<div class="random-passwords__password"/>').text(password)
    );
  }

  var permutations = countPermutations();
  permutations = stringifyNumber(permutations);
  $('.random-passwords__probability-wrapper a').html(permutations);

  // https://simple.wikipedia.org/wiki/Names_for_large_numbers
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

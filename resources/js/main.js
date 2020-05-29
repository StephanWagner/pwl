var app = {

  // Default random password settings
  defaultRandomPasswordSettings: {
    length: 26,
    uppercase: true,
    uppercaseMin: 6,
    uppercaseChars: 'ABCDEFGHIJKLMNOPQRSTUVW',
    lowercase: true,
    lowercaseMin: 6,
    lowercaseChars: 'abcdefghijklmnopqrstuvw',
    numbers: true,
    numbersMin: 6,
    numbersChars: '0123456789',
    special: false,
    specialMin: 3,
    specialChars: '§±!@#$%^&*()_-+=[]{}:;"\'|\\~<>,.?/',
    separators: true,
    separatorChar: '_',
    separatorsAmount: 2
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
    getTitle: 'data-title'
  };

  // Create new modal
  new jBox('Modal', $.extend(defaultModalOptions, {
    attach: '[data-modal="add"]',
    content: $('.modal-content--add')
  }));

  // Passwords modal
  new jBox('Modal', $.extend(defaultModalOptions, {
    attach: '[data-modal="passwords"]',
    content: $('.modal-content--passwords'),
    onOpen: function () {
      createRandomPasswords();

      if (!this.titleInitialized) {

        this.titleContainer.before(
          $('<div class="modal-title__button modal-title__button--settings button-link"/>')
          .html('<span class="modal-title__icon modal-title__icon--options material-icons">settings</span>')
        );

        this.titleContainer.before(
          $('<div class="modal-title__button modal-title__button--refresh button-link"/>')
          .html('<span class="modal-title__icon modal-title__icon--refresh material-icons">refresh</span>')
          .on('click', function () {
            createRandomPasswords();
          })
        );

        this.titleContainer.find('.jBox-closeButton')
          .addClass('modal-title__button modal-title__button--close button-link')
          .html('<span class="modal-title__icon modal-title__icon--close material-icons">close</span>');

        this.titleInitialized = true;
      }
      console.log(this.wrapper.find('.jBox-title'));
    }
  }));

});

// Create random passwords
function createRandomPasswords() {
  $('.random-passwords__wrapper').html('');

  for (var i = 1; i <= 10; i++) {
    var password = getRandomPassword();

    $('.random-passwords__wrapper').append(
      $('<div class="random-passwords__password"/>').text(password)
    );
  }

  //var permutations = countPermutations();

  //permutations = stringifyNumber(permutations);

  //console.log(permutations);
}

// Create a random password
function getRandomPassword() {
  var settings = getPasswordSettings();

  // Determine length
  var length = settings.length;
  settings.separators && (length -= settings.separatorsAmount);

  // Create characters map
  var characters = getCharacterMap();

  // Create must contain list
  var mustContain = [];
  $.each(['uppercase', 'lowercase', 'numbers', 'special'], function (index, item) {
    if (settings[item] && settings[item + 'Min'] > 0) {
      for (var i = 1; i <= settings[item + 'Min']; i++) {
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

  // Add separators
  if (settings.separators) {
    var regex = new RegExp('.{1,' + Math.floor(password.length / (settings.separatorsAmount + 1)) + '}', 'g');
    var passwordSplit = password.match(regex);
    password = passwordSplit.join(settings.separatorChar, passwordSplit);
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

// Count permutations
// TODO There is for sure a better algorithm
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

// Function
function stringifyNumber(number) {

  var numberNames = [
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
    'Centillion'
  ];


  console.log(number);

  var numberStr = number.toLocaleString('fullwide', {
    useGrouping: false
  });

  console.log(numberStr);

  while (numberStr) {

  }

  //number = number.toLocaleString('fullwide', { useGrouping: false });

  //console.log(number);

  /*
  Million	106	106	✓	✓	✓	✓	✓	✓	✓	✓	✓
  Billion	109	1012	✓	✓	✓	✓	✓	✓	✓	✓	✓
  Trillion	1012	1018	✓	✓	✓	✓	✓	✓	✓	✓	✓
  Quadrillion	1015	1024	✓	✓	 	✓	✓	✓	✓	✓	✓
  Quintillion	1018	1030	✓	✓	 	✓	✓	✓	✓	✓	✓
  Sextillion	1021	1036	✓	✓	 	✓	✓	✓	✓	✓	✓
  Septillion	1024	1042	✓	✓	 	✓	✓	✓	✓	✓	✓
  Octillion	1027	1048	✓	✓	 	✓	✓	✓	✓	✓	✓
  Nonillion	1030	1054	✓	✓	 	✓	✓	✓	✓	✓	✓
  Decillion	1033	1060	✓	✓	 	✓	✓	✓	✓	✓	✓
  Undecillion	1036	1066	✓	✓	 	 	 	✓	 	✓	✓
  Duodecillion	1039	1072	✓	✓	 	 	 	✓	 	✓	✓
  Tredecillion	1042	1078	✓	✓	 	 	 	✓	 	✓	✓
  Quattuordecillion	1045	1084	✓	 	 	 	 	✓	 	✓	✓
  Quindecillion	1048	1090	✓	✓	 	 	 	✓	 	✓	✓
  Sexdecillion	1051	1096	✓	✓	 	 	 	✓	 	✓	✓
  Septendecillion	1054	10102	✓	✓	 	 	 	✓	 	✓	✓
  Octodecillion	1057	10108	✓	✓	 	 	 	✓	 	✓	✓
  Novemdecillion	1060	10114	✓	✓	 	 	 	✓	 	✓	✓
  Vigintillion	1063	10120	✓	✓	 	✓	✓	✓	✓	✓	✓
  Centillion
  */
}


// TODO remve
function commarize() {
  // 1e6 = 1 Million, begin with number to word after 1e6.
  if (this >= 1e6) {
    var units = [
      "Million",
      "Billion",
      "Trillion",
      "Quadrillion",
      "Quintillion",
      "Sextillion",
      "Septillion",
      "Octillion",
      "asdasd"
      // ... Put others here, you can look them up here:
      // http://bmanolov.free.fr/numbers_names.php
      // If you prefer to automate the set of numbers, look at the number vocabulary:
      // https://gist.github.com/MartinMuzatko/1b468b7596c71e83838c
      // Javascript allows plain numbers to a maximum of ~1.79e308
    ]

    // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
    var unit = Math.floor((this / 1000).toFixed(0).toString().length)
    // Calculate the remainder. 1,000,000 = 1.000 Mill
    var num = (this / ('1e' + (unit + 2))).toFixed(3)
    var unitname = units[Math.floor(unit / 3) - 1]
    // output number remainder + unitname
    return num + ' ' + unitname
  }

  // Split floating number
  var parts = this.toString().split(".")
  // Only manipulate first part (not the float number)
  // If you prefer europe style numbers, you can replace . with ,
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return parts.join(".")
}
Number.prototype.commarize = commarize;

// Animations
var animationSpeeds = {
  'tada': 1000,
  'tadaSmall': 1000,
  'flash': 500,
  'shake': 400,
  'pulseUp': 250,
  'pulseDown': 250,
  'popIn': 250,
  'popOut': 250,
  'fadeIn': 200,
  'fadeOut': 200
};

function animateEl(element, animation, complete) {
  if (!element instanceof jQuery || !$(element).length || !animation) return null;

  if (element.data('animating')) {
    element.removeClass(element.data('animating')).data('animating', null);
    element.data('animationTimeout') && clearTimeout(element.data('animationTimeout'));
  }

  element.addClass('animated-' + animation).data('animating', 'animated-' + animation);
  element.data('animationTimeout', setTimeout((function () {
    element.removeClass(element.data('animating')).data('animating', null);
    complete && complete();
  }), animationSpeeds[animation]));
}

// Copy to clipboard
function copyToClipboard(text) {
  var input = document.createElement('input');
  input.setAttribute('value', text);
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, 1000);
  var result = document.execCommand('copy');
  document.body.removeChild(input);
  return result;
}

// Show messages
function message(color, txt) {
  new jBox('Notice', {
    color: color,
    stack: true,
    delayOnHover: false,
    autoClose: 4000,
    attributes: {
      x: 'right',
      y: 'bottom'
    },
    content: txt
  });
}

function error(txt) {
  message('red', txt || 'Oops, an error occured!'); // TODO translate
}

function success(txt) {
  message('green', txt)
}

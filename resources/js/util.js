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
  message('red', txt || __('errorMessageUnknown'));
}

function success(txt) {
  message('green', txt)
}

// Add textarea options
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
function insertMetachars(tag) {
  if (!$('.edit__textarea-options').hasClass('enabled')) {
    return false;
  }

  var sStartTag;
  var sEndTag;
  var oMsgInput = $('.edit__content-input')[0];
  var nSelStart = oMsgInput.selectionStart;
  var nSelEnd = oMsgInput.selectionEnd;
  var sOldText = oMsgInput.value;
  var selected = sOldText.substring(nSelStart, nSelEnd);
  switch (tag) {
    case 'b':
    case 'i':
    case 'u':
    case 's':
      sStartTag = '<' + tag + '>';
      sEndTag = '</' + tag + '>';
      break;
    case 'a':
      sStartTag = '<a href="' + selected + '" target="_blank">';
      sEndTag = '</a>';
      break;
  }
  var bDouble = sStartTag && sEndTag;
  oMsgInput.value = sOldText.substring(0, nSelStart) + (bDouble ? sStartTag + selected + sEndTag : sStartTag) + sOldText.substring(nSelEnd);
  oMsgInput.setSelectionRange(bDouble || nSelStart === nSelEnd ? nSelStart + sStartTag.length : nSelStart, (bDouble ? nSelEnd : nSelStart) + sStartTag.length);
  oMsgInput.focus();
}

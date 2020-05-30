// Domready
$(document).ready(function () {
  $('.edit-textfield').on('change input', function () {
    $(this).removeClass('error');
  });
});

// Save
function save() {
  var id = $('.edit__id-input').val();
  var title = $('.edit__title-input').val().trim();
  var content = $('.edit__content-input').val().trim();

  // Abort if no data
  if (!title || !content) {
    if (!title) {
      $('.edit__title-input').addClass('error');
    }
    if (!content) {
      $('.edit__content-input').addClass('error');
    }
    animateEl($('.edit__button'), 'shake');
    return false;
  }

  $.ajax({
    url: '/save',
    method: 'post',
    data: {
      id: id,
      title: title,
      content: content
    },
    headers: {
      'X-CSRF-TOKEN': $('.modal-content--edit [name="_token"]').val()
    },
    beforeSend: function () {
      $('.edit__button').attr('disabled', 'disabled').addClass('loading-bar');
    },
    complete: function () {
      $('.edit__button').removeAttr('disabled').removeClass('loading-bar');
    },
    success: function () {

    },
    error: function () {
      ajaxError();
    }
  });
}

// Ajax error
function ajaxError() {
  new jBox('Notice', {
    color: 'red',
    stack: true,
    delayOnHover: false,
    autoClose: 4000,
    attributes: {
      x: 'right',
      y: 'bottom'
    },
    content: 'Notwork error' // TODO translate
  });
}

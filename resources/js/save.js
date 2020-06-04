// Domready
$(document).ready(function () {
  $('.textfield').on('change input', function () {
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
      $('.edit-textfield').attr('disabled', 'disabled');
      $('.edit__button').attr('disabled', 'disabled').addClass('loading-bar');
    },
    complete: function () {
      $('.edit-textfield').removeAttr('disabled');
      $('.edit__button').removeAttr('disabled').removeClass('loading-bar');
    },
    success: function (response) {
      if (!response || response.error) {
        error(response.error);
        return;
      }

      if (response.success && response.id) {
        $('.passwords__none-created').removeClass('active');

        $('.edit__id-input').val(response.id);
        success(__('successMessageDataSaved'));

        $('.edit__title-input').val(response.title);
        $('.edit__content-input').val(response.content);

        if ($('.passwords__item-wrapper[data-id="' + response.id + '"]')) {
          $('[data-password-title="' + id + '"]').html(response.title);
          $('[data-password-content="' + id + '"]').html(response.content);
        } else {
          // TODO add element to top
        }
        return;
      }

      error();
    },
    error: function () {
      ajaxError();
    }
  });
}

// Ajax error
function ajaxError() {
  error(__('errorMessageNetwork'));
}

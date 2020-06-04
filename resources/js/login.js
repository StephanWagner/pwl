$(document).ready(function () {

  $('.login__button-input').on('click', function () {
    login();
  });

});

// Save user
function login() {
  var username = $('.login__username-input').val().trim();
  var password = $('.login__password-input').val();

  // Abort if no data
  if (
    !username ||
    !password
  ) {
    if (!username) {
      $('.login__username-input').addClass('error');
    }
    if (!password) {
      $('.login__password-input').addClass('error');
    }
    animateEl($('.login__button-input'), 'shake');
    return false;
  }

  $.ajax({
    url: '/loginRequest',
    method: 'post',
    data: {
      username: username,
      password: password
    },
    headers: {
      'X-CSRF-TOKEN': $('.csrf-token [name="_token"]').val()
    },
    beforeSend: function () {
      $('.login__error').html('&nbsp;');
      $('.login__textfield .textfield').attr('disabled', 'disabled');
      $('.login__button-input').attr('disabled', 'disabled').addClass('loading-bar');
    },
    success: function (response) {
      if (response.success) {
        window.location.href = '/';
        return;
      } else {
        $('.login__textfield .textfield').removeAttr('disabled');
        $('.login__button-input').removeAttr('disabled').removeClass('loading-bar');
      }

      if (!response || response.error) {
        if (response.error) {
          $('.login__error').html(response.error);
        } else {
          error();
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

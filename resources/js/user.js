$(document).ready(function () {

  $('.user__button-input').on('click', function () {
    saveUser();
  });

});

// Save user
function saveUser() {
  var id = $('.user__id-input').val();
  var username = $('.user__username-input').val().trim();
  var name = $('.user__name-input').val().trim();
  var email = $('.user__email-input').val().trim();
  var password = $('.user__password-input').val();
  var setup = $('.user__setup-input').val();

  // Abort if no data
  if (
    !username ||
    !name ||
    !email ||
    (setup && !password)
  ) {
    if (!username) {
      $('.user__username-input').addClass('error');
    }
    if (!name) {
      $('.user__name-input').addClass('error');
    }
    if (!email) {
      $('.user__email-input').addClass('error');
    }
    if (!password) {
      $('.user__password-input').addClass('error');
    }
    animateEl($('.user__button-input'), 'shake');
    return false;
  }

  $.ajax({
    url: '/saveUserRequest',
    method: 'post',
    data: {
      id: id,
      username: username,
      name: name,
      email: email,
      password: password
    },
    headers: {
      'X-CSRF-TOKEN': $('.user__wrapper [name="_token"]').val()
    },
    beforeSend: function () {
      $('.user__error').removeClass('active').html();
      $('.user__textfield .textfield').attr('disabled', 'disabled');
      $('.user__button-input').attr('disabled', 'disabled').addClass('loading-bar');
    },
    complete: function () {
      $('.user__textfield .textfield').removeAttr('disabled');
      $('.user__button-input').removeAttr('disabled').removeClass('loading-bar');
    },
    success: function (response) {
      if (!response || response.error) {
        if (response.error && response.errors && response.errors.length) {
          $('.user__error').addClass('active').html();
          $.each(response.errors, function (index, error) {
            $('.user__error').append(
              $('<div/>').html(error)
            );
          });
        }
        return;
      }

      if (response.success) {
        // When setting up user go to home
        if (response.setup) {
          window.location.href = '/';
          return;
        }

        // Otherwise show success notice
        $('.header__name').html(name);
        success(__('successMessageUserDataSaved'));
        return;
      }

      error();
    },
    error: function () {
      ajaxError();
    }
  });
}

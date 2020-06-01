function deleteItem (id) {
  $.ajax({
    url: '/delete',
    method: 'post',
    data: {
      id: id
    },
    headers: {
      'X-CSRF-TOKEN': $('.modal-content--edit [name="_token"]').val()
    },
    beforeSend: function () {
      $('.modal-delete__button--submit').attr('disabled', 'disabled').addClass('loading-bar');
    },
    complete: function () {
      $('.modal-delete__button--submit').removeAttr('disabled').removeClass('loading-bar');
    },
    success: function (response) {
      if (!response || response.error) {
        error(response.error);
        return;
      }

      if (response.success && response.id) {
        success(__('successMessageItemDeleted'));
        $('.passwords__item-wrapper[data-id="' + response.id + '"]').remove();
        app.deleteModal.close();
        return;
      }

      error();
    },
    error: function () {
      ajaxError();
    }
  });
}

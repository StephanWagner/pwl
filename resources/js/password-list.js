app.contentSlideSpeed = 300;

// Toogle password content
function togglePasswordContent(id) {
  if ($('.passwords__item-wrapper[data-id="' + id + '"]').hasClass('list-item-active')) {
    closeActivePasswordContent();
    return;
  }
  closeActivePasswordContent();
  openPasswordContent(id);
}

// Open password content
function openPasswordContent(id) {
  var item = $('.passwords__item-wrapper[data-id="' + id + '"]');

  if (!item) {
    return;
  }

  item.addClass('list-item-active');
  item.find('.passwords__content-wrapper').slideDown(app.contentSlideSpeed);
}

// Close currently active password content
function closeActivePasswordContent() {
  var item = $('.passwords__item-wrapper.list-item-active');

  if (!item) {
    return;
  }

  item.removeClass('list-item-active');
  item.find('.passwords__content-wrapper').slideUp(app.contentSlideSpeed);
}

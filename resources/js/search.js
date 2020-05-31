$(document).ready(function () {
  $('.search__textfield').on('focus', function () {
    $(this).addClass('active');
  }).on('blur', function () {
    if ($(this).val().trim() === '') {
      $(this).removeClass('active');
    }
  }).on('change input', function () {
    closeActivePasswordContent();
    var searchValue = $(this).val().trim();

    $.each($('.passwords__item-wrapper'), function (index, item) {
      var item = $(item);
      // var itemId = item.attr('data-id');
      var title = item.find('.passwords__title').text();
      var content = item.find('.passwords__content').text();
      var reg = new RegExp(searchValue, 'i');

      if (
        title.match(reg) ||
        content.match(reg)
      ) {
        item.removeClass('search-filtered');
      } else {
        item.addClass('search-filtered');
      }
    });
  });

});

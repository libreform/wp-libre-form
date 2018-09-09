(function($) {
  var menu = $('.wplf-plugins-menu');
  var pages = $('.wplf-plugins-page');
  var previousItem = localStorage.getItem('wplf-plugins-page-last-active-tab') || 'General';

  menu.on('click', '.nav-tab', function(e) {
    var item = $(e.target);
    var page = item.attr('data-page');
    var target = $('.wplf-plugins-page[data-page="' + page + '"]');

    item.siblings().removeClass('nav-tab-active');
    item.addClass('nav-tab-active');

    pages.hide();
    target.show();

    try {
      localStorage.setItem('wplf-plugins-page-last-active-tab', page);
    } catch (e) {
      // No one cares. Safari just throws in PB.
      // The tab remember feature just won't work.
      console.error(e);
    }
    e.preventDefault();
  });

  if (previousItem) {
    var target = $('.wplf-plugins-menu [data-page="' + previousItem + '"]');

    target.click();
  }
})(jQuery);

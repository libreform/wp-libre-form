(function($) {
  var menu = $('.wplf-plugins-menu');
  var pages = $('.wplf-plugins-page');

  menu.on('click', '.nav-tab', function(e) {
    var page = e.target.textContent.trim()
    var target = $('.wplf-plugins-page[data-page="' + page + '"]');

    pages.hide();
    target.show();
    e.preventDefault();
  });
})(jQuery);

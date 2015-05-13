/**
 * JS to be included on the front end pages with forms
 */

(function($) {

$(document).ready(function() {

  // ajax form submissions
  $('.libre-form').submit(function(e) { 

    var $form = $(this);

    // submit form to ajax handler in admin-ajax.php
    $.post( ajax_object.ajax_url + '?action=wplf_submit', 
      $(this).serialize(), 
      function(response) {
        console.log(response);
        $form.after(response.message);
        $form.remove();
      }
    );

    // don't actually submit the form, causing a page reload
    e.preventDefault();
    return false;

  });
});

})(jQuery);


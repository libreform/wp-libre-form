/**
 * JS to be included on the front end pages with forms
 */

(function($) {

$(document).ready(function() {

  // ajax form submissions
  $('.libre-form').submit(function(e) { 

    var $form = $(this);

    // add class to enable css changes to indicate ajax loading 
    $form.addClass('sending');

    // submit form to ajax handler in admin-ajax.php
    $.post( ajax_object.ajax_url + '?action=wplf_submit', 
      $(this).serialize(), 
      function(response) {
        console.log(response);
        $form.after(response.message);
        $form.hide();
      }
    ).always(function() {
      // finished XHR request
      $form.removeClass('sending');
    });;

    // don't actually submit the form, causing a page reload
    e.preventDefault();
    return false;

  });
});

})(jQuery);


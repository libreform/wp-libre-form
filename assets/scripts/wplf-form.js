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

    // reset errors
    $form.find('.wplf-error').remove();

    var data = new FormData($form[0]); // includes files too, but for some reason we don't see them at the server


    window.data = data;


    fetch(ajax_object.ajax_url  + '?action=wplf_submit', {
      method: "POST",
      body: data
    }).then(function(response){
      //console.log(response);
      return response.text();
    }).then(function(response){
      console.log(response);
      response = JSON.parse(response);
      if( 'success' in response ) {
        // show success message if one exists
        $form.after(response.success);
      }
      if( 'ok' in response && response.ok ) {
        // submit succesful!
        $form.remove();
      }
      if( 'error' in response ) {
        // show error message in form
        $form.append('<p class="wplf-error error">' + response.error + '</p>');
      }
      $form.removeClass('sending');
    }).catch(function(error){
      console.log("Fetch error: ", error);
      $form.removeClass('sending');
    });

    // submit form to ajax handler in admin-ajax.php
    /*$.post( ajax_object.ajax_url + '?action=wplf_submit',
      $(this).serialize(),
      function(response) {
        console.log(response);
        if( 'success' in response ) {
          // show success message if one exists
          $form.after(response.success);
        }
        if( 'ok' in response && response.ok ) {
          // submit succesful!
          $form.remove();
        }
        if( 'error' in response ) {
          // show error message in form
          $form.append('<p class="wplf-error error">' + response.error + '</p>');
        }
      }
    ).always(function() {
      // finished XHR request
      $form.removeClass('sending');
    });*/

    // don't actually submit the form, causing a page reload
    e.preventDefault();
    return false;

  });
});

})(jQuery);

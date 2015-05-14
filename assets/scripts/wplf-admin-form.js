/**
 * Custom JS on the edit screen for the from cpt
 */
(function($) {
$(document).ready(function() {

  function parseFields() {

    // get editor content
    // we don't allow the wysiwyg editor here, so it's fine to just get the textarea value
    var content = $('#content').val();

    // create a html form from the content
    var $form = $('<form>' + content + '</form>');

    // get all fields from form
    var $fields = $form.find('input, textarea, select');

    // get all required fields from form
    var $required;
    $fields.each(function(e) {
      if( $(this).prop('required') ) {
        console.log('required: ' + $(this).prop('name'));
      } 
    });

    console.log($fields);
  }
  
  $('#content').blur(parseFields);

});
})(jQuery);

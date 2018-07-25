/**
 * Custom JS on the edit screen for the form cpt
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

    // store input names in an array
    var fields = [];
    var required = [];

    $('.wplf-form-field-container').html('');
    $fields.each(function(e) {
      if( $(this).prop('name') ) {

        // visual representation of the field in a meta box
        var $fieldbox = $(
          '<div class="wplf-form-field widget-top"><div class="widget-title"><h4>' +  $(this).prop('name') + '</h4></div></div>'
        );

        if( $(this).prop('required') ) {
          // mark as required field for validation
          $fieldbox.addClass('required');
          $fieldbox.find('h4').append('*');

          // add name to required array
          required.push( $(this).prop('name') );
        }

        // add name to fields array
        fields.push( $(this).prop('name') );

        // display field names in a meta box
        $('.wplf-form-field-container').append($fieldbox);
      }
    });

    // save field array in a hidden input
    $('input#wplf_fields').val( fields.join() );
    $('input#wplf_required').val( required.join() );
  }

  $('#content').bind('input propertychange', _.debounce(parseFields, 300));
  parseFields();

  // display email copy field if the feature is enabled
  function toggleEmailCopy() {
    if( $('input[name="wplf_email_copy_enabled"]:checked').length > 0 ) {
      $('p.wplf-email-copy-to-field').show();
    } else {
      $('p.wplf-email-copy-to-field').hide();
    }
  }
  $('input[name="wplf_email_copy_enabled"]').change(toggleEmailCopy);
  toggleEmailCopy();

  // If prompted for a form version update, create a hidden field if necessary
  function toggleVersionUpdate() {
    var hiddenField = $('input[name="wplf_update_plugin_version_to_meta"]');

    if (hiddenField.length) {
      hiddenField.remove();
      return;
    }

    var checkbox = document.createElement('input')
    checkbox.type = 'hidden';
    checkbox.name = 'wplf_update_plugin_version_to_meta';
    checkbox.value = 1;

    $('#content').after(checkbox);
  }

  $('input[name="wplf_version_update_toggle"]').change(toggleVersionUpdate);

  function showDynamicValueInfo(e) {
    var target = e.target;
    var value = target.value;
    var help = $('.wplf-dynamic-values-help');
    var desc = help.find('.description');
    var usage = help.find('.usage span');

    if (value) {
      var option = target.querySelector('option[value="' + value + '"]');
      var labels = JSON.parse(option.getAttribute('data-labels'));
      desc.html(labels.description);
      usage.text('%' + value + '%');
      help.show();
    } else {
      help.hide();
    }
  }

  $('select[name="wplf-dynamic-values"]').change(showDynamicValueInfo);
});

})(jQuery);

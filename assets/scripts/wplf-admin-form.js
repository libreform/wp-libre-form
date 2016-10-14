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

        // add email fields to email recipient suggestion list
        if ( $(this).attr("type") == "email" ) {
          if ( $('datalist#emails option#emaillist-' + $(this).prop('name') ).length == 0 ) {
            $('datalist#emails').append('<option id="emaillist-' + $(this).prop('name') + '">' + $(this).prop('name') + '</option>');
          }
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

  $('#content').bind('input propertychange', parseFields);
  parseFields();

  // display email copy field if the feature is enabled
  function toggleEmailCopy() {
    if( $('input[name="wplf_email_copy_enabled"]:checked').length > 0 ) {
      $('input[name="wplf_email_copy_to"]').show();
    } else {
      $('input[name="wplf_email_copy_to"]').hide();
    }
  }
  $('input[name="wplf_email_copy_enabled"]').change(toggleEmailCopy);
  toggleEmailCopy();

  $('input.wplf_add_email').click(function() {
    $('p.wplf_placeholder').clone().removeClass('wplf_placeholder').appendTo('span.wplf_emails').show();
  });

  $('span.wplf_emails').on('click', 'input.wplf_remove_email', function() {
    $(this).closest('p').remove();
  });

  $('span.wplf_emails').on('click', 'a.wplf_edit_template', function() {
    $('p.wplf_email_template[data-opened=true]').removeAttr( 'data-opened' );
    $(this).closest('p.wplf_email_template').attr( 'data-opened', true );

    var content = $(this).siblings('input.wplf_template_body').val();

    if ( content.length > 0 ) {
      var json = JSON.parse( content );

      $('div#wplf_template_modal_inner input[name=template_title]').val( json.title );
      $('div#wplf_template_modal_inner textarea[name=template_body]').val( json.content );
    }
    else {
      $('div#wplf_template_modal_inner input[name=template_title]').removeAttr('value');
      $('div#wplf_template_modal_inner textarea[name=template_body]').removeAttr('value');
    }
  });

  $('body').on('click', 'input.wplf_save_template', function() {
    var put = {
      title   : $('div#wplf_template_modal_inner input[name=template_title]').val(),
      content : $('div#wplf_template_modal_inner textarea[name=template_body]').val()
    }

    $('p.wplf_email_template[data-opened=true]').find('.wplf_template_body').val( JSON.stringify( put ) );

    $('p.wplf_email_template[data-opened=true]').removeAttr( 'data-opened' );
    tb_remove();
  });

});
})(jQuery);

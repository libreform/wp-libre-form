const $ = window.jQuery; // No need to use a closure.
const _ = window._;

function onPluginsPage() {
  const menu = $('.wplf-plugins-menu');
  const pages = $('.wplf-plugins-page');
  const previousItem = localStorage.getItem('wplf-plugins-page-last-active-tab') || 'General';

  if (!menu.length && !pages.length) {
    return;
  }

  menu.on('click', '.nav-tab', function(e) {
    const item = $(e.target);
    const page = item.attr('data-page');
    const target = $(`.wplf-plugins-page[data-page="${page}"]`);

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
    const target = $(`.wplf-plugins-menu [data-page="${previousItem}"]`);

    target.click();
  }
}


function parseFields(element = '#content') {
  // get editor content
  // we don't allow the wysiwyg editor here, so it's fine to just get the textarea value
  var content = $(element).val();

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

// display email copy field if the feature is enabled
function toggleEmailCopy() {
  if( $('input[name="wplf_email_copy_enabled"]:checked').length > 0 ) {
    $('p.wplf-email-copy-to-field').show();
  } else {
    $('p.wplf-email-copy-to-field').hide();
  }
}

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

export default (() => {
  $(document).ready(function() {
    const isProbablyAdmin = document && document.body && document.body.classList.contains('wp-admin');

    if (isProbablyAdmin) {
      $('#content').bind('input propertychange', _.debounce(parseFields, 300));
      parseFields();

      $('input[name="wplf_email_copy_enabled"]').change(toggleEmailCopy);
      toggleEmailCopy();

      $('input[name="wplf_version_update_toggle"]').change(toggleVersionUpdate);
      $('select[name="wplf-dynamic-values"]').change(showDynamicValueInfo);

      onPluginsPage();
    }
  });

  return {
    parseFields,
    toggleVersionUpdate,
    showDynamicValueInfo,
  }
})();
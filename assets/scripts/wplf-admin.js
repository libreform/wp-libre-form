import globalData from './lib/global-data';
import createApiClient from './lib/api-client';
import log from './lib/log';

import { WPLF } from './classes/wplf';
import { WPLF_Tabs } from './classes/wplf-tabs.js';

import '../styles/wplf-admin.scss';

const $ = window.jQuery; // No need to use a closure.
const _ = window._;

const wplf = new WPLF();

const { abort, request, signal } = createApiClient()

function maybePreventEditing() {
  // Prevent users who can't save the post from editing it
  if (globalData.settings.hasUnfilteredHtml !== 1) {
    $('#title').prop('disabled', true);
    $('#content').prop('disabled', true);
    $('#publish').remove();
    $('#save-post').remove();
  }
}

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

  var $fields = $form.find('input, textarea, select');
  var fields = [];

  $('.wplf-form-field-container').html('');
  $fields.each(function(e) {
    const $el = $(this)
    let [name, type, required] = [
      $el[0].getAttribute('name'),
      $el[0].getAttribute('type') || $el[0].tagName.toLowerCase(),
      $el[0].getAttribute('required') ? true : false,
    ];

    if (name) {
      const multiple = name.endsWith('[]') // Not to be confused with the multiple attribute

      if (multiple) {
        // Remove brackets from the name, they will not be present in the submission which causes validation errors
        name = name.replace('[]', '');
      }

      // visual representation of the field in a meta box
      var $fieldbox = $(
        '<div class="wplf-form-field widget-top"><div class="widget-title"><h4>' +  name + '</h4></div></div>'
     );

      if(required) {
        // mark as required field for validation
        $fieldbox.addClass('required');
        $fieldbox.find('h4').append('*');
      }

      // add name to fields array
      fields.push({
        name,
        type,
        required,
        multiple,
      });

      // display field names in a meta box
      $('.wplf-form-field-container').append($fieldbox);
    }
  });

  // console.log(fields)

  // save field array in a hidden input
  $('input#wplf_fields').val(JSON.stringify(fields));
  // $('input#wplf_required').val(required.join());
}

// display email copy field if the feature is enabled
function toggleEmailCopy() {
  if($('input[name="wplf_email_copy_enabled"]:checked').length > 0) {
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

/**
 * Trying to read the DOM immediately after setting it does not work. Trying on next tick
 * does.
 */
const waitForNextTick = () => new Promise(resolve => setTimeout(resolve))

let formInstance

async function removeProblematicAttributes(element) {
  // Names and required attributes cause problems when saving the form, remove
  const requiredEls = Array.from(element.querySelectorAll('[required]'))
  const nameEls = Array.from(element.querySelectorAll('[name]'))

  requiredEls.forEach(el => el.removeAttribute('required'))
  nameEls.forEach(el => el.removeAttribute('name'))

  await waitForNextTick()
}

async function updatePreview(el, html) {
  el.innerHTML = html

  await waitForNextTick();
  await updateFormFieldsFromPreview(el)
  await removeProblematicAttributes(el)

  formInstance = console.log('attach', wplf.attach(el))
  window.xyz = formInstance
}

async function updateFormFieldsFromPreview(el) {
  const wrapper = document.querySelector('.wplf-formFields')
  const template = wrapper.children[0]

  // create a html form from the content
  var $form = $('<form>' + el.innerHTML + '</form>');

  var $fields = $form.find('input, textarea, select');
  var fields = [];

  $('.wplf-form-field-container').html('');
  $fields.each(function(e) {
    const $el = $(this)
    let [name, type, required] = [
      $el[0].getAttribute('name'),
      $el[0].getAttribute('type') || $el[0].tagName.toLowerCase(),
      $el[0].getAttribute('required') ? true : false,
    ];

    if (name) {
      const multiple = name.endsWith('[]') // Not to be confused with the multiple attribute

      if (multiple) {
        // Remove brackets from the name, they will not be present in the submission which causes validation errors
        name = name.replace('[]', '');
      }

      // visual representation of the field in a meta box
      var $fieldbox = $(
        '<div class="wplf-form-field widget-top"><div class="widget-title"><h4>' +  name + '</h4></div></div>'
      );

      if(required) {
        // mark as required field for validation
        $fieldbox.addClass('required');
        $fieldbox.find('h4').append('*');
      }

      // add name to fields array
      fields.push({
        name,
        type,
        required,
        multiple,
      });

      // display field names in a meta box
      $('.wplf-form-field-container').append($fieldbox);
    }
  });

  // save field array in a hidden input
  $('input#wplf_fields').val(JSON.stringify(fields));
}

export default (() => {
  const tabs = Array.from(document.querySelectorAll('.wplf-tabs')).map(el => {
    return new WPLF_Tabs(el, el.getAttribute('data-active'), el.getAttribute('data-remember'))
  })

  window.yolo = tabs

  async function onEditorChanges(editor) {
    const content = editor.getValue()
    const formId = parseInt(document.querySelector('input[name="post_ID"]').value, 10)
    const previewEl = document.querySelector('.wplf-editor__preview')

    const body = new FormData()
    body.append('content', content)
    body.append('formId', formId)

    try {
      const { data } = await request('/render', {
        method: 'POST',
        body,
      })

      const { html } = data

      if (formInstance) {
        wplf.detach(formInstance)
      }

      await updatePreview(previewEl, html)
      tabs.forEach(instance => instance.refresh())
      // updateFormFields(previewEl)
    } catch (e) {
      log.error('Failed to get preview', e)
    }
  }



  const classList = document.body.classList

  if (classList.contains('post-type-libreform') && classList.contains('post-php')) {
    // In form editing / creation view
    const editorEl = document.querySelector('.wplf__editor .wplf-cmEditor')
    const thankYouEl = document.querySelector('.wplf-thankYou .wplf-cmEditor')
    const previewEl = document.querySelector('.wplf-editor__preview')

    const { codemirror: editor } = window.wp.codeEditor.initialize($(editorEl), globalData.codeMirror)
    const { codemirror: thankYou } = window.wp.codeEditor.initialize($(thankYouEl), globalData.codeMirror)

    editor.on('changes', _.debounce(onEditorChanges, 1000))
    onEditorChanges(editor) // Trigger immediately

    // The pre-filled HTML needs fixing as well
    removeProblematicAttributes(previewEl)
  } else if ('xyz' === 'abc') {
    // In form submission
  } else if (classList.contains('libreform_page_wplfSettings')) {
    // In settings page
  } else if (classList.contains('libreform_page_wplfAddons')) {
    // In addons page
  }

  $(document).ready(function() {
    Array.from(document.querySelectorAll('.wplf-cmEditor')).forEach(editor => {
      // window.wp.codeEditor.initialize($(editor), globalData.codeMirror);

    })


    const isProbablyAdmin = document && document.body && document.body.classList.contains('wp-admin');


    if (isProbablyAdmin) {
      $('#content').bind('input propertychange', _.debounce(parseFields, 300));
      parseFields();

      $('input[name="wplf_email_copy_enabled"]').change(toggleEmailCopy);
      toggleEmailCopy();

      $('input[name="wplf_version_update_toggle"]').change(toggleVersionUpdate);
      // $('select[name="wplf-dynamic-values"]').change(showDynamicValueInfo);

      onPluginsPage();
      maybePreventEditing();
    }
  });

  return {
    parseFields,
    toggleVersionUpdate,
    // showDynamicValueInfo,
  }
})();
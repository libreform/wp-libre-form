import WPLF_Admin from './classes/wplf-admin'
import WPLF from './classes/wplf'
import '../styles/wplf-admin.scss'

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

// Webpack exposes the instance in window.WPLF, do not load admin and frontend bundles at the same time.
export default new WPLF_Admin(new WPLF());

import WPLF_Editor from './wplf-editor'
import WPLF_Settings from './wplf-settings'
import WPLF_Addons from './wplf-addons'
import WPLF_Tabs from './wplf-tabs'

export default class WPLF_Admin {
  editor
  addons
  settings
  tabs

  constructor(wplfInstance) {
    this.tabs = Array.from(document.querySelectorAll('.wplf-tabs')).map(el => {
      return new WPLF_Tabs(el, el.getAttribute('data-active'), el.getAttribute('data-remember'))
    })

    // Init stuff based on what page we're on
    const classList = document.body.classList

    if (classList.contains('post-type-libreform') && (classList.contains('post-php') || classList.contains('post-new-php'))) {
      this.editor = new WPLF_Editor(wplfInstance);
    } else if (classList.contains('libreform_page_wplfSettings')) {
      // In settings page
      this.settings = new WPLF_Settings(wplfInstance)
    } else if (classList.contains('libreform_page_wplfAddons')) {
      this.addons = new WPLF_Addons(wplfInstance)
    }
  }

  getEditor() {
    return this.editor
  }

  getAddons() {
    return this.addons
  }

  getSettings() {
    return this.settings
  }

  getTabs() {
    return this.tabs
  }
}
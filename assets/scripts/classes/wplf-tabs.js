
import Storage from './storage'
import log from '../lib/log'

export default class WPLF_Tabs {
  remember = false
  activeTab = null
  element = null
  name = null

  constructor(element) {
    if (element instanceof HTMLElement !== true) {
      throw new Error('Tab element invalid or missing')
    }

    this.root = element
    this.name = this.root.getAttribute('data-name')
    this.remember = this.root.getAttribute('data-remember') !== null
    this.activeTab = this.root.getAttribute('data-default')

    if (!this.name || !this.activeTab) {
      throw new Error('Required attributes are missing')
    }

    if (this.remember) {
      // Get saved value or keep using the default
      this.activeTab = Storage.get(this.name, this.activeTab)
    }

    this.refresh()
  }

  handleClick = (e) => {
    const { target } = e
    const tabName = target.getAttribute('data-target')


    this.switchTab(tabName)
    e.preventDefault()
  }

  /**
   * Attach event listeners and ensure the current tab is visible.
   * Call after adding a tab dynamically.
   */
  refresh() {
    this.getHandles().forEach(handle => {

      // It's not possible to add the same event listener twice. If the handle already has the listener,
      // this is a no-op.
      handle.addEventListener('click', this.handleClick, { passive: false })
    })


    // If activeTab is null, things will break. Fall back to first tab
    if (this.activeTab === null) {
      const first = (this.getTabs()[0]).getAttribute('data-target')

      log.notice('activeTab was null, setting first tab as active', first)
      this.activeTab = first
    }

    this.switchTab(this.activeTab)
  }

  /**
   * Values are not cached as they are practically free to recompute, but
   * might become a memory leak if stored.
   */
  getTabs() {
    return Array.from(this.root.querySelectorAll(`.wplf-tabs__tab[data-name="${this.name}"]`))
  }

  /**
   * See getTabs()
   */
  getHandles() {
    return Array.from(this.root.querySelectorAll(`.wplf-tabs__tabSwitcher[data-name="${this.name}"]`))
  }

  switchTab(name) {
    const tabs = this.getTabs()
    const allHandles = this.getHandles()

    const open = tabs.filter(tab => tab.getAttribute('data-tab') === name)
    const close = tabs.filter(tab => tab.getAttribute('data-tab') !== name)

    open.forEach(tab => {
      const tabName = tab.getAttribute('data-tab')
      const handles = allHandles.filter(handle => handle.getAttribute('data-target') === tabName)

      tab.classList.add('active')
      handles.forEach(handle => {
        handle.classList.add('active')
      })
    })

    close.forEach(tab => {
      const tabName = tab.getAttribute('data-tab')
      const handles = allHandles.filter(handle => handle.getAttribute('data-target') === tabName)

      tab.classList.remove('active')
      handles.forEach(handle => {
        handle.classList.remove('active')
      })
    })

    if (this.remember) {
      Storage.set(this.name, name)
    }
  }
}
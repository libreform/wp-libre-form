import { WPLF_Form } from './wplf-form'
import globalData from '../lib/global-data'

import { List } from '../types'
import ensureNum from '../lib/ensure-num'

export default class WPLF {
  // forms = {
  //   // '_g67a8z2kw': WPLF_Form
  // }
  forms: List<WPLF_Form> = {}

  constructor() {
    this.initialize()
  }

  // Expose WPLF_Form
  // Form: WPLF_Form = WPLF_Form
  Form = WPLF_Form

  initialize() {
    if (globalData.settings.autoinit) {
      ;[].forEach.call(
        document.querySelectorAll('form.wplf'),
        (form: HTMLFormElement) => this.attach(form)
      )
    }
  }

  findFormsById(id: number) {
    return Object.keys(this.forms).reduce<WPLF_Form[]>((acc, key) => {
      const wplfForm = this.forms[key]

      if (!wplfForm) {
        return acc
      }

      const formEl = wplfForm.form
      const formElId = formEl.getAttribute('data-form-id')

      if (formElId && ensureNum(formElId) === ensureNum(id)) {
        acc.push(wplfForm)
      }

      return acc
    }, [])
  }

  attach(x: HTMLFormElement | WPLF_Form) {
    if (x instanceof WPLF_Form) {
      const wplfForm = x

      this.forms[wplfForm.key] = wplfForm

      return wplfForm
    }

    const element = x

    if (element instanceof HTMLElement !== true) {
      // log.console.error('Unable to attach WPLF to element');

      throw new Error('Unable to attach WPLF to element')
    }

    const wplfForm = new WPLF_Form(element)
    this.forms[wplfForm.key] = wplfForm

    wplfForm.form.removeAttribute('tabindex')
    wplfForm.form.removeAttribute('style')

    return wplfForm
  }

  detach(wplfForm: WPLF_Form) {
    this.forms[wplfForm.key].removeSubmitHandler()
    delete this.forms[wplfForm.key]

    return true
  }
}

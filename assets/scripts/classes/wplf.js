import { WPLF_Form } from './wplf-form'
import globalData from '../lib/global-data'

export default class WPLF {
  forms = {
    // '_g67a8z2kw': WPLF_Form
  }

  constructor() {
    this.initialize()
  }

  // Expose WPLF_Form
  Form = WPLF_Form

  initialize() {
    if (globalData.settings.autoinit) {
      [].forEach.call(
        document.querySelectorAll("form.wplf"),
        form => this.attach(form)
     )
    }
  }

  findFormsById(id) {
    return Object.keys(this.forms).reduce((acc, key) => {
      const wplfForm = this.forms[key]

      if (parseInt(wplfForm.form.getAttribute('data-form-id'), 10) === parseInt(id, 10)) {
        acc.push(wplfForm)
      }

      return acc
    }, [])
  }

  attach(elementOrWplfForm) {
    if (elementOrWplfForm instanceof WPLF_Form) {
      const wplfForm = elementOrWplfForm

      this.forms[wplfForm.key] = wplfForm;

      return wplfForm
    }

    const element = elementOrWplfForm

    if (element instanceof HTMLElement !== true) {
      throw new Error('Unable to attach WPLF to element', element)
    }

    const wplfForm = new WPLF_Form(element)
    this.forms[wplfForm.key] = wplfForm

    wplfForm.form.removeAttribute('tabindex')
    wplfForm.form.removeAttribute('style')

    return wplfForm
  }

  detach(elementOrWplfForm) {
    if (elementOrWplfForm instanceof WPLF_Form) {
      const wplfForm = elementOrWplfForm

      this.forms[wplfForm.key].removeSubmitHandler()
      delete this.forms[wplfForm.key]

      return true
    }

    const element = elementOrWplfForm

    if (element instanceof HTMLElement !== true) {
      throw new Error('Unable to detach WPLF from element', element)
    }

    this.forms[element].removeSubmitHandler()
    delete this.forms[element]

    return true
  }
}
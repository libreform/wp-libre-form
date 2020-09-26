import globalData from '../lib/global-data'
import createApiClient from '../lib/api-client'
import log from '../lib/log'

import WPLF_Tabs from './wplf-tabs'

import {
  SubmitState,
  SubmitHandler,
  FormCallback,
  // FormSuccessCallback,
  // FormErrorCallback,
  List,
  ApiResponseKind,
} from '../types'
import isElementish from '../lib/is-elementish'

const { request } = createApiClient()

const resetForm = (wplfForm: WPLF_Form, params: List<any>) => {
  const form = wplfForm.form as HTMLFormElement

  // Since all type guarantees have been thrown out of the window,
  // it's necessary to check that the element indeed has this method.
  if (form.reset) {
    form.reset()
  }
}

const defaultBeforeSendCallback = (wplfForm: WPLF_Form, params: List<any>) => {
  if (isElementish(wplfForm.form.parentNode)) {
    const parentNode = wplfForm.form.parentNode

    // Reset error and success messages, if there were any
    const messages = parentNode.querySelectorAll(
      '.wplf-errorMessage, .wplf-successMessage'
    )

    messages.forEach((element: Element) => {
      if (isElementish(element.parentNode)) {
        element.parentNode.removeChild(element)
      }
    })
  }
}

const defaultSuccessCallback = (wplfForm: WPLF_Form, params: List<any>) => {
  const { data } = params
  const { message } = data
  const div = document.createElement('div')

  div.classList.add('wplf-successMessage')
  div.insertAdjacentHTML('afterbegin', message)

  wplfForm.form.insertAdjacentElement('beforebegin', div)
  wplfForm.form.classList.add('submitted')
}

const defaultErrorSendCallback = (wplfForm: WPLF_Form, params: List<any>) => {
  const { error } = params
  const div = document.createElement('div')

  div.classList.add('wplf-errorMessage')
  div.insertAdjacentHTML('afterbegin', error.message)
  wplfForm.form.insertAdjacentElement('beforebegin', div)
}

export class WPLF_Form {
  form: Element
  submitState: SubmitState = SubmitState.Unsubmitted
  submitHandler: SubmitHandler
  callbacks: {
    beforeSend: List<FormCallback>
    success: List<FormCallback>
    error: List<FormCallback>
  } = {
    beforeSend: {
      default: defaultBeforeSendCallback,
    },
    success: {
      default: defaultSuccessCallback,
      clearOnSuccess: resetForm,
    },
    error: {
      default: defaultErrorSendCallback,
    },
  }

  tabs: WPLF_Tabs[] = []
  key = ''

  // constructor(element: HTMLFormElement) {
  constructor(element: Element) {
    if (element instanceof Element !== true) {
      // if (element instanceof HTMLFormElement !== true) {
      throw new Error('Form element invalid or missing')
    }
    const fallbackInput = element.querySelector('[name="_nojs"]')

    this.form = element
    this.key = '_' + Math.random().toString(36).substr(2, 9)
    this.tabs = Array.from(this.form.querySelectorAll('.wplf-tabs')).map(
      (el) => {
        return new WPLF_Tabs(el)
      }
    )

    this.submitHandler = this.createSubmitHandler()

    this.attachSubmitHandler()

    // Remove input that triggers the fallback so we get a JSON response
    if (fallbackInput && isElementish(fallbackInput.parentNode)) {
      fallbackInput.parentNode.removeChild(fallbackInput)
    }
  }

  addCallback(name: string, type: string, callback: FormCallback) {
    const callbacks = this.callbacks
    const { beforeSend, success, error } = callbacks

    switch (type) {
      case 'beforeSend': {
        beforeSend[name] = callback
        break
      }

      case 'success': {
        success[name] = callback
        break
      }

      case 'error': {
        error[name] = callback
        break
      }

      default: {
        throw new Error(`Unknown callback type ${type}`)
      }
    }

    return this
  }

  removeCallback(name: string, type: string) {
    const callbacks = this.callbacks
    const { beforeSend, success, error } = callbacks

    switch (type) {
      case 'beforeSend': {
        delete beforeSend[name]
        break
      }

      case 'success': {
        delete success[name]
        break
      }

      case 'error': {
        delete error[name]
        break
      }

      default: {
        throw new Error(`Unknown callback ${name} ${type}`)
      }
    }

    return this
  }

  runCallback(type: string, params: List<any> = {}) {
    const callbacks = this.callbacks
    const { beforeSend, success, error } = callbacks

    switch (type) {
      case 'beforeSend': {
        Object.values(beforeSend).forEach((callback) => {
          callback(this, params)
        })
        break
      }

      case 'success': {
        Object.values(success).forEach((callback) => {
          callback(this, params)
        })
        break
      }

      case 'error': {
        Object.values(error).forEach((callback) => {
          callback(this, params)
        })
        break
      }

      default: {
        throw new Error(`Unknown callback ${name} ${type}`)
      }
    }
  }

  attachSubmitHandler() {
    this.form.addEventListener('submit', this.submitHandler, { passive: false })

    return this
  }

  /**
   * Removes submit handler from the form, but keeps it in memory.
   */
  removeSubmitHandler() {
    this.form.removeEventListener('submit', this.submitHandler)

    return this
  }

  createSubmitHandler(handler?: SubmitHandler) {
    if (handler) {
      return handler
    }

    return async (e: Event) => {
      e.preventDefault()

      if (this.submitState === SubmitState.Submitting) {
        log.notice('Preventing double doubmission')

        return
      }

      try {
        const x = await this.send()
        const { data, ok } = x

        if (ok) {
          this.submitState = SubmitState.Success
          this.runCallback('success', { data })
        } else {
          console.log('not ok!', x)

          throw new Error('Something went wrong')
        }
      } catch (e) {
        this.submitState = SubmitState.Error
        this.runCallback('error', { error: this.submitState })
      }
    }
  }

  async send() {
    const form = this.form
    const data = new FormData(form as HTMLFormElement) // FormData can't be made from Element

    globalData.lang && data.append('lang', globalData.lang)
    this.submitState = SubmitState.Submitting

    form.classList.add('submitting')
    this.runCallback('beforeSend', { formData: data, form })

    const req = request(
      '/submit',
      {
        method: 'POST',
        body: data,
      },
      ApiResponseKind.Submission
    )

    form.classList.remove('submitting')

    return req
  }
}

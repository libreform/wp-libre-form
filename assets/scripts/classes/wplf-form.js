import globalData from '../lib/global-data'
import createApiClient from '../lib/api-client'
import log from '../lib/log'

import WPLF_Tabs from './wplf-tabs'

const { request } = createApiClient()

export class WPLF_Form {
  constructor(element) {
    // if (element instanceof HTMLFormElement !== true) {
    if (element instanceof HTMLElement !== true) {

      throw new Error('Form element invalid or missing');
    }

    this.form = element;
    this.submitState = null; // null | 'submitting' | 'success' | new Error('error message')
    this.submitHandler = null;
    this.callbacks = {
      beforeSend: {},
      success: {},
      error: {}
    };

    this.key = '_' + Math.random().toString(36).substr(2, 9);
    this.tabs = Array.from(this.form.querySelectorAll('.wplf-tabs')).map(el => {
      return new WPLF_Tabs(el, el.getAttribute('data-active'), el.getAttribute('data-rememberas'));
    });

    this.addSubmitHandler();

    // Remove input that triggers the fallback so we get a JSON response
    const fallbackInput = element.querySelector('[name="_nojs"]');

    if (fallbackInput) {
      fallbackInput.parentNode.removeChild(fallbackInput);
    }
  }

  addCallback(name, type, callback) {
    this.callbacks[type][name] = callback;

    return this;
  }

  removeCallback(name, type) {
    delete this.callbacks[type][name];

    return this;
  }

  runCallback(type, ...args) {
    if (this.callbacks[type]) {
      Object.keys(this.callbacks[type]).forEach(key => {
        this.callbacks[type][key](...args);
      });
    } else {
      throw new Error(`Unknown callback ${name} ${type}`);
    }
  }

  addSubmitHandler(handler) {
    this.submitHandler = (handler || (async e => {
      e.preventDefault();    console.log('handle', this.submitState)

      // Prevent double submissions
      if (this.submitState === 'submitting') {
        log.notice('Preventing double doubmission')
        return;
      }

      // Reset messages if there were any
      [].forEach.call(this.form.parentNode.querySelectorAll(".wplf-errorMessage, .wplf-successMessage"), el => {
        el.parentNode.removeChild(el);
      });

      try {
        const { data, ok } = await this.send()

        if (ok) {
          const { message } = data
          const div = document.createElement('div')
          div.classList.add('wplf-successMessage')
          div.insertAdjacentHTML('afterbegin', message)

          this.form.insertAdjacentElement('beforebegin', div)
          this.form.classList.add('submitted')
          this.form.reset()
          this.submitState = 'success'

          this.runCallback('success', data, this);
        } else {
          const { error } = data

          throw new Error(error)
        }
      } catch (e) {
        const div = document.createElement('div')
        div.classList.add('wplf-errorMessage')
        div.insertAdjacentHTML('afterbegin', e.message)

        this.submitState = e
        log.error(this.submitState);

        this.form.classList.remove('sending')
        this.form.insertAdjacentElement('beforebegin', div)
        this.runCallback('error', this.submitState, this);
      }
    }))

    this.form.addEventListener('submit', this.submitHandler);

    return this;
  }

  removeSubmitHandler() {
    this.form.removeEventListener('submit', this.submitHandler);
    this.submitHandler = null;

    return this;
  }

  async send() {
    const form = this.form;
    const data = new FormData(form);

    // Pass language if it exists.
    globalData.language && data.append('lang', globalData.language)

    this.submitState = 'submitting';
    form.classList.add('sending')
    this.runCallback('beforeSend', form, this)

    const req = request('/submit', {
      method: 'POST',
      body: data,
    })

    form.classList.remove('sending')
    return req
  }
}
import { WPLF_Form } from './wplf-form';
import globalData from '../global-data';

const dependencies = [];
let depsLoaded = 0;

function isReady() {
  return dependencies.length === depsLoaded;
}

function loadPolyfill(name) {
  const script = document.createElement('script');
  script.src = globalData.wplf_assets_dir + '/scripts/polyfills/' + name + '.js';

  script.addEventListener('load', () => {
    depsLoaded++;

    if (isReady()) {
      window.postMessage('[WPLF] Polyfills loaded', '*')
    }
  });

  document.body.appendChild(script);
}


if (!window.fetch) {
  dependencies.push('fetch');
}

if (!window.Promise) {
  dependencies.push('promise');
}

export class WPLF {
  forms = {
    // '_g67a8z2kw': WPLF_Form
  }

  constructor() {
    if (this.isReady()) {
      this.initialize();
    } else {
      dependencies.forEach(loadPolyfill);

      this.whenReady(() => this.initialize());
    }
  }

  // Expose WPLF_Form
  Form = WPLF_Form

  initialize() {
    const compatibilityLayer = {
      beforeSendCallbacks: [],
      errorCallbacks: [],
      successCallbacks: [],

      attach: form => this.attach(form),
      submitHandler: event => { // Too much work to support properly. I'd be surprised if anyone even used this.
        event.preventDefault();

        alert('Form can\'t be submitted properly due to configuration error. WP Libre Form 2.0 doesn\'t support the legacy wplf.submitHandler.')
      }
    };

    // _listenForWPLFMessage('Legacy callback', () => {
      // This isn't needed, just use runCallback in wplf-form
    // })

    window.wplf = compatibilityLayer; // Old "API" was in window.wplf

    if (globalData.autoinit === '1') {
      [].forEach.call(
        document.querySelectorAll(".libre-form"),
        form => this.attach(form)
      );
    }
  }

  isReady() {
    return isReady();
  }

  _listenForWPLFMessage(message, cb = () => null) {
    window.addEventListener('message', e => {
      if (typeof e.data === 'string' && e.data.indexOf(`[WPLF] ${message}`) === 0) {
        cb(this);
      }
    });
  }

  whenReady(cb = () => null) {
    this._listenForWPLFMessage('Polyfills loaded', cb);
  }

  findFormsById(id) {
    return Object.keys(this.forms).reduce((acc, key) => {
      const wplfForm = this.forms[key];

      if (parseInt(wplfForm.form.getAttribute('data-form-id'), 10) === parseInt(id, 10)) {
        acc.push(wplfForm);
      }

      return acc;
    }, []);
  }

  attach(elementOrWplfForm) {
    if (elementOrWplfForm instanceof WPLF_Form) {
      const wplfForm = elementOrWplfForm;

      this.forms[wplfForm.key] = wplfForm;

      return wplfForm;
    }

    const element = elementOrWplfForm;
    
    if (element instanceof HTMLFormElement !== true) {
      throw new Error('Unable to attach WPLF to element', element);
    }

    const wplfForm = new WPLF_Form(element);
    this.forms[wplfForm.key] = wplfForm;

    return wplfForm;
  }

  detach(elementOrWplfForm) {
    if (elementOrWplfForm instanceof WPLF_Form) {
      const wplfForm = elementOrWplfForm;

      this.forms[wplfForm.key].removeSubmitHandler();
      delete this.forms[wplfForm.key];

      return true;
    }

    const element = elementOrWplfForm;

    if (element instanceof HTMLFormElement !== true) {
      throw new Error('Unable to detach WPLF from element', element);
    }

    this.forms[element].removeSubmitHandler();
    delete this.forms[element];

    return true;
  }
}
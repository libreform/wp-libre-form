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

  console.log('loading', name, globalData)
  script.addEventListener('load', function () {
    depsLoaded++;
    console.log('loaded', name)

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

  }

  constructor() {
    if (this.isReady()) {
      this.initialize();
    } else {
      dependencies.forEach(loadPolyfill);

      this.whenReady(() => this.initialize());
    }
  }

  initialize() {
    if (globalData.autoinit === '1') {
      console.log('autoiniting');
      [].forEach.call(
        document.querySelectorAll(".libre-form"),
        form => this.attach(form)
      );
    } else {
      console.log('not autoiniting')
    }
  }

  isReady() {
    return isReady()
  }

  whenReady(cb = () => null) {
    window.addEventListener('message', e => {
      if (typeof e.data === 'string' && e.data.indexOf('[WPLF] Polyfills loaded') === 0) {
        console.log('now ready')
        cb(this);
      }
    });
  }

  findFormsById(id) {
    return Object.keys(this.forms).reduce(function(acc, key) {
      var form = this.forms[key]

      if (parseInt(form.form.getAttribute('data-form-id'), 10) === parseInt(id, 10)) {
        acc.push(form)
      }

      return acc
    }.bind(this), []);
  }

  attach(element) {
    if (element instanceof HTMLFormElement !== true) {
      throw new Error('Unable to attach WPLF to element', element);
    }

    const form = new WPLF_Form(element);
    this.forms[form.key] = form;

    return this.forms[form.key];
  }

  detach(element) {
    if (element instanceof HTMLFormElement !== true) {
      throw new Error('Unable to detach WPLF from element', element);
    }

    this.forms[element].removeSubmitHandler();
    delete this.forms[element];

    return this
  }
}
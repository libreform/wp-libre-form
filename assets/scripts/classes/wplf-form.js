import globalData from '../global-data';

export class WPLF_Form {
  constructor(element) {
    if (element instanceof HTMLFormElement !== true) {
      throw new Error('Form element invalid or missing');
    }

    this.form = element;
    this.submitState = null; // null | 'submitting' | 'success' | 'error'
    this.submitHandler = null;
    this.callbacks = {
      beforeSend: {},
      success: {},
      error: {}
    };

    this.key = '_' + Math.random().toString(36).substr(2, 9);
    this.addSubmitHandler();
  }

  addCallback(name, type, callback) {
    this.callbacks[type][name] = callback;

    return this;
  }

  removeCallback(name, type) {
    delete this.callbacks[type][name];

    return this;
  }

  addSubmitHandler(handler) {
    this.submitHandler = (handler || (e => {
      e.preventDefault();

      // Prevent double submissions by blocking send if it's already in progress
      if (this.form.submitState === 'sending') {
        return;
      }

      // add class to enable css changes to indicate ajax loading
      this.form.classList.add('sending');
      [].forEach.call(this.form.querySelectorAll(".wplf-error"), error => {
        // reset errors
        error.parentNode.removeChild(error);
      });


      this.send()
        .then(r => r.text())
        .then(
          r => {
            const response = JSON.parse(r);

            if( 'success' in response ) {
              // show success message if one exists
              const success = document.createElement("p");
              success.className = "wplf-success";
              success.innerHTML = response.success;

              this.form.parentNode.insertBefore(success, this.form.nextSibling);
            }

            if( 'ok' in response && response.ok ) {
              // submit succesful!
              this.form.parentNode.removeChild(this.form);

              this.submitStatus = 'success';
              Object.keys(this.callbacks.success).forEach(key => {
                this.callbacks.success[key](response, this);
              });
            }

            if( 'error' in response ) {
              // show error message in form
              const error = document.createElement("p");
              error.className = "wplf-error error";
              error.textContent = response.error;

              this.form.appendChild(error);

              this.submitStatus = 'error';

              Object.keys(this.callbacks.error).forEach(key => {
                this.callbacks.error[key](response, this);
              });
            }

            this.form.classList.remove('sending');
          }
        ).catch(
          error => {
            this.form.classList.remove("sending");

            if (this.callbacks.error.length > 0) {
              Object.keys(this.callbacks.error).forEach(key => {
                this.callbacks.error[key](response, this);
              });
            } else {
              console.warn("Fetch error: ", error);
            }
        }
      );
    }))

    this.form.addEventListener('submit', this.submitHandler);

    return this;
  }

  removeSubmitHandler() {
    this.form.removeEventListener('submit', this.submitHandler);
    this.submitHandler = null;

    return this;
  }

  send() {
    const form = this.form;
    const data = new FormData(form);

    // Pass language if it exists.
    globalData.lang && data.append('lang', globalData.lang);

    form.submitState = 'submitting';

    Object.keys(this.callbacks.beforeSend).forEach(key => {
      this.callbacks.beforeSend[key](form, this);
    });

    return fetch(globalData.ajax_url, {
      method: "POST",
      credentials: globalData.ajax_credentials || 'same-origin',
      body: data,
      headers: globalData.request_headers || {},
    });
  }
}
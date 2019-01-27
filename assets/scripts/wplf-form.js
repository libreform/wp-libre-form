/**
 * JS to be included on the front end pages with forms
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  var WPLF_DATA = window.WPLF_DATA;

  function WPLF () {
    this.forms = {};

    var dependencies = [];

    if (!window.fetch) {
      dependencies.push('fetch');
    }

    if (!window.Promise) {
      dependencies.push('Promise');
    }

    var dependency_count = dependencies.length;
    var dependencies_loaded = 0;
    var is_ready = function () {
      return dependency_count === dependencies_loaded;
    };
    var run_when_ready = function () {
      if (is_ready()) {
        // app();
      }
    };
    var get_script = function (script) {
      var elmnt = document.createElement('script');
      elmnt.src = WPLF_DATA.wplf_assets_dir + '/scripts/polyfills/' + script + '.js';

      return elmnt;
    };

    dependencies.map(function (dependency) {
      return dependency.toLowerCase();
    }).map(function (dependency) {
      return get_script(dependency);
    }).map(function (script) {
      script.addEventListener('load', function () {
        dependencies_loaded++;
        run_when_ready();
      });

      return document.body.appendChild(script);
    });

    run_when_ready();
  }

  WPLF.prototype.findFormsById = function findFormsById(id) {
    return Object.keys(this.forms).reduce(function(acc, key) {
      var form = this.forms[key]

      if (parseInt(form.form.getAttribute('data-form-id'), 10) === parseInt(id, 10)) {
        acc.push(form)
      }

      return acc
    }.bind(this), []);
  }

  WPLF.prototype.attach = function attach (element) {
    if (element instanceof HTMLFormElement !== true) {
      throw new Error('Unable to attach WPLF to element', element);
    }

    var form = new WPLF_Form(element);
    console.log(form, this);
    this.forms[form.form] = form;

    return this.forms[element];
  }

  WPLF.prototype.detach = function detach (element) {
    if (element instanceof HTMLFormElement !== true) {
      throw new Error('Unable to detach WPLF from element', element);
    }

    this.forms[element].removeSubmitHandler();
    delete this.forms[element];

    return this
  }


  function WPLF_Form(element) {
    this.form = element;
    this.submitState = null; // null | 'submitting' | 'success' | 'error'
    this.submitHandler = null;
    this.callbacks = {
      beforeSend: {},
      success: {},
      error: {}
    };


    console.log('hi', element, this)
    this.addSubmitHandler();
  }

  WPLF_Form.prototype.addCallback = function addCallback(name, type, callback) {
    this.callbacks[type][name] = callback;

    return this;
  }

  WPLF_Form.prototype.removeCallback = function removeCallback(name, type) {
    delete this.callbacks[type][name];

    return this;
  }

  WPLF_Form.prototype.addSubmitHandler = function addSubmitHandler(handler) {
    this.submitHandler = (handler || function(e) {
      console.log('triggered submit', this);
      e.preventDefault();

      // Prevent double submissions by blocking send if it's already in progress
      if (this.form.submitState === 'sending') {
        return;
      }

      // add class to enable css changes to indicate ajax loading
      this.form.classList.add('sending');
      [].forEach.call(this.form.querySelectorAll(".wplf-error"), function(error) {
        // reset errors
        error.parentNode.removeChild(error);
      });


      this.send()
        .then(
          function(response) {
            return response.text();
          }.bind(this)
        ).then(
          function(response) {
            response = JSON.parse(response);

            console.log(response)

            if( 'success' in response ) {
              // show success message if one exists
              var success = document.createElement("p");
              success.className = "wplf-success";
              success.innerHTML = response.success;

              this.form.parentNode.insertBefore(success, this.form.nextSibling);
            }

            if( 'ok' in response && response.ok ) {
              // submit succesful!
              this.form.parentNode.removeChild(this.form);

              this.submitStatus = 'success';
              Object.keys(this.callbacks.success).forEach(function(key) {
                this.callbacks.success[key](response, this);
              });
            }

            if( 'error' in response ) {
              // show error message in form
              var error = document.createElement("p");
              error.className = "wplf-error error";
              error.textContent = response.error;

              this.form.appendChild(error);

              this.submitStatus = 'error';
              this.callbacks.error.forEach(function(func) {
                func(response, this);
              });

              Object.keys(this.callbacks.error).forEach(function(key) {
                this.callbacks.error[key](response, this);
              });
            }

            this.form.classList.remove('sending');
          }.bind(this)
        ).catch(
          function(error) {
            this.form.classList.remove("sending");

            if (this.callbacks.error.length > 0) {
              Object.keys(this.callbacks.error).forEach(function(key) {
                this.callbacks.error[key](response, this);
              });
            } else {
              console.warn("Fetch error: ", error);
            }
        }.bind(this)
      );
    }).bind(this)
    this.form.addEventListener('submit', this.submitHandler);

    return this;
  }

  WPLF_Form.prototype.removeSubmitHandler = function removeSubmitHandler() {
    this.form.removeEventListener('submit', this.submitHandler);
    this.submitHandler = null;

    return this;
  }

  WPLF_Form.prototype.send = function send() {
    var form = this.form;
    var data = new FormData(form);

    // Pass language if it exists.
    WPLF_DATA.lang && data.append('lang', WPLF_DATA.lang);

    form.submitState = 'submitting';

    Object.keys(this.callbacks.beforeSend).forEach(function(key) {
      this.callbacks.beforeSend[key](form, this);
    });

    return fetch(WPLF_DATA.ajax_url, {
      method: "POST",
      credentials: WPLF_DATA.ajax_credentials || 'same-origin',
      body: data,
      headers: WPLF_DATA.request_headers || {},
    })
  }

  window.WPLF = new WPLF();

  if (WPLF_DATA.autoinit === '1') {
    [].forEach.call(
      document.querySelectorAll(".libre-form"),
      window.WPLF.attach.bind(window.WPLF)
    );
  }
})
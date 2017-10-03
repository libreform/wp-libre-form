/**
 * JS to be included on the front end pages with forms
 */

window.wplf = {
  successCallbacks: [],
  errorCallbacks: [],
  submitHandler: function (e) {
    var form = e.target;
    var data = new FormData(form);

    // Pass language if it exists.
    ajax_object.lang && data.append('lang', ajax_object.lang);

    // add class to enable css changes to indicate ajax loading
    form.classList.add("sending");

    [].forEach.call(form.querySelectorAll(".wplf-error"), function(error) {
      // reset errors
      error.parentNode.removeChild(error);
    });

    fetch(ajax_object.ajax_url  + '?action=wplf_submit', {
      method: "POST",
      credentials: ajax_object.ajax_credentials || 'same-origin',
      body: data
    }).then(function(response) {
      return response.text();
    }).then(function(response) {
      response = JSON.parse(response);

      if( 'success' in response ) {
        // show success message if one exists
        var success = document.createElement("p");
        success.className = "wplf-success";
        success.innerHTML = response.success;

        form.parentNode.insertBefore(success, form.nextSibling);
      }

      if( 'ok' in response && response.ok ) {
        // submit succesful!
        form.parentNode.removeChild(form);

        window.wplf.successCallbacks.forEach(function(func) {
          func(response);
        });
      }

      if( 'error' in response ) {
        // show error message in form
        var error = document.createElement("p");
        error.className = "wplf-error error";
        error.textContent = response.error;

        form.appendChild(error);

        window.wplf.errorCallbacks.forEach(function(func) {
          func(response);
        });
      }

      form.classList.remove('sending');
    }).catch(function(error) {
      form.classList.remove("sending");

      if (window.wplf.errorCallbacks.length > 0) {
        window.wplf.errorCallbacks.forEach(function(func) {
          func(error);
        });
      } else {
        console.warn("Fetch error: ", error);
      }
    });

    // don't actually submit the form, causing a page reload
    e.preventDefault();
  },
  attach: function(form) {
    // form is a selector
    if (typeof form == 'string') {
      form = document.querySelectorAll(form);
    }

    // form is an array of elements or a node list
    if (form.constructor === Array || form.constructor === NodeList) {
      [].forEach.call(form, function(form){
        window.wplf.attach(form);
      });
      return;
    }

    form.addEventListener("submit", window.wplf.submitHandler);
  }
};

var main = function () {
  [].forEach.call(document.querySelectorAll(".libre-form"), window.wplf.attach);
};

var dependencies = [];

if (!window.fetch) {
  dependencies.push('fetch');
}

if (!window.Promise) {
  dependencies.push('Promise');
}


function initialize(dependencies, app) {
  var dependency_count = dependencies.length;
  var dependencies_loaded = 0;
  var is_ready = function() {
    return dependency_count === dependencies_loaded;
  };
  var run_when_ready = function() {
    if (is_ready()) {
      app();
    }
  };
  var get_script = function(script) {
    var elmnt = document.createElement('script');
    elmnt.src = ajax_object.wplf_assets_dir + '/scripts/polyfills/' + script + '.js';

    return elmnt;
  };

  dependencies.map(function(dependency) {
    return dependency.toLowerCase();
  }).map(function(dependency) {
    return get_script(dependency);
  }).map(function(script) {
    script.addEventListener('load', function() {
      dependencies_loaded++;
      run_when_ready();
    });

    return document.body.appendChild(script);
  });

  run_when_ready();
}

document.addEventListener('DOMContentLoaded', function() {
  initialize(dependencies, main);
});

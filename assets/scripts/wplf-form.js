/**
 * JS to be included on the front end pages with forms
 */

(function(){
document.addEventListener("DOMContentLoaded", function(){
  [].forEach.call(document.querySelectorAll(".libre-form"), function(form){

    form.addEventListener("submit", function(e){

      // add class to enable css changes to indicate ajax loading
      form.classList.add("sending");

      [].forEach.call(form.querySelectorAll(".wplf-error"), function(error){
        // reset errors
        error.parentNode.removeChild(error);
      });

      var data = new FormData(form);

      window.data = data;

      fetch(ajax_object.ajax_url  + '?action=wplf_submit', {
        method: "POST",
        body: data
      }).then(function(response){

        return response.text();

      }).then(function(response){

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
        }

        if( 'error' in response ) {
          // show error message in form

          var error = document.createElement("p");
          error.className = "wplf-error error";
          error.textContent = response.error;

          form.appendChild(error);
        }

        form.classList.remove('sending');

      }).catch(function(error){

        console.warn("Fetch error: ", error);
        form.classList.remove("sending");

      });

      // don't actually submit the form, causing a page reload

      e.preventDefault();
    });

  });
});
})();

# WP Libre Form
[![Latest Stable Version](https://poser.pugx.org/anttiviljami/wp-libre-form/v/stable)](https://packagist.org/packages/anttiviljami/wp-libre-form) [![Total Downloads](https://poser.pugx.org/anttiviljami/wp-libre-form/downloads)](https://packagist.org/packages/anttiviljami/wp-libre-form) [![Latest Unstable Version](https://poser.pugx.org/anttiviljami/wp-libre-form/v/unstable)](https://packagist.org/packages/anttiviljami/wp-libre-form) [![License](https://poser.pugx.org/anttiviljami/wp-libre-form/license)](https://packagist.org/packages/anttiviljami/wp-libre-form)

Use standard HTML5 markup to create fully functional forms for WordPress

Features:
- Uses only HTML5 syntax to build forms. No GUIs, shortcodes, **no bullshit**
- Works with any valid HTML form. Just copy any form from any website and it will work. **It's magic!**
- Submits and validates forms via AJAX
- Automatically detects and captures fields in any HTML form. Form values are saved as standard custom fields
- Validates required fields automatically using the native HTML5 `required` attribute
- **It's pluggable.** Add your own validation or automation with filters and action hooks.
- Option to send a copy of submitted forms via email
- Preview your forms
- Full file upload support with input type=file

## Screenshots

### Editing a Form
![Form edit](/assets/screenshot-1.png)

### Form displayed in the default Twentysixteen theme
![Submissions](/assets/screenshot-2.png)

### Submissions view
![Submissions](/assets/screenshot-3.png)

### Single submission view
![Submissions](/assets/screenshot-4.png)

## Installation

### The Composer Way (preferred)

Install the plugin via [Composer](https://getcomposer.org/)
```
composer require anttiviljami/wp-libre-form
```

Activate the plugin
```
wp plugin activate wp-libre-form
```

### The Old Fashioned Way

This plugin is available on the [official WordPress.org plugin directory](https://wordpress.org/plugins/wp-libre-form/).

You can also install the plugin by directly uploading the zip file as instructed below:

1. [Download the plugin](https://github.com/anttiviljami/wp-libre-form/archive/master.zip)
2. Upload to the plugin to /wp-content/plugins/ via the WordPress plugin uploader or your preferred method
3. Activate the plugin

## Filter / Action API

### Action: wplf_post_validate_submission

Triggers after the form validation is done.

Example use:

Send a thank you email to the email in the submission

```php
<?php
add_action( 'wplf_post_validate_submission', 'my_email_thankyou' );
function my_email_thankyou( $return ) {
  // do nothing if form validation failed
  if( ! $return->ok ) {
    return;
  }

  $name = sanitize_text_field( $_POST['name'] );
  $email = sanitize_email( $_POST['email'] );
  $to = '"' . $name . '" <' . $email . '>';
  $subject = __( 'Thank You For Submitting A Form' );
  $content = wp_sprintf( __('Thanks, %s for clicking Submit on this glorious HTML5 Form!'), $name );
  wp_mail( $to, $subject, $content );
}
```

### Use shortcodes outside post content

By default, scripts are only loaded when the shortcode is within the content.
If you use shortcodes outside the content, ex. custom fields or by `do_shortcode`, you need to manually enqueue the scripts for the submit to work.

```php
wp_enqueue_script('wplf-form-js');
wp_localize_script( 'wplf-form-js', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
```

### Client side callbacks

WP Libre Form supports client side callbacks after form submission using window.wplf object. Example usage:

```
window.wplf.successCallbacks.push(function(response){
  alert("You succesfully submitted form " + response.form_id);
});

window.wplf.errorCallbacks.push(function(response){
  alert("Form submission failed!");
});
```

These callbacks are executed in the order they appear.

### Add CSS classes to form output

You can use the xclass attribute inside the shortcode to add your own extra classes.

```
[libre-form id="1" xclass="extra"]
```


### Filter: wplf_validate_submission

Used to add validation to your forms

Example use:

Make sure people don't include dumb questions about Contact Form 7 in the message field.

```php
<?php
add_filter( 'wplf_validate_submission', 'my_form_validation' );
function my_form_validation( $return ) {
  // skip this validation if submission has already failed
  if( ! $return->ok ) {
    return $return;
  }

  // don't allow contact form 7 to be mentioned in the message field
  if( false !== strpos( strtolower( $_POST['message'] ), 'contact form 7' ) ) {
    $return->ok = 0;
    $return->error = sprintf( __("I don't like Contact Form 7 so I won't accept your submission."), intval( $_POST['_form_id'] ) );
  }
  return $return;
}
```

### wplf_validate_submission example: Google ReCaptcha integration

```php
/**
 * ReCaptcha for WP Libre Form
 */
add_filter( 'wplf_validate_submission', 'wplf_recaptcha' );
function wplf_recaptcha( $return ) {
  // skip this validation if submission has already failed
  if( ! $return->ok ) {
    return $return;
  }

  $form = get_post( (int) $_POST['_form_id'] );
  if( false === strpos( $form->post_content, 'g-recaptcha' ) ) {
    // this form doesn't have recaptcha
    return $return;
  }

  $secret = 'XXXX'; // substitute with your own secret recaptcha key

  $options = [
    'http' => [
      'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
      'method'  => 'POST',
      'content' => http_build_query([
        'secret' => $secret,
        'response' => $_POST['g-recaptcha-response'],
      ])
    ],
  ];
  $context  = stream_context_create( $options );
  $result = file_get_contents( 'https://www.google.com/recaptcha/api/siteverify', false, $context );

  $captcha_obj = json_decode( $result );

  if( false === $captcha_obj->success ) {
    $return->ok = 0;
    $return->error = sprintf( __("Please prove you're not a robot before submitting."), intval( $_POST['_form_id'] ) );
  }

  return $return;
}
```

### Multilingual

You can create multilingual forms using Polylang. WPLF will register and automatically fetch the translation when you use special template tags.

Example:
```html
<input type="text" placeholder="{{ Test string  }}" name="test">
```

You can also disable this feature, and create your own middleware for WPML, if you'd like.

```php
add_filter( 'wplf_load_polylang' , function() {
  return false;
} );
```

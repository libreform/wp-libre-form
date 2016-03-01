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

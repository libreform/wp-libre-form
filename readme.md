# WP Libre Form
[![License](http://img.shields.io/:license-gpl3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0.html)

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

## Installation

1. Upload plugin to the /wp-content/plugins/ directory.
2. Activate the plugin through the "Plugins" menu in WordPress.
3. Installation done!

## Screenshots

### Editing a Form
![Form edit](/assets/screenshot-1.png)

## Filter / Action API

### Action: wplf_post_validate_submission

Triggers after the form validation is done.

Example use:

Send a thank you email to the email in the submission

```
add_action( 'wplf_post_validate_submission', 'my_email_thankyou' );
function my_email_thankyou( $return ) {
  // do nothing if form validation failed
  if( ! $return->ok ) {
    return;
  }

  $to = '"' . $_POST['name'] . '" <' . sanitize_email( $_POST['email'] ) . '>';
  $subject = __( 'Thank You For Submitting A Form' );
  $content = wp_sprintf( __('Thanks, %s for clicking Submit on this glorious HTML5 Form!'), $_POST['name'] );
  wp_mail( $to, $subject, $content );
}
```

### Filter: wplf_validate_submission

Used to add validation to your forms

Example use:

Make sure people don't include dumb questions about Contact Form 7 in the message field.

```
add_filter( 'wplf_validate_submission', 'my_form_validation' );
function my_form_validation( $return ) {
  // skip this validation if submission has already failed
  if( ! $return->ok ) {
    return $return;
  }

  // don't allow contact form 7 to be mentioned in the message field
  if( false !== strpos( strtolower( $_POST['message'] ), 'contact form 7' ) ) {
    $return->ok = 0;
    $return->error = sprintf( __('I don't like Contact Form 7 so I won't accept your submission.'), intval( $_POST['_form_id'] ) );
  }
  return $return;
}
```

# WP Libre Form
[![Build Status](https://travis-ci.org/libreform/wp-libre-form.svg?branch=master)](https://travis-ci.org/libreform/wp-libre-form) [![Latest Stable Version](https://poser.pugx.org/anttiviljami/wp-libre-form/v/stable)](https://packagist.org/packages/anttiviljami/wp-libre-form) [![Total Downloads](https://poser.pugx.org/anttiviljami/wp-libre-form/downloads)](https://packagist.org/packages/anttiviljami/wp-libre-form) [![Latest Unstable Version](https://poser.pugx.org/anttiviljami/wp-libre-form/v/unstable)](https://packagist.org/packages/anttiviljami/wp-libre-form) [![License](https://poser.pugx.org/anttiviljami/wp-libre-form/license)](https://packagist.org/packages/anttiviljami/wp-libre-form)

Use standard HTML5 markup to create fully functional forms for WordPress

## Features

- Uses only HTML5 syntax to build forms. No GUIs, shortcodes, **no bullshit**.
- Works with any valid HTML form. Just copy any form from any website and it will work. **It's magic!**
- Submissions are saved as custom post type posts. Form values are saved as custom fields.
- Validates required fields tagged with the native HTML5 `required` attribute.
- **It's hackable.** Add your own functionality with hooks and APIs.
- Email notifications of received form submissions
- Full file upload support to Media Library with input type=file
- Multilingual support with Polylang
- Predefined static HTML forms via filter hooks
- Dynamic values, like `## USER_EMAIL ##` for pre-populating form data
- Frontend JavaScript API. You can even install from npm.

## Why?

Modern HTML markup is already a great way to build forms. With Libre Form,
there's no need to learn clunky form builders that are hard to customise.

Just use standard HTML inputs to build, or copy a form to your WordPress site
that will just magically work. No need to touch PHP code if you don't want to.

Required field validation, email notifications, file uploads to WP gallery and
lots more are included by default in the core of the plugin, but you can also
add your own functionality with [hooks and APIs](#filter--action-api) provided
by Libre Form.

## Try it
[TryoutWP](https://gettryout.com/) has provided us with a live demo, [which you can find here](http://gettryout.com/new/?template=libreform&provider=demo&redirect=wp-admin%2Fpost.php%3Fpost%3D4%26action%3Dedit ). It reflects the current release, not the master branch.

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
composer require libreform/wp-libre-form
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

## Multisite (WordPress Network) support

WP Libre Form works fine in WordPress Network (multisite). There's some gotchas:

- Plugin must be activated in each site, not on network level
- Only Super Admins can edit forms.
  - This is because Network strips dangerous input like iframes & input fields from the content.
  - Can be worked around by installing [Unfiltered MU](https://wordpress.org/plugins/unfiltered-mu/)

## Filter / Action API

### Filter: wplf_validate_submission

Used to add validation to your forms.

#### Form specific hooks

This filter supports form specific hooks:

- `wplf_{form_id}_validate_submission`
- `wplf_{form_slug}_validate_submission`

These filters are only applied for the target form by ID or slug.

#### Example: Google ReCaptcha integration

```php
/**
 * ReCaptcha for WP Libre Form
 */
add_filter( 'wplf_validate_submission', 'wplf_recaptcha' );
function wplf_recaptcha( $return ) {
  // skip this validation if submission has already failed
  if ( ! $return->ok ) {
    return $return;
  }

  $secret = RECAPTCHA_KEY; // substitute with your own secret recaptcha key string
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

  if ( false === $captcha_obj->success ) {
    $return->ok = 0;
    $return->error = __("Please prove you're not a robot before submitting.");
  }

  return $return;
}
```

### Action: wplf_post_validate_submission

Triggers after the form validation is done.

#### Form specific hooks

This action supports form specific hooks:

- `wplf_{form_id}_post_validate_submission`
- `wplf_{form_slug}_post_validate_submission`

These actions are only run for the target form by ID or slug.

#### Example: Send a thank you email to the email in the submission

```php
add_action( 'wplf_post_validate_submission', 'my_email_thankyou' );
function my_email_thankyou( $return ) {
  // recipient details from submission
  $name = sanitize_text_field( $_POST['name'] );
  $email = sanitize_email( $_POST['email'] );

  // email subject
  $subject = __( 'Thank You For Submitting A Form' );

  // text body of email
  $body = wp_sprintf( __('Thanks, %s for clicking Submit on this glorious HTML5 Form!'), $name );

  // send the email
  wp_mail( $email, $subject, $body );
}
```

### Filter: wplf_disable_validate_additional_fields

Dynamically generated fields are disabled by default. If you want to allow fields that are not set in the form to be submitted you can use this filter.

#### Form specific hooks

This filter supports form specific hooks:

- `wplf_{form_id}_disable_validate_additional_fields`
- `wplf_{form_slug}_disable_validate_additional_fields`

These filters are only applied for the target form by ID or slug.

Disabling additonal fields validation for all forms:

```php
add_filter( 'wplf_disable_validate_additional_fields' , '__return_true' );
```

### Filter: wplf_allowed_additional_form_fields

You can provide your own set of allowed field names, instead of disabling additional field validation entirely.

#### Form specific hooks

This filter supports form specific hooks:

- `wplf_{form_id}_allowed_additional_form_fields`
- `wplf_{form_slug}_allowed_additional_form_fields`

These filters are only applied for the target form by ID or slug.

Disabling additonal fields validation for all forms:

```php
add_filter( 'wplf_allowed_additional_form_fields' , ['dynamic-field-name'] );
```

### Filter: wplf_dynamic_values

Add or customize dynamic values available in forms.

#### Example: new value

```php
add_filter('wplf_dynamic_values', function($values) {
  $values['SOMETHING'] = [
    'callback' => function() { return 'something'; },
    'labels' => [
      'name' => 'Something',
      'description' => 'Something really useful.'
    ],
  ];

  return $values;
});

// <input type="text" placeholder="## SOMETHING ##" name="something">
```


### Filter: wplf_uploaded_file_name
If you choose to not add uploaded files to the media library, you can change the file upload name.

```php
add_filter('wplf_uploaded_file_name', function($name, $file, $id) {
  return "my_".$name;
}, 10, 3);
```

### Filter: wplf_uploaded_file_path
If you choose to not add uploaded files to the media library, you can change the file upload path.

```php
add_filter('wplf_uploaded_file_path', function($name, $file, $id) {
  return $name.".userfile";
}, 10, 3);
```

## Plugins
1.5 exposes a new function, `wplf()`. It simply returns the class instance of WP Libre Form.

It allows you to register your plugin as a WP Libre Form plugin, which in turn allows you to expose an API and a settings page for your plugin, should you want to.

```php
$wplf = wplf();
$plugin = new YourPlugin();

$wplf->plugins->register([
  "name" => "YourPlugin", // The name you wish to show on the WPLF plugin page. Willl also be used to access public methods in your plugin
  "description" => "What your plugin does in a sentence or two",
  "link" => "https://toyourplugin.com", // Plugin URL. Can be wordpress.org or pretty much any URL where you can download the plugin
  "version" => YOUR_PLUGIN_VERSION, // Define a constant containing your plugin version
  "instance" => $plugin, // Your plugin, instantiated. Users can access your public methods
  "settings_page" => [$plugin, "render_settings_page"], // Function that renders your settings page, or a string that contains the link to it. Leave empty to disable.
]);
```

If you use spaces in the name, you can access the plugin instance like this:

`wplf()->plugins->{"Your plugin"}->somePublicMethod()`

## Javascript API

If you have installed our npm package:
```javascript
import WPLF from '@libreform/wp-libre-form'
```

and if you haven't
```javascript
const { WPLF } = window // same as var WPLF = window.WPLF
```

You might find `WPLF_Form` useful as well. You can access it through the WPLF object. Note that you don't need to create instances of it yourself in most situations.

```javascript
const { WPLF_Form } = WPLF
```

### Troubleshooting
#### `WPLF` is null
Most likely your JavaScript is being run before ours, and you're trying to use the API before it exists. Either add our frontend script to your scripts dependencies

```php
wp_enqueue_script("themejs", "/path/to/theme.js", ["wplf-form-js"], ...);
```

or use our npm package.


### Methods
More methods than these exist, but if it's undocumented, you shouldn't use it. That's especially true for any methods prefixed with an underscore `_`. Because it's JavaScript, there's no real way of having private class methods.

#### WPLF.whenReady(Function)
If WPLF is missing dependencies, it has to load them before it can initialize. If all dependencies are present, this will be called immediately. Use this to initialize your custom code at the right time.

```javascript
WPLF.whenReady(() => {
  WPLF.findFormsById(123).forEach(form => {
    form.addCallback('huge success', 'success', (response) => {
      alert('???')
    })
  })
})
```

#### WPLF.findFormsById(Number)
Returns an array populated with `WPLF_Form` instances. It's valid to have multiple instances of the form on one page.

```javascript
WPLF.findFormsById(123).forEach(form => {
  // Do whatever you want. Mess with the DOM, add callbacks, etc.
})
```

#### WPLF.attach(HTMLElement | WPLF_Form)
Create WPLF_Form instance from element and make it visible to WPLF.findFormsById.

You will only need this if you load forms dynamically or you've disabled autoinit of forms.

You can also pass WPLF_Form directly.

```javascript
WPLF.attach(document.querySelector('.libre-form'))

WPLF.attach(new WPLF_Form(document.querySelector('.libre-form')))
```

#### WPLF.detach(HTMLElement | WPLF_Form)
Destroy WPLF_Form instance and remove event listeners from the form. 

```javascript
WPLF.detach(document.querySelector('.libre-form'))

WPLF.detach(new WPLF_Form(document.querySelector('.libre-form')))
```

#### WPLF_Form.addCallback(String name, String type, Function callback)
Adds a callback to the form. `type` can be one of three: `beforeSend`, `success` or `error`.

The callback parameters depend on the type of callback.
```javascript
const form = WPLF.findFormsById(123)[0]

form.addCallback('huge success', 'success', (response) => {
  alert('???')
})
```

#### WPLF_Form.removeCallback(String name, String type)
Remove a callback from the form.

```javascript
const form = WPLF.findFormsById(123)[0]

form.removeCallback('huge success', 'success')
```

#### WPLF_Form.addSubmitHandler(Function handler) 
If you want to set a custom submit handler for the form, this is how. Please note that if you don't implement callbacks in your submit handler, they will not work.

#### WPLF_Form.removeSubmitHandler
Using your own custom submit handler requires unsetting the existing one.

#### WPLF_Form.runCallback(String type, ...args)
Use this inside your custom submit handler to keep callback support. It calls every callback of the `type` with any number of parameters.

#### WPLF_Form.send
Gather form data from the DOM and send the data to backend. You can implement your own send method as well, but do we recommend it?

No.

## REST API driven sites

You can get forms out of the REST API. Just use `/wp/v2/wplf-form` to retrieve forms. You can get a singular form by using filters:

`/wp/v2/wplf-form?slug=form-slug`

However, if you're sending forms from a different domain than WP site URL, you'll run across a CORS issue submitting the form, which you can get around with this:

```php
add_action('wplf_pre_validate_submission', function() {
  $origin = $_SERVER['HTTP_ORIGIN'];
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Credentials: true");
});
```
Do note that the above code snippet opens your form submissions to the world.

You can also use the "official" JS bundle if you want to.

```javascript
window.ajax_object = {
  ajax_url: `${WP.url}/wp-admin/admin-ajax.php`,
  ajax_credentials: 'include', // different origin
  wplf_assets_dir: `${WP.url}/wp-content/plugins/wp-libre-form/assets`,
}

await new Promise((resolve, reject) => {
  const script = document.createElement('script')
  const timeout = setTimeout(reject, 30000)
  script.src = `${WP.url}/wp-content/plugins/wp-libre-form/assets/scripts/wplf-form.js`
  script.onload = (e) => {
    clearInterval(timeout)
    resolve()
  }

  document.body.appendChild(script)
})
```

## Multilingual

You can create multilingual forms using Polylang. WPLF will register and automatically fetch the translation when you use special template tags.

Example:
```html
<input type="text" placeholder="{{ Test string }}" name="test">
```

You can also disable this feature, and create your own middleware for WPML, if you'd like.

```php
add_filter( 'wplf_load_polylang' , __return_false );
```

## Adding extra classes to the form element

You can use the xclass attribute inside the shortcode to add your own extra classes for CSS.

```
[libre-form id="1" xclass="extra"]
```

## Adding extra attributes to the form element

You can add any custom attributes to the form element easily by adding them to the shortcode

```
[libre-form id="1" data-custom-attr="contactme"]
```

The attribute will render as is on the `<form>` element

```html
<form class="libre-form libre-form-1" data-custom-attr="contactme">
```

## Importing forms from a predefined HTML template

Sometimes a project might require static forms which are not supposed to
be editable in the admin panel.

This plugin allows you to define HTML forms in your project source code
and import them into the form admin for specific forms.

### Creating a static HTML template

The simplest way is to create a HTML5 file and read its contents. Other
options include using Twig to render HTML templates.

Remember: WPLF will insert `form` tags on its own, meaning you only have
to create the markup which sits directly inside the `form` tags.

### Importing a template into WPLF

Once you're done creating a form template, you need to inform
WPLF about it. You can use the `wplf_import_html_template`
filter hook for this:

```php
<?php

add_filter( 'wplf_import_html_template', function ( $template, $form_id ) {
    $some_form_id = 123;

    if ( $form_id === $some_form_id ) {
        // You can also render Twig templates and similar here
        return file_get_contents( '/path/to/template/file.html' );
    }

    return $template;
}, 10, 2 );
```

The `$template` variable should be a raw HTML string. If it is set to
`null` no template will be imported.

After a template is imported for a certain form the form's editview will
be set to read only mode, meaning you must make changes to the static
HTML template in code instead of editing the form inside the admin
panel.

Otherwise the form should function normally, meaning you can use WPLF
features as always.

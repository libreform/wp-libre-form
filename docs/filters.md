# WP Libre Form Filters

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
add_filter('wplf_validate_submission', 'wplf_recaptcha');
function wplf_recaptcha($return) {
  // skip this validation if submission has already failed
  if (! $return->ok) {
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

  $context  = stream_context_create($options);
  $result = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);

  $captcha_obj = json_decode($result);

  if (false === $captcha_obj->success) {
    $return->ok = 0;
    $return->error = __("Please prove you're not a robot before submitting.");
  }

  return $return;
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
add_filter('wplf_disable_validate_additional_fields' , '__return_true');
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
add_filter('wplf_allowed_additional_form_fields' , ['dynamic-field-name']);
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
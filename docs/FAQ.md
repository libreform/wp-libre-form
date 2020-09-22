# Frequently asked questions

## Multisite (WordPress Network) support

WP Libre Form works fine in WordPress Network (multisite). There's some gotchas:

- Plugin must be activated in each site, not on network level
- Only Super Admins can edit forms.
  - This is because Network strips dangerous input like iframes & input fields from the content.
  - Can be worked around by installing [Unfiltered MU](https://wordpress.org/plugins/unfiltered-mu/)

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

Use our npm package @libreform/wp-libreform to send the forms. ~~You can also use the "official" JS bundle if you want to.~~

```javascript
// window.ajax_object = {
//   ajax_url: `${WP.url}/wp-admin/admin-ajax.php`,
//   ajax_credentials: 'include', // different origin
//   wplf_assets_dir: `${WP.url}/wp-content/plugins/wp-libreform/assets`,
// }

// await new Promise((resolve, reject) => {
//   const script = document.createElement('script')
//   const timeout = setTimeout(reject, 30000)
//   script.src = `${WP.url}/wp-content/plugins/wp-libreform/assets/scripts/wplf-form.js`
//   script.onload = (e) => {
//     clearInterval(timeout)
//     resolve()
//   }

//   document.body.appendChild(script)
})
```

## Uncaught ReferenceError: WPLF is not defined

The form script is enqueued when a form is rendered. If there isn't a form on the page, window.WPLF isn't available. Either install the npm package or make your script depend on wplf-frontend;

```php
wp_enqueue_script('yourscript', $pathToScript, ['wplf-frontend'], $version, true);
```

## Multilingual

We've made special efforts to ensure compatibility with Polylang. WPML is not supported.

Enable translation of Forms in Polylang settings. You're good to go! If you don't enable it, your forms will not have a language, and translations might not work.

![settings](polylang-1.png)

We have a special `## PLL__ YourStringHere ##` selector that you can use in your forms. After using the selector in a form, you should see it in the string translations menu of Polylang.

![settings](polylang-2.png)

Using the selector for all translated content in your form lets you synchronize the same form between all languages, making future edits easier.

## Adding extra classes to the form element

You can use the className attribute inside the shortcode to add your own extra classes for CSS.

```
[libreform id="1" className="extra"]
```

## Adding extra attributes to the form element

You can add any custom attributes to the form element easily by adding them to the shortcode

```
[libreform id="1" data-custom-attr="contactme"]
```

The attribute will render as is on the `<form>` element

```html
<form class="wplf libreform-1" data-custom-attr="contactme"></form>
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

add_filter('wplf_import_html_template', function ($template, $form_id) {
    $some_form_id = 123;

    if ($form_id === $some_form_id) {
        // You can also render Twig templates and similar here
        return file_get_contents('/path/to/template/file.html');
    }

    return $template;
}, 10, 2);
```

The `$template` variable should be a raw HTML string. If it is set to
`null` no template will be imported.

After a template is imported for a certain form the form's editview will
be set to read only mode, meaning you must make changes to the static
HTML template in code instead of editing the form inside the admin
panel.

Otherwise the form should function normally, meaning you can use WPLF
features as always.

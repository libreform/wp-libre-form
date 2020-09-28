# WP Libre Form API

TODO

## PHP

WPLF instance is saved in a static variable and available with the `libreform()` function available in the global namespace.

### Example: Register a plugin to WPLF

```php
$wplf = libreform();
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

`libreform()->plugins->{"Your plugin"}->somePublicMethod()`

## Javascript

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

### Methods

More methods than these exist, but if it's undocumented, you shouldn't use it. That's especially true for any methods prefixed with an underscore `_`. Because it's JavaScript, there's no real way of having private class methods.

#### WPLF.whenReady(Function)

If WPLF is missing dependencies, it has to load them before it can initialize. If all dependencies are present, this will be called immediately. Use this to initialize your custom code at the right time.

```javascript
WPLF.whenReady(() => {
  WPLF.findFormsById(123).forEach((form) => {
    form.addCallback('huge success', 'success', (response) => {
      alert('???')
    })
  })
})
```

#### WPLF.findFormsById(Number)

Returns an array populated with `WPLF_Form` instances. It's valid to have multiple instances of the form on one page.

```javascript
WPLF.findFormsById(123).forEach((form) => {
  // Do whatever you want. Mess with the DOM, add callbacks, etc.
})
```

#### WPLF.attach(HTMLElement | WPLF_Form)

Create WPLF_Form instance from element and make it visible to WPLF.findFormsById.

You will only need this if you load forms dynamically or you've disabled autoinit of forms.

You can also pass WPLF_Form directly.

```javascript
WPLF.attach(document.querySelector('.wplf'))

WPLF.attach(new WPLF_Form(document.querySelector('.wplf')))
```

#### WPLF.detach(HTMLElement | WPLF_Form)

Destroy WPLF_Form instance and remove event listeners from the form.

```javascript
WPLF.detach(document.querySelector('.wplf'))

WPLF.detach(new WPLF_Form(document.querySelector('.wplf')))
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

### Troubleshooting

#### `WPLF` is null

Most likely your JavaScript is being run before ours, and you're trying to use the API before it exists. Either add our frontend script to your scripts dependencies

```php
wp_enqueue_script("themejs", "/path/to/theme.js", ["wplf-form-js"], ...);
```

or use our npm package.

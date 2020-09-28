## Limitations

There are some limitations, which could be removed but require work.

- Field names like the following; `fieldgroup[name]` are not supported.
  - `dietaryRestrictions[]` works just fine, often used with multiple checkboxes
  - This restriction exists because supporting them complicates things quite a lot, and their usage is rare. It's possible to support this if you absolutely need to.
- There are some additional restrictions to field names. You can't use `_fieldId` for example.
  - You can't reuse a name which has existed before in the form. This is to protect any earlier submissions. You can override this on a form-by-form basis.
  - A validation error is thrown if that happens so you can't mess up.
- The Polylang integration doesn't work properly. Strings are not always translated in the rest api responses.
- Template overrides from v1 don't exist yet.
  - They may not exist at all, since you can call the render manually and provide the content you want, and disable UI in that form with JS.
- Submissions view is "a bit crude" at the moment and there is export.
  - Plans to add an export module exists as well as an actual UI for submissions
- Database generation & alteration is still buggy, as well as a bunch of other things.
- Uninstallation doesn't delete data yet
- The text domain refuses to load

## Browser support

The plugin may not work properly in outdated browsers, as it uses modern JavaScript features such as Fetch, Promise and async await. At the time of writing, all of these have been available natively in evergreen browsers such as Brave, Chrome and Firefox for quite some time now.

We used to provide polyfills for Fetch and Promise, but doing it yourself is a much better option. Test your forms on browsers that you expect your users to submit them with, and provide the necessary polyfills yourself. Our build process compiles the JS to target target browsers matching this browserslist query: [`>0.25%, not ie 11, not op_mini all`](https://jamie.build/last-2-versions)

In other words, our code is not bloated with stuff that 99% of the browsers have natively. You can use polyfill.io to provide support for older browsers if necessary. It's possible to get the plugin to work in a "browser" such as IE11, submit an issue if you need help with that.

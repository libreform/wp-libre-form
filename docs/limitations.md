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
### Action: wplf_post_validate_submission

Triggers after the form validation is done.

#### Form specific hooks

This action supports form specific hooks:

- `wplf_{form_id}_post_validate_submission`
- `wplf_{form_slug}_post_validate_submission`

These actions are only run for the target form by ID or slug.

#### Example: Send a thank you email to the email in the submission

```php
add_action('wplf_post_validate_submission', 'my_email_thankyou');
function my_email_thankyou($return) {
  // recipient details from submission
  $name = sanitize_text_field($_POST['name']);
  $email = sanitize_email($_POST['email']);

  // email subject
  $subject = __('Thank You For Submitting A Form');

  // text body of email
  $body = wp_sprintf(__('Thanks, %s for clicking Submit on this glorious HTML5 Form!'), $name);

  // send the email
  wp_mail($email, $subject, $body);
}
```

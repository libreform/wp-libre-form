<?php
/**
 * Ajax handler for the form submissions
 */

add_action('wp_ajax_wplf_submit', 'wplf_ajax_submit_handler');
add_action('wp_ajax_nopriv_wplf_submit', 'wplf_ajax_submit_handler');
function wplf_ajax_submit_handler()
{

  $return = new stdClass();
  $return->ok = 1;

  // allow user to pre-process the post fields
  do_action('wplf_pre_validate_submission');

  // validate form fields
  // @see: wplf-form-validation.php
  $return = apply_filters('wplf_validate_submission', $return);

  // form existence has already been validated via filters
  $form = get_post(intval($_POST['_form_id']));

  if ($return->ok) {
    // form-specific validation
    $return->slug = $form->post_name;
    $return->title = $form->post_title;
    $return = apply_filters("wplf_{$form->post_name}_validate_submission", $return);
    $return = apply_filters("wplf_{$form->ID}_validate_submission", $return);
  }

  if ($return->ok) {
    // the title is the value of whatever the first field was in the form
    $title_format = get_post_meta($form->ID, '_wplf_title_format', true);

    // create submission post
    $post_id = wp_insert_post(array(
      'post_title'     => '',
      'post_status'    => 'publish',
      'post_type'      => 'wplf-submission',
    ));

    // exposes $post_id in $_POST to be able to use in the title
    // hacky, but uses less memory than a copy of $_POST
    $_POST['submission-id'] = $post_id;

    // substitute the %..% tags with field values
    $post_title = $title_format;

    preg_match_all('/%(.+?)%/', $post_title, $toks);
    foreach ($toks[1] as $tok) {
      $replace = '';
      if (array_key_exists($tok, $_POST)) {
        $replace = sanitize_text_field($_POST[ $tok ]);
      }
      $post_title = preg_replace('/%.+?%/', $replace, $post_title, 1);
    }

    // save the title
    wp_update_post([
      'ID'         => $post_id,
      'post_title' => $post_title,
    ]);

    // don't save the post id in meta
    unset($_POST['submission-id']);

    // add submission data as meta values
    foreach ($_POST as $key => $value) {
      if (! is_array($value)) {
        add_post_meta($post_id, $key, esc_html($value), true);
      } else {
        add_post_meta($post_id, $key, $value, true);
      }
    }

    // handle files
    $uploads_path = wp_upload_dir();
    $should_store_images_in_medialibrary = get_post_meta($form->ID, '_wplf_media_library', true);
    $counter = 0;
    foreach ($_FILES as $key => $file) {
      // skip empty upload fields
      if (empty($file['tmp_name'])) {
        continue;
      }

      // Is this enough security wise?
      // Currenly only supports 1 file per input
      if ($should_store_images_in_medialibrary) {
        $attach_id = media_handle_upload($key, 0, array(), array(
          'test_form' => false,
        ));

        if (! is_wp_error($attach_id)) {
          add_post_meta($post_id, $key, wp_get_attachment_url($attach_id));
          add_post_meta($post_id, $key . '_attachment', $attach_id);
        }
      } else {
        $file['field_name'] = $key;

        $default_file_name = 'lf_' . date('ymdhs') . '-' . $counter . '-' . $file['name'];
        $file_name = sanitize_file_name(apply_filters('wplf_uploaded_file_name', $default_file_name, $file, $post_id));

        $file_path = $uploads_path['path'] . '/' . $file_name;
        $file_path = apply_filters('wplf_uploaded_file_path', $file_path, $file, $post_id);

        move_uploaded_file($file['tmp_name'], $file_path);
        add_post_meta($post_id, $key . '_attachment', $file_path);
        $counter++;
      }
    }

    // save email copy address to submission meta for later use
    $to = get_post_meta($form->ID, '_wplf_email_copy_to', true);
    $to = ! empty($to) ? $to : get_option('admin_email');
    add_post_meta($post_id, '_wplf_email_copy_to', apply_filters('wplf_email_copy_to', $to));

    $return->submission_id = $post_id;
    $return->submission_title = $post_title;
    $return->form_id = $form->ID;

    $success = get_post_meta($form->ID, '_wplf_thank_you', true);
    $success = apply_filters("wplf_{$form->post_name}_success_message", $success);
    $success = apply_filters("wplf_{$form->ID}_success_message", $success);
    $success = apply_filters('wplf_success_message', $success);

    // return the success message for the form
    $return->success = $success;

    // allow user to attach custom actions after the submission has been received
    // these could be confirmation emails, additional processing for the submission fields, e.g.
    do_action('wplf_post_validate_submission', $return);
    do_action("wplf_{$form->post_name}_post_validate_submission", $return);
    do_action("wplf_{$form->ID}_post_validate_submission", $return);
  }

  // respond with json
  wp_send_json($return);
  wp_die();
}

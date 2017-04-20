<?php

/**
 * Ajax handler for the form submissions
 */
add_action( 'wp_ajax_wplf_submit', 'wplf_ajax_submit_handler' );
add_action( 'wp_ajax_nopriv_wplf_submit', 'wplf_ajax_submit_handler' );
function wplf_ajax_submit_handler() {
  $wplf = WP_Libre_Form::init();
  $return = new stdClass();
  $return->ok = 1;

  // allow user to pre-process the post fields
  do_action('wplf_pre_validate_submission');

  // validate form fields
  // @see: wplf-form-validation.php
  $return = apply_filters( 'wplf_validate_submission', $return );

  if( $return->ok ) {
    // copy $_POST to $data in order to undo WordPress' magic quotes for
    // wplf_post_data. Filtered data will be escaped appropriately.
    $data = stripslashes_deep($_POST);

    // form existence has already been validated via filters
    $form = get_post( intval( $data['_form_id'] ) );


    // Make POST data filterable
    $data = apply_filters( 'wplf_submission_data', $data );

    $form_meta = get_post_meta( $form->ID );

    // Compile all relevant data into a single array. This will be passed to wplf_post_validate_submission,
    // so the same data wouldn't have to be looked up again.
    // This is mostly for aesthetic reasons and DRY KISS.
    $submission = [
      'data' => $data,      // Filtered POST data
      'meta' => [],         // Form metadata
      'form' => $form,      // Form object
      'post_title' => '',   // Filtered submission title
    ];
    // Seems that all metadata have only 1 value, so we simplify the structure a bit.
    // TODO: Just to be sure, here's a reminder to check
    foreach ($form_meta as $key => $value) {
      $submission['meta'][$key] = $value[0];
    }

    // Try _wplf_title_format from metadata but if it for some reason fails, just use form name
    $title_format = !empty($submission['meta']['_wplf_title_format']) ? $submission['meta']['_wplf_title_format'] : $form->post_title;
    $title_format = apply_filters('wplf_submission_title_format', $title_format);


    // special values for subtitution that need an easier key are not really usable elsewhere
    $specialValues = [
      'form-name' => $form->post_title,
    ];
      // Assign submission title and substitute tokens
    $submission['post_title'] = $wplf->substitute($title_format, $specialValues, false);
    $submission['post_title'] = $wplf->substitute($submission['post_title'], $submission['data']);
    // Probably no extra value in filtering post title, since $title_format has a filter already, so skip it.

    // create submission post
    $post_id = wp_insert_post( array(
      'post_title'     => $submission['post_title'],
      'post_status'    => 'publish',
      'post_type'      => 'wplf-submission',
    ));

    // add submission data as meta values
    foreach( $submission['data'] as $key => $value ) {
      if ( is_array($value ) )
        $value = json_encode($value);

      // Escape slashes for add_post_meta (https://codex.wordpress.org/Function_Reference/update_post_meta#Character_Escaping)
      $value = wp_slash($value);

      add_post_meta($post_id, $key, $value, true);
    }

    // handle files
    foreach( $_FILES as $key => $file) {
      // Is this enough security wise?
      // Currenly only supports 1 file per input
      $attach_id = media_handle_upload( $key, 0, array(), array( "test_form" => false ) );
      add_post_meta( $post_id, $key, wp_get_attachment_url($attach_id) );
      add_post_meta( $post_id, $key . "_attachment", $attach_id );

      // TODO: For completeness' sake attachments should also be added to submission
    }



    $return->submission_id = $post_id;
    $return->submission_title = $submission['post_title'];
    $return->form_id = $form->ID;

    // return the success message for the form
    $return->success = apply_filters( 'the_content', $submission['meta']['_wplf_thank_you'], true );

    if (WP_DEBUG)
      $return->debug = $submission;

    // allow user to attach custom actions after the submission has been received
    // these could be confirmation emails, additional processing for the submission fields, e.g.
    do_action('wplf_post_validate_submission', $return, $submission);

  }

  // respond with json
  wp_send_json( $return );
  wp_die();
}

<?php

/**
 * Ajax handler for the form submissions
 */
add_action( 'wp_ajax_wplf_submit', 'wplf_ajax_submit_handler' );
add_action( 'wp_ajax_nopriv_wplf_submit', 'wplf_ajax_submit_handler' );
function wplf_ajax_submit_handler() {

  $return = new stdClass();
  $return->ok = 1;

  // allow user to pre-process the post fields
  do_action('wplf_pre_validate_submission');

  // validate form fields
  // see wplf-form-validation.php
  $return = apply_filters( 'wplf_validate_submission', $return );

  if( $return->ok ) {

    // form existence has already been validated via filters
    $form = get_post( $_POST['_form_id'] );

    // the title is the value of whatever the first field was in the form
    $title_format = get_post_meta( $form->ID, '_wplf_title_format', true );

    // substitute the %..% tags with field values
    $post_title = $title_format;

    preg_match_all('/%(.+?)%/', $post_title, $toks);
    foreach($toks[1] as $tok) {
      $replace = '';
      if( array_key_exists( $tok, $_POST ) ) {
        $replace = $_POST[$tok];
      }
      $post_title = preg_replace('/%.+?%/', $replace, $post_title, 1);
    }

    // create submission post
    $post_id = wp_insert_post( array(
      'post_title'     => $post_title,
      'post_status'    => 'publish',
      'post_type'      => 'wplf-submission',
    ));

    // add submission data as meta values
    foreach( $_POST as $key => $value ) {
      if( !is_array($value) ) {
        add_post_meta($post_id, $key, sanitize_text_field( $value ), true);
      }
      else {
        add_post_meta($post_id, $key, sanitize_text_field( json_encode( $value ) ), true);
      }
    }

    $return->submission_id = $post_id;
    $return->submission_title = $post_title;

    // return the success message for the form
    $return->success = apply_filters( 'the_content', get_post_meta( $form->ID, '_wplf_thank_you', true ) );

    // allow user to attach custom actions after the submission has been received
    // these could be confirmation emails, additional processing for the submission fields, e.g.
    do_action('wplf_post_validate_submission', $return);

  }

  // respond with json
  wp_send_json( $return );
  wp_die();
}


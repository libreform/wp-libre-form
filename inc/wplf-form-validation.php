<?php

/**
 * Check that Form exists
 */
add_filter( 'wplf_validate_submission', 'wplf_validate_form_exists' );
function wplf_validate_form_exists( $return ) {

  // skip this validation if submission has already failed
  if( ! $return->ok ) {
    return $return;
  }

  if( ! isset($_POST['_form_id']) || 'publish' != get_post_status( $_POST['_form_id'] ) || 'wplf-form' != get_post_type( $_POST['_form_id'] ) ) {
    $return->ok = 0;
    $return->error = sprintf( __("Form id %d doesn't exist!", 'wp-libre-form'), intval( $_POST['_form_id'] ) );
  }
  return $return;
}


/**
 * Check for required fields that are empty
 */
add_filter( 'wplf_validate_submission', 'wplf_validate_required_empty' );
function wplf_validate_required_empty( $return ) {

  // skip this validation if submission has already failed
  if( ! $return->ok ) {
    return $return;
  }

  // get required fields from form
  $required = explode( ',', get_post_meta( $_POST['_form_id'], '_wplf_required', true ) );
  $fields_empty = array();
  foreach( $required as $key ) {
    if( ! array_key_exists( $key, $_POST ) || empty( trim( $_POST[$key] ) ) ) {
      $fields_empty[] = $key;
    }
  }

  if( !empty( $fields_empty ) ) {
    $return->ok = 0;
    $return->error = __('Required fields are missing.', 'wp-libre-form');
    $return->fields_empty = $fields_empty;
  }

  return $return;
}

/**
 * Send a copy of the form fields email if feature is enabled
 */
add_action( 'wplf_post_validate_submission', 'wplf_send_email_copy' );
function wplf_send_email_copy( $return ) {
  // do nothing if form validation failed
  if( ! $return->ok ) {
    return;
  }

  $form_id = $_POST['_form_id'];
  $form_title = get_the_title( $form_id );
  $form_meta = get_post_meta( $form_id );
  $referrer = $_POST['referrer'];

  if( isset($form_meta['_wplf_email_copy_enabled']) && $form_meta['_wplf_email_copy_enabled'][0] ) {
    $to = isset($form_meta['_wplf_email_copy_to']) ? $form_meta['_wplf_email_copy_to'][0] : get_option( 'admin_email' );
    $subject = wp_sprintf( __('New submission from %s', 'wp-libre-form'), $referrer );
    $content = wp_sprintf( __('Form "%s" (ID %d) was submitted with values below: ', 'wp-libre-form'), $form_title, $form_id ) . "\n\n";
    foreach( $_POST as $key => $value ) {
      if( $key === 'referrer' ) {
        $key = __( 'referrer', 'wp-libre-form' );
      }
      if( $key != '_form_id' ) {
        $content .= esc_html( $key ) . ': ' . esc_html( print_r( $value, true ) ) . "\n";
      }
    }
    wp_mail( $to, $subject, $content );
  }
}


<?php

/**
 * Check that Form exists
 */
add_filter( 'wplf_validate_submission', 'wplf_validate_form_exists' );
function wplf_validate_form_exists( $return ) {
  // skip this validation if submission has already failed
  if ( ! $return->ok ) {
    return $return;
  }

  if ( ! isset( $_POST['_form_id'] )
    || ! is_numeric( $_POST['_form_id'] )
    || 'publish' !== get_post_status( $_POST['_form_id'] )
    || 'wplf-form' !== get_post_type( $_POST['_form_id'] )
  ) {
    $return->ok = 0;
    // translators: %d is form ID
    $return->error = sprintf( __( "Form id %d doesn't exist!", 'wp-libre-form' ), intval( $_POST['_form_id'] ) );
  }
  return $return;
}


/**
 * Check for required fields that are empty
 */
add_filter( 'wplf_validate_submission', 'wplf_validate_required_empty' );
function wplf_validate_required_empty( $return ) {
  // skip this validation if submission has already failed
  if ( ! $return->ok ) {
    return $return;
  }

  // get required fields from form
  $required = explode( ',', get_post_meta( $_POST['_form_id'], '_wplf_required', true ) );

  // make sure required form fields are submitted within $_POST or $_FILES arrays
  $fields_empty = array();
  foreach ( $required as $key ) {
    if (
      ( ! array_key_exists( $key, $_POST ) && ! array_key_exists( $key, $_FILES ) ) ||
      ( empty( $_POST[ $key ] ) && ! ( $_FILES[ $key ]['size'] > 0 ) )
    ) {
      // required field wasn't in $_POST or $_FILES
      // we also don't accept files that are 0 bytes long
      $fields_empty[] = $key;
    }
  }
  $fields_empty = array_filter( $fields_empty ); // get rid of the empty keys

  $return->debug = $_FILES;

  if ( ! empty( $fields_empty ) ) {
    $return->ok = 0;
    $return->error = __( 'Required fields are missing.', 'wp-libre-form' );
    $return->fields_empty = $fields_empty;
  }

  return $return;
}

/**
 * Check that submission has only fields that are set in form
 */
add_filter( 'wplf_validate_submission', 'wplf_validate_additional_fields' );
function wplf_validate_additional_fields( $return ) {
  // skip this validation if submission has already failed
  if ( ! $return->ok ) {
    return $return;
  }

  // skip this validation if it is disabled with filter for this form
  $form = get_post( intval( $_POST['_form_id'] ) );
  // global disable
  $disable_validation = false;
  $disable_validation = apply_filters( 'wplf_disable_validate_additional_fields', $disable_validation );
  // disable by form id
  $disable_validation = apply_filters( "wplf_{$form->ID}_disable_validate_additional_fields", $disable_validation );
  // disable by form slug
  $disable_validation = apply_filters( "wplf_{$form->post_name}_disable_validate_additional_fields", $disable_validation );
  if ( $disable_validation ) {
    return $return;
  }

  // get all fields from form
  $form_fields = explode( ',', get_post_meta( $form->ID, '_wplf_fields', true ) );

  // add all default fields
  $default_fields = array( 'referrer', '_referrer_id', '_form_id' );

  // combine fields
  $all_fields = array_merge( $form_fields, $default_fields );

  // make sure fields from all_fields are the only ones present in $_POST
  $additional_fields = array();
  foreach ( $_POST as $key => $value ) {
    if ( ! in_array( $key, $all_fields ) ) {
      // field was not in form fields
      $additional_fields[] = $key;
    }
  }
  $additional_fields = array_filter( $additional_fields ); // get rid of the empty keys

  if ( ! empty( $additional_fields ) ) {
    $return->ok = 0;
    $return->error = __( 'Additional fields are present.', 'wp-libre-form' );
    $return->additional_fields = $additional_fields;
  }

  return $return;
}


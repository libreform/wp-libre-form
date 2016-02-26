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

  if( ! isset( $_POST['_form_id'] ) || ! is_numeric( $_POST['_form_id'] ) || 'publish' != get_post_status( $_POST['_form_id'] ) || 'wplf-form' != get_post_type( $_POST['_form_id'] ) ) {
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
    if( ! array_key_exists( $key, $_POST ) || empty( $_POST[$key] ) ) {
      $fields_empty[] = $key;
    }
  }
  $fields_empty = array_filter( $fields_empty ); // get rid of the empty keys

  if( ! empty( $fields_empty ) ) {
    $return->ok = 0;
    $return->error = __('Required fields are missing.', 'wp-libre-form');
    $return->fields_empty = $fields_empty;
  }

  return $return;
}


<?php

/**
 * Send a copy of the form fields email if feature is enabled
 */
add_action( 'wplf_post_validate_submission', 'wplf_send_email_copy', 20 );
function wplf_send_email_copy( $return ) {
  // do nothing if form validation failed
  if( ! $return->ok ) {
    return;
  }

  $form_id = intval( $_POST['_form_id'] ); // _form_id is already validated and we know it exists by this point
  $form_title = esc_html( get_the_title( $form_id ) );
  $form_meta = get_post_meta( $form_id );
  $referrer = esc_url_raw( $_POST['referrer'] );

  if( isset($form_meta['_wplf_email_copy_enabled']) && $form_meta['_wplf_email_copy_enabled'][0] ) {
    $to = isset($form_meta['_wplf_email_copy_to']) ? $form_meta['_wplf_email_copy_to'][0] : get_option( 'admin_email' );
    $subject = wp_sprintf( __('New submission from %s', 'wp-libre-form'), $referrer );
    $content = wp_sprintf( __('Form "%s" (ID %d) was submitted with values below: ', 'wp-libre-form'), $form_title, $form_id ) . "\n\n";
    foreach( $_POST as $key => $value ) {
      if( '_' === $key[0] ) {
        continue;
      }
      $content .= esc_html( $key ) . ': ' . esc_html( print_r( $value, true ) ) . "\n";
    }
    wp_mail( $to, $subject, $content );
  }
}


<?php

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


<?php

add_action( 'wplf_post_validate_submission', 'wplf_send_email_copy', 20 );
function wplf_send_email_copy( $return, $submission_id = null ) {
  // do nothing if form validation failed
  if ( ! $return->ok ) {
    return;
  }

  // _form_id is already validated and we know it exists by this point
  $form_id = intval( ( isset( $submission_id ) ) ?
    get_post_meta( $submission_id, '_form_id', true ) : $_POST['_form_id'] );

  $form_title = esc_html( get_the_title( $form_id ) );
  $form_meta = get_post_meta( $form_id );

  $referrer = esc_url_raw( ( isset( $submission_id ) ) ?
    get_post_meta( $submission_id, 'referrer', true ) : $_POST['referrer'] );

  if ( ( isset( $form_meta['_wplf_email_copy_enabled'] ) && $form_meta['_wplf_email_copy_enabled'][0] )
    || isset( $submission_id ) ) {

    $to = $form_meta['_wplf_email_copy_to'][0];
    // translators: %s is email address of form submitter
    $subject = wp_sprintf( __( 'New submission from %s', 'wp-libre-form' ), $referrer );

    if ( isset( $submission_id ) ) {
      $to = get_post_meta( $submission_id, '_wplf_email_copy_to', true );
      // translators: %s is email address of form submitter
      $subject = wp_sprintf( __( 'Submission from %s', 'wp-libre-form' ), $referrer );
    }

    $to = empty( $to ) ? get_option( 'admin_email' ) : $to;
    $content = wp_sprintf(
      // translators: %1$s is form title, %2$d is form ID
      __( 'Form "%1$s" (ID %2$d) was submitted with values below: ', 'wp-libre-form' ), $form_title, $form_id );
    $content = apply_filters( 'wplf_email_copy_content_start', $content, $form_title, $form_id ) . "\n\n";

    $fields = $_POST;
    if ( isset( $submission_id ) ) {
      $fields = get_post_meta( $submission_id );
    }

    foreach ( $fields as $key => $value ) {
      if ( '_' === $key[0] ) {
        continue;
      }
      if ( is_array( $value ) ) { // in case input type="radio" submits an array
        $value = implode( ', ', $value );
      }
      // @codingStandardsIgnoreStart
      // WP coding standards don't like print_r
      // @TODO: come up with a prettier format for default mail output
      $content .= esc_html( $key ) . ': ' . esc_html( print_r( $value, true ) ) . "\n";
      // @codingStandardsIgnoreEnd
    }

    wp_mail(
      apply_filters( 'wplf_email_copy_to', $to ),
      apply_filters( 'wplf_email_copy_subject', $subject ),
      apply_filters( 'wplf_email_copy_content', $content ),
      apply_filters( 'wplf_email_copy_headers', '' ),
      apply_filters( 'wplf_email_copy_attachments', array() )
    );
  }
}

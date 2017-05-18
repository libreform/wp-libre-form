<?php

add_action( 'wplf_post_validate_submission', 'wplf_send_email_copy', 20 );
function wplf_send_email_copy( $return, $submission_id = null ) {
  if ( ! $submission_id ) {
    $submission_id = $return->submission_id;
  }

  // _form_id is already validated and we know it exists by this point
  $form_id = intval( ( isset( $submission_id ) ) ?
    get_post_meta( $submission_id, '_form_id', true ) : $_POST['_form_id'] );

  $form = get_post( intval( $form_id ) );

  $form_title = esc_html( get_the_title( $form ) );
  $form_meta = get_post_meta( $form_id );

  $referrer = esc_url_raw( ( isset( $submission_id ) ) ?
    get_post_meta( $submission_id, 'referrer', true ) : $_POST['referrer'] );

  if ( ( isset( $form_meta['_wplf_email_copy_enabled'] ) && $form_meta['_wplf_email_copy_enabled'][0] )
    || isset( $submission_id ) ) {

    $to = isset( $form_meta['_wplf_email_copy_to'] ) ?
      $form_meta['_wplf_email_copy_to'][0] : get_option( 'admin_email' );

    // translators: %1$s is submission ID, %2$s is URL where form was submitted
    $subject = wp_sprintf( __( '[%1$s] New submission to %2$s', 'wp-libre-form' ), $submission_id, $referrer );

    if ( isset( $submission_id ) ) {
      $to = get_post_meta( $submission_id, '_wplf_email_copy_to', true );
      // translators: %1$s is submission ID, %2$s is URL where form was submitted
      $subject = wp_sprintf( __( '[%1$s] Submission from %2$s', 'wp-libre-form' ), $submission_id, $referrer );
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

    // default pre-filtered values for email headers and attachments
    $headers = '';
    $attachments = array();

    // allow filtering email fields
    $to = apply_filters( 'wplf_email_copy_to', $to );
    $subject = apply_filters( 'wplf_email_copy_subject', $subject );
    $content = apply_filters( 'wplf_email_copy_content', $content );
    $headers = apply_filters( 'wplf_email_copy_headers', $headers );
    $attachments = apply_filters( 'wplf_email_copy_attachments', $attachments );

    // form slug specific filters
    $to = apply_filters( "wplf_{$form->post_name}_email_copy_to", $to );
    $subject = apply_filters( "wplf_{$form->post_name}_email_copy_subject", $subject );
    $content = apply_filters( "wplf_{$form->post_name}_email_copy_content", $content );
    $headers = apply_filters( "wplf_{$form->post_name}_email_copy_headers", $headers );
    $attachments = apply_filters( "wplf_{$form->post_name}_email_copy_attachments", $attachment );

    // form ID specific filters
    $to = apply_filters( "wplf_{$form->ID}_email_copy_to", $to );
    $subject = apply_filters( "wplf_{$form->ID}_email_copy_subject", $subject );
    $content = apply_filters( "wplf_{$form->ID}_email_copy_content", $content );
    $headers = apply_filters( "wplf_{$form->ID}_email_copy_headers", $headers );
    $attachments = apply_filters( "wplf_{$form->ID}_email_copy_attachments", $attachment );

    wp_mail( $to, $subject, $content, $headers, $attachments );
  }
}

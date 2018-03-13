<?php

add_action( 'wplf_post_validate_submission', 'wplf_send_email_copy', 20 );
function wplf_send_email_copy( $return, $submission_id = null ) {
  if ( ! $submission_id ) {
    $submission_id = $return->submission_id;
  }

  // _form_id is already validated and we know it exists by this point
  $form_id = intval( ( isset( $submission_id ) ) ? get_post_meta( $submission_id, '_form_id', true ) : $_POST['_form_id'] );

  $form = get_post( intval( $form_id ) );

  $form_title = esc_html( get_the_title( $form ) );
  $form_meta = get_post_meta( $form_id );

  $referrer = esc_url_raw( ( isset( $submission_id ) ) ? get_post_meta( $submission_id, 'referrer', true ) : $_POST['referrer'] );

  if ( ( isset( $form_meta['_wplf_email_copy_enabled'] ) && $form_meta['_wplf_email_copy_enabled'][0] ) || isset( $submission_id ) ) {

    $to = isset( $form_meta['_wplf_email_copy_to'] ) ? $form_meta['_wplf_email_copy_to'][0] : get_option( 'admin_email' );

    // translators: %submission-id% is replaced with submission id and %referrer% with referrer url
    $subject = __( '[%submission-id%] New submission from %referrer%', 'wp-libre-form' );
    if ( isset( $form_meta['_wplf_email_copy_subject'] ) ) {
      $subject = $form_meta['_wplf_email_copy_subject'][0];
    }

    $to = empty( $to ) ? get_option( 'admin_email' ) : $to;

    // translators: %form-title% is replaced with form title and %form-id% with form id
    // @codingStandardsIgnoreStart
    // %f gets detected as a placeholder for wp_sprintf
    $content = __( 'Form %form-title% (ID %form-id%) was submitted with values below: ', 'wp-libre-form' );
    // @codingStandardsIgnoreEnd
    $content = apply_filters( 'wplf_email_copy_content_start', $content, $form_title, $form_id ) . "\n\n";

    $fields = $_POST;
    if ( isset( $submission_id ) ) {
      $fields = get_post_meta( $submission_id );
    }

    $content .= wplf_email_copy_make_fields_key_value_list( $fields, $form->ID, $form->post_name );

    // default pre-filtered values for email headers and attachments
    $headers = '';
    $attachments = array();

    if ( isset( $form_meta['_wplf_email_copy_from'][0] ) ) {
      $headers[] = 'From: ' . wplf_email_copy_replace_tags( $form_meta['_wplf_email_copy_from'][0], $form, $submission_id ) . '<' . wplf_email_copy_replace_tags( $form_meta['_wplf_email_copy_from_address'][0], $form, $submission_id ) . '>';
    }

    if ( isset( $form_meta['_wplf_email_copy_content'] ) ) {
      $content = $form_meta['_wplf_email_copy_content'][0];
    }

    // maybe replace template tags with real content
    $to = wplf_email_copy_replace_tags( $to, $form, $submission_id );
    $subject = wplf_email_copy_replace_tags( $subject, $form, $submission_id );
    $content = wplf_email_copy_replace_tags( $content, $form, $submission_id );

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
    $attachments = apply_filters( "wplf_{$form->post_name}_email_copy_attachments", $attachments );

    // form ID specific filters
    $to = apply_filters( "wplf_{$form->ID}_email_copy_to", $to );
    $subject = apply_filters( "wplf_{$form->ID}_email_copy_subject", $subject );
    $content = apply_filters( "wplf_{$form->ID}_email_copy_content", $content );
    $headers = apply_filters( "wplf_{$form->ID}_email_copy_headers", $headers );
    $attachments = apply_filters( "wplf_{$form->ID}_email_copy_attachments", $attachments );

    wp_mail( $to, $subject, $content, $headers, $attachments );
  }
}

function wplf_email_copy_make_fields_key_value_list( $fields, $form_id = 0, $form_name = '' ) {
  $list = '';

  foreach ( $fields as $key => $value ) {
    if ( '_' === $key[0] ) {
      continue;
    }

    $value = $value[0];
    $value = wplf_email_maybe_implode_serialized_value( $value, $form_id, $form_name );

    // @codingStandardsIgnoreStart
    // WP coding standards don't like print_r
    // @TODO: come up with a prettier format for default mail output
    $list .= esc_html( $key ) . ': ' . esc_html( print_r( $value, true ) ) . "\n";
    // @codingStandardsIgnoreEnd
  }

  return $list;
}

function wplf_email_copy_replace_tags( $content, $form = null, $submission_id = null ) {
  if ( ! $form || ! $submission_id ) {
    return $content;
  }

  $fields = $_POST;
  if ( isset( $submission_id ) ) {
    $fields = get_post_meta( $submission_id );
  }

  $fields_key_value = wplf_email_copy_make_fields_key_value_list( $fields, $form->ID, $form->post_name );

  $defaults_store = array(
    'submission-id' => $submission_id,
    'referrer'      => esc_url_raw( ( null !== $submission_id ) ? get_post_meta( $submission_id, 'referrer', true ) : $_POST['referrer'] ),
    'form-title'    => esc_html( get_the_title( $form ) ),
    'form-id'       => $form->ID,
    'user-id'       => ( null !== get_current_user_id() ) ? wp_get_current_user()->display_name . ' (ID ' . get_current_user_id() . ')' : __( 'No user logged in', 'wp-libre-form' ),
    'timestamp'     => current_time( 'mysql' ),
    'datetime'      => current_time( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ) ),
    'language'      => ( function_exists( 'pll_current_language' ) ) ? pll_current_language( 'locale' ) : get_locale(),
    'all-form-data' => $fields_key_value,
  );

  $fields = $_POST;
  if ( null !== $submission_id ) {
    $fields = get_post_meta( $submission_id );
  }

  preg_match_all( '/%(.+?)%/', $content, $matches );
  foreach ( $matches[0] as $match ) {
    // match contains the braces, get rid of them.
    $string = trim( str_replace( array( '%' ), array( '' ), $match ) );

    if ( isset( $fields[ $string ] ) ) {
      $value = $fields[ $string ][0];
    } else if ( isset( $defaults_store[ $string ] ) ) {
      $value = $defaults_store[ $string ];
    }

    $value = wplf_email_maybe_implode_serialized_value( $value, $form->ID, $form->post_name );
    $content = str_replace( $match, $value, $content );
  }

  return $content;
}

// @codingStandardsIgnoreStart Generic.CodeAnalysis.UnusedFunctionParameter
function wplf_email_maybe_implode_serialized_value( $value, $form_id = 0, $form_name = '' ) {
// @codingStandardsIgnoreEnd Generic.CodeAnalysis.UnusedFunctionParameter
  $value = maybe_unserialize( $value );

  if ( is_array( $value ) ) {
    $implode_glue = apply_filters( 'wplf_email_array_field_implode_glue', ', ' );
    $implode_glue = apply_filters( "wplf_{$form->post_name}_email_array_field_implode_glue", $implode_glue );
    $implode_glue = apply_filters( "wplf_{$form->ID}_email_array_field_implode_glue", $implode_glue );

    $value = implode( $implode_glue, $value );
  }

  return $value;
}

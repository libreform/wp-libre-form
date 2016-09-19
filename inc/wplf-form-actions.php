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
  $emails = get_post_meta( $form_id, "_wplf_email_copy_to" );
  $templates = get_post_meta( $form_id, "_wplf_email_templates" );
  $referrer = esc_url_raw( $_POST['referrer'] );

  if ( isset( $emails ) && count( $emails[0] ) ) {
    foreach ( $emails[0] as $idx => $email ) {

      if ( preg_match( "/%.+?%/", $email, $matches ) ) {
        $to = preg_replace_callback( "/%.+?%/", "replace_field_tags", $email );
      }
      else {
        $to = $email;
      }

      if ( ! filter_var( $to, FILTER_VALIDATE_EMAIL ) ) {
        continue;
      }

      if ( isset( $templates ) && is_array( $templates[0] ) && isset( $templates[0][ $idx ] ) ) {
        $template = $templates[0][ $idx ];
      }
      else {
        $template = null;
      }

      if ( $template ) {
        $json = json_decode( $template );

        $subject = $json->title;
        $content = $json->content;

        $subject = preg_replace_callback( "/%.+?%/", "replace_field_tags", $subject );
        $content = preg_replace_callback( "/%.+?%/", "replace_field_tags", $content );
      }
      else {
        $subject = wp_sprintf( __('New submission from %s', 'wp-libre-form'), $referrer );
        $content = wp_sprintf( __('Form "%s" (ID %d) was submitted with values below: ', 'wp-libre-form'), $form_title, $form_id ) . "\n\n";
        foreach( $_POST as $key => $value ) {
          if( '_' === $key[0] ) {
            continue;
          }
          $content .= esc_html( $key ) . ': ' . esc_html( print_r( $value, true ) ) . "\n";
        }
      }

      wp_mail( $to, $subject, $content );
    }
  }
}

function replace_field_tags( $matches ) {
  $key = str_replace( "%", "", $matches[0] );

  return isset( $_POST[ $key ] ) ? esc_html( $_POST[ $key ] ) : $key;
}
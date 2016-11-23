<?php

/**
 * Send a copy of the form fields email if feature is enabled
 */
add_action( 'wplf_post_validate_submission', 'wplf_send_email_copy', 20, 2 );
function wplf_send_email_copy( $return, $submission ) {
  $wplf = WP_Libre_Form::init();
  // do nothing if form validation failed
  if( ! $return->ok )
    return;


  // do nothing if email is disabled
  if( !isset( $submission['meta']['_wplf_email_copy_enabled'] ) || !$submission['meta']['_wplf_email_copy_enabled'][0] )
    return;

  $submission['email'] = [
    'headers' => [],
    'charset' => 'UTF-8',
    'mime' => ''
  ];
  // Email specific filtering here

  $subject_format = isset( $submission['meta']['_wplf_email_copy_subject_format'] )
    ? $submission['meta']['_wplf_email_copy_subject_format']
    : '%title% - New submission from %name%';

  $subject_format = apply_filters( 'wplf_email_copy_subject_format', $subject_format );

  // special values for subtitution that need an easier key are not really usable elsewhere
  $special_values = [
    'form-name' => $submission['form']->post_title,
  ];
    // Assign submission title and substitute tokens
  $submission['email']['subject'] = $wplf->substitute($subject_format, $special_values, false);
  $submission['email']['subject'] = $wplf->substitute($submission['email']['subject'] , $submission['data'] );

  // Locate and render template

  $template_file = !empty( $submission['meta']['_wplf_email_copy_template'] ) ? $submission['meta']['_wplf_email_copy_template'] : '';
  // Don't use locate_template(). This is easier.
  $templates = $wplf->get_email_templates();

  // If chosen template can't for some reason be found, use default.
  if ( !isset( $templates[$template_file] ) )
    $template_file = '_wplf/default.php';

  $template = $templates[$template_file];

  // Extract submission data to local scope for the template
  extract( $submission );
  ob_start();
  require( $template['path'] );
  $content = ob_get_clean();


  if (!$submission['email']['mime']) {
    // Try a filter to detect html content
    $is_html = apply_filters( 'wplf_email_copy_detect_html', null, $content, $submission);

    // If $is_html is still null(no filters / no html detected), try to match /<html.*>/
    if ($is_html === null)
      $is_html = preg_match('/<html(\s+.*)?>/', $content); // Content is probably a html document

    if ($is_html !== null)
      $submission['email']['mime'] = $is_html ? 'text/html' : 'text/plain';
  }
  $submission['email']['headers']['Content-Type'] = $submission['email']['mime'] . ';charset=' . $submission['email']['charset'];

  // Normalize headers
  foreach ($submission['email']['headers'] as $key => $value) {
    if (!is_int($key))
      $value = $key . ': ' . $value;

    $submission['email']['headers'] = $value;
  }

  // Last chance to filter $submission
  $submission = apply_filters( 'wplf_email_submission_send', $submission);

  wp_mail(
    apply_filters( 'wplf_email_copy_to', $submission['meta']['_wplf_email_copy_to'], $submission ),
    apply_filters( 'wplf_email_copy_subject', $submission['email']['subject'], $submission ),
    apply_filters( 'wplf_email_copy_content', $content, $submission ),
    apply_filters( 'wplf_email_copy_headers', $submission['email']['headers'], $submission ),
    apply_filters( 'wplf_email_copy_attachments', array(), $submission )
  );

}

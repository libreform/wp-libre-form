<?php

namespace WPLF;

function isDebug() {
  return defined('WP_DEBUG') && WP_DEBUG == true; // Loose comparison to support 1, 'yes' etc
}

function isRest() {
  return defined('REST_REQUEST');
}

function log($anything) {
  error_log('WPLF: ' . print_r($anything, true));
}

function minifyHtml(string $html) {
  return str_replace(array("\n", "\r"), ' ', $html);
}

/**
 * Strip <form> tags from the form content, you can't have forms inside forms
 */
function stripFormTags($content) {
  return preg_replace('/<\/?form.*>/i', '', $content);
}

function parseEmailToField(string $value) {
  $result = '';

  // If the field contains commas, assume it's a well-formed list of email addresses.
  if (strpos($value, ',') > 0) {
    $emails = explode(',', $value);

    foreach ($emails as $email) {
      $email = trim($email);
      $email = sanitize_email($email) . ', ';
      $to .= $email;
    }

    $result = rtrim($to, ', ');
  } else {
    $result = sanitize_email($value);
  }

  return $result;
}

function getUploadedFiles() : ?array {
  $uploads = $_FILES;

  return !empty($uploads) ? $uploads : null;
}

function db() {
  global $wpdb;

  return [
    $wpdb,
    $wpdb->prefix,
  ];
}
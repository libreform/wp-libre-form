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

function findFieldByName(string $name, array $fields) {
  foreach ($fields as $field) {
    if ($field['name'] === $name) {
      return $field;
    }
  }

  return false;
}

function isFileArray(array $data) {
  $keys = ['name', 'type', 'tmp_name', 'error', 'size'];

  foreach ($keys as $k => $v) {
    if (!in_array($k, $data)) {
      return false;
    }
  }

  return true;
}

function getFileUploadError(int $errorNumber) {
  $errors = [
    0 => 'There is no error, the file uploaded with success',
    1 => 'The uploaded file exceeds the upload_max_filesize directive in php.ini',
    2 => 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form',
    3 => 'The uploaded file was only partially uploaded',
    4 => 'No file was uploaded',
    6 => 'Missing a temporary folder',
    7 => 'Failed to write file to disk.',
    8 => 'A PHP extension stopped the file upload.',
  ];

  if ($errorNumber === 0) {
    return false;
  }

  return new Error($errors[$errorNumber]);
}

function getUploadedFiles(): ?array {
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

function currentUrl() {
  $protocol = (isset($_SERVER['HTTPS']) ? "https" : "http");

  return "$protocol://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
}

function uuid() {
  $data = \random_bytes(16);
  assert(strlen($data) == 16);

  $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
  $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

  return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

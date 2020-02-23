<?php

namespace WPLF;

function isDebug() {
  return defined('WP_DEBUG') && WP_DEBUG == true; // Loose comparison to support 1, 'yes' etc
}

function log($anything) {
  error_log('WPLF: ' . print_r($anything, true));
}


function minifyHtml(string $html) {
  return str_replace(array("\n", "\r"), ' ', $html);
}
<?php
/**
WPLF Template Name: Default

*/


echo wp_sprintf( __('Form "%s" (ID %d) was submitted with values below:' . "\n", 'wp-libre-form'), $form->post_title, $form->ID);

foreach( $data as $key => $value ) {
  if( '_' === $key[0] ) {
    continue;
  }
  echo $key . ': ' . print_r( $value, true ) . "\r\n";
}

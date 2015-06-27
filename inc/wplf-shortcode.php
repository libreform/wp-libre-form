<?php

/**
 * Shortcode for displaying a Form
 */
add_shortcode( 'libre-form', 'wplf_form_shortcode_handler' );
function wplf_form_shortcode_handler($attributes, $content = null) {

  $attributes = shortcode_atts( array(
    'id' => null,
    'xclass' => '',
  ), $attributes );

  // display form
  return wplf_form( $attributes['id'], $attributes['xclass'] );
}



/**
 * The function we display the form with
 */
function wplf_form( $id , $xclass = '') {

  global $post;

  if( 'publish' === get_post_status( $id )) {
    $form = get_post( $id );
    ob_start();
?>
<form class="libre-form libre-form-' . $id . ' ' . $xclass . '">
  <?php echo apply_filters( 'wplf_form', $form->post_content ); ?>
  <input type="hidden" name="referrer" value="<?php echo get_permalink( $post->ID ); ?>">
  <input type="hidden" name="_form_id" value="<?php echo $id; ?>">
</form>
<?php
    $output = ob_get_clean();
    return $output;
  }

  // return nothing if the form doesn't exist
  return '';
}

/**
 * Same default filters as the_content, but we don't want to use the_content for the form output
 */
add_filter( 'wplf_form', 'wptexturize' );
add_filter( 'wplf_form', 'convert_smilies' );
add_filter( 'wplf_form', 'convert_chars'  );
add_filter( 'wplf_form', 'wpautop' );
add_filter( 'wplf_form', 'shortcode_unautop' );
add_filter( 'wplf_form', 'prepend_attachment' );
add_filter( 'wplf_form', 'capital_P_dangit', 11 );

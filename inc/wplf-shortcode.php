<?php

/**
 * Shortcode for displaying a Form
 */
add_shortcode( 'libre-form', 'wplf_form_shortcode_handler' );
function wplf_form_shortcode_handler($attributes, $content = null) {

  global $post;

  extract( shortcode_atts( array(
    'id' => null,
    'xclass' => '',
  ), $attributes ) );

  if( $form = get_post( $id ) ) {
    ob_start();
?>
<form class="libre-form libre-form-' . $id . ' ' . $xclass . '">
  <?php echo apply_filters( 'the_content', $form->post_content ); ?>
  <input type="hidden" name="referrer" value="<?php echo get_permalink( $post->ID ); ?>">
  <input type="hidden" name="form_id" value="<?php echo $id; ?>">
</form>
<?php
    $output = ob_get_clean();
    return $output;
  }

  // return nothing if the form doesn't exist
  return '';
}


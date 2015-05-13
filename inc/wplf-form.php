<?php

/**
 * CPT for the forms
 */
add_action( 'init', 'wplf_register_form_cpt' );
function wplf_register_form_cpt() {
  $labels = array(
    'name'               => _x( 'Forms', 'post type general name', 'wp-libre-form' ),
    'singular_name'      => _x( 'Form', 'post type singular name', 'wp-libre-form' ),
    'menu_name'          => _x( 'Forms', 'admin menu', 'wp-libre-form' ),
    'name_admin_bar'     => _x( 'Form', 'add new on admin bar', 'wp-libre-form' ),
    'add_new'            => _x( 'Add New', 'form', 'wp-libre-form' ),
    'add_new_item'       => __( 'Add New Form', 'wp-libre-form' ),
    'new_item'           => __( 'New Form', 'wp-libre-form' ),
    'edit_item'          => __( 'Edit Form', 'wp-libre-form' ),
    'view_item'          => __( 'View Form', 'wp-libre-form' ),
    'all_items'          => __( 'All Forms', 'wp-libre-form' ),
    'search_items'       => __( 'Search Forms', 'wp-libre-form' ),
    'parent_item_colon'  => __( 'Parent Forms:', 'wp-libre-form' ),
    'not_found'          => __( 'No forms found.', 'wp-libre-form' ),
    'not_found_in_trash' => __( 'No forms found in Trash.', 'wp-libre-form' )
  );

  $args = array(
    'labels'             => $labels,
    'public'             => false,
    'publicly_queryable' => false,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => false,
    'rewrite'            => null,
    'capability_type'    => 'post',
    'has_archive'        => false,
    'hierarchical'       => false,
    'menu_position'      => null,
    'supports'           => array( 'title', 'editor', 'author', 'revisions' )
  );

  register_post_type( 'wplf-form', $args );
}


/**
 * Disable TinyMCE editor for forms, which are simple HTML things
 */
add_filter( 'user_can_richedit', 'wplf_disable_tinymce_for_forms' );
function wplf_disable_tinymce_for_forms( $default ) {

  global $post;

  // only for this cpt
  if ( 'wplf-form' == get_post_type( $post ) ) {
    return false;
  }

  return $default;
}

/**
 * Include custom JS on the edit screen
 */
add_action( 'admin_enqueue_scripts', 'wplf_edit_form_js', 10, 1 );
function wplf_edit_form_js( $hook ) {

  global $post;

  // make sure we're on the correct view
  if ( $hook != 'post-new.php' && $hook != 'post.php' ) {
    return;
  }

  // only for this cpt
  if ( 'wplf-form' != $post->post_type ) {     
    return;
  }

  // enqueue the custom JS for this view
  wp_enqueue_script( 'wplf-form-edit-js', plugins_url( 'assets/scripts/wplf-admin-form.js', dirname(__FILE__) ) );
}


/**
 * Pre-populate form editor with default content
 */
add_filter( 'default_content', 'wplf_default_form_content' );
function wplf_default_form_content( $content, $post ) {

  // only for this cpt
  if ( 'wplf-form' == $_GET['post_type'] ) {
    ob_start();
?>
<input type="text" name="email" placeholder="example@email.com">
<input type="submit" value="Submit">
<?php
    $content = ob_get_clean();
  }

  return $content;
}


/**
 * Custom column display for Form CPT in edit.php
 */
add_action( 'manage_posts_custom_column' , 'wplf_form_custom_columns', 10, 2 );
function wplf_form_custom_columns( $column, $post_id ) {

  if($column === 'shortcode') {
    echo '<pre>[libre-form id="' . $post_id . '"]</pre>';
  }

}

/**
 * Custom columns in edit.php for Forms
 */
add_filter('manage_edit-wplf-form_columns' , 'wplf_form_edit_columns', 100, 1);
function wplf_form_edit_columns( $columns ) {

  $new_columns = array(
    'cb' => $columns['cb'],
    'title' => $columns['title'],
    'shortcode' => __( 'Shortcode', 'wp-libre-form' ),
    'date' => $columns['date'],

  );
  return $new_columns;
}


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


<?php

/**
 * CPT for the submissions
 */
add_action( 'init', 'wplf_register_submission_cpt' );
function wplf_register_submission_cpt() {
  $labels = array(
    'name'               => _x( 'Submissions', 'post type general name', 'wp-libre-form' ),
    'singular_name'      => _x( 'Submission', 'post type singular name', 'wp-libre-form' ),
    'menu_name'          => _x( 'Submissions', 'admin menu', 'wp-libre-form' ),
    'name_admin_bar'     => _x( 'Submission', 'add new on admin bar', 'wp-libre-form' ),
    'add_new'            => _x( 'Add New', 'submission', 'wp-libre-form' ),
    'add_new_item'       => __( 'Add New Submission', 'wp-libre-form' ),
    'new_item'           => __( 'New Submission', 'wp-libre-form' ),
    'edit_item'          => __( 'Edit Submission', 'wp-libre-form' ),
    'view_item'          => __( 'View Submission', 'wp-libre-form' ),
    'all_items'          => __( 'All Submissions', 'wp-libre-form' ),
    'search_items'       => __( 'Search Submissions', 'wp-libre-form' ),
    'parent_item_colon'  => __( 'Parent Submissions:', 'wp-libre-form' ),
    'not_found'          => __( 'No submissions found.', 'wp-libre-form' ),
    'not_found_in_trash' => __( 'No submissions found in Trash.', 'wp-libre-form' )
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
    'supports'           => array( 'custom-fields' )
  );

  register_post_type( 'wplf-submission', $args );
}


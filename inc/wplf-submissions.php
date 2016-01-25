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
    'all_items'          => __( 'Submissions', 'wp-libre-form' ),
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
    'show_in_menu'       => 'edit.php?post_type=wplf-form',
    'menu_icon'          => 'dashicons-archive',
    'query_var'          => false,
    'rewrite'            => null,
    'capability_type'    => 'post',
    'has_archive'        => false,
    'hierarchical'       => false,
    'menu_position'      => null,
    'supports'           => array( 'title', 'custom-fields' )
  );

  register_post_type( 'wplf-submission', $args );
}


/**
 * Custom column display for Submission CPT in edit.php
 */
add_action( 'manage_posts_custom_column' , 'wplf_submission_custom_columns', 10, 2 );
function wplf_submission_custom_columns( $column, $post_id ) {

  if($column === 'referrer') {
    if( $referrer = get_post_meta($post_id, 'referrer', true) ) {
      echo '<a href="' . esc_url( $referrer ) . '">' . $referrer . '</a>';
    }
  }

  if($column === 'form') {
    if( $form_id = get_post_meta($post_id, '_form_id', true) ) {
      $form = get_post( $form_id );
      echo '<a href="' . get_edit_post_link( $form_id, '' ) . '" target="_blank">' . $form->post_title . '</a>';
    }
  }

}

/**
 * Custom columns in edit.php for Forms
 */
add_filter('manage_edit-wplf-submission_columns' , 'wplf_submission_edit_columns', 100, 1);
function wplf_submission_edit_columns( $columns ) {

  $new_columns = array(
    'cb' => $columns['cb'],
    'title' => $columns['title'],
    'referrer' => __( 'Referrer', 'wp-libre-form' ),
    'form' => __( 'Form', 'wp-libre-form' ),
    'date' => $columns['date'],
  );
  return $new_columns;

}



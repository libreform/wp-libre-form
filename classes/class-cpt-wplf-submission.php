<?php

if ( !class_exists('CPT_WPLF_Submission') ) :

class CPT_WPLF_Submission {
  /**
   * CPT for the submissions
   */
  public static $instance;

  public static function init() {
    if ( is_null( self::$instance ) ) {
      self::$instance = new CPT_WPLF_Submission();
    }
    return self::$instance;
  }

  /**
   * Hook our actions, filters and such
   */
  private function __construct() {
    // init custom post type
    add_action( 'init', array( $this, 'register_cpt' ) );

    // edit.php view
    add_filter( 'manage_edit-wplf-submission_columns' , array( $this, 'custom_columns_cpt' ), 100, 1);
    add_action( 'manage_posts_custom_column' , array( $this, 'custom_columns_display_cpt' ), 10, 2 );
  }

  public static function register_cpt() {
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
  function custom_columns_display_cpt( $column, $post_id ) {
    if( 'referrer' === $column ) {
      if( $referrer = get_post_meta($post_id, 'referrer', true) ) {
        echo '<a href="' . esc_url( $referrer ) . '">' . $referrer . '</a>';
      }
    }
    if( 'form' === $column ) {
      if( $form_id = get_post_meta($post_id, '_form_id', true) ) {
        $form = get_post( $form_id );
        echo '<a href="' . get_edit_post_link( $form_id, '' ) . '" target="_blank">' . $form->post_title . '</a>';
      }
    }
  }

  /**
   * Custom columns in edit.php for Forms
   */
  function custom_columns_cpt( $columns ) {
    $new_columns = array(
      'cb' => $columns['cb'],
      'title' => $columns['title'],
      'referrer' => __( 'Referrer', 'wp-libre-form' ),
      'form' => __( 'Form', 'wp-libre-form' ),
      'date' => $columns['date'],
    );
    return $new_columns;
  }

}

endif;


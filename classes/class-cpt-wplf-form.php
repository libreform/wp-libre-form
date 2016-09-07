<?php

if ( !class_exists('CPT_WPLF_Form') ) :

class CPT_WPLF_Form {
  /**
   * CPT for the forms
   */
  public static $instance;

  public static function init() {
    if ( is_null( self::$instance ) ) {
      self::$instance = new CPT_WPLF_Form();
    }
    return self::$instance;
  }

  /**
   * Hook our actions, filters and such
   */
  private function __construct() {
    // init custom post type
    add_action( 'init', array( $this, 'register_cpt' ) );

    // post.php / post-new.php view
    add_action( 'save_post', array( $this, 'save_cpt' ) );
    add_filter( 'content_save_pre' , array( $this, 'strip_form_tags' ), 10, 1 );
    add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes_cpt' ) );
    add_action( 'admin_enqueue_scripts', array( $this, 'admin_post_scripts_cpt' ), 10, 1 );

    // edit.php view
    add_filter( 'manage_edit-wplf-form_columns' , array( $this, 'custom_columns_cpt' ), 100, 1 );
    add_action( 'manage_posts_custom_column' , array( $this, 'custom_columns_display_cpt' ), 10, 2 );

    add_filter( 'default_content', array( $this, 'default_content_cpt' ) );
    add_filter( 'user_can_richedit', array( $this, 'disable_tinymce' ) );

    // front end
    add_shortcode( 'libre-form', array( $this, 'shortcode' ) );
    add_filter( 'the_content', array( $this, 'use_shortcode_for_preview' ) );
    add_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_frontend_script' ) );

    // same default filters as the_content, but we don't want to use actual the_content for the form output
    add_filter( 'wplf_form', 'wptexturize' );
    add_filter( 'wplf_form', 'convert_smilies' );
    add_filter( 'wplf_form', 'convert_chars'  );
    add_filter( 'wplf_form', 'wpautop' );
    add_filter( 'wplf_form', 'shortcode_unautop' );
  }

  public static function register_cpt() {
    $labels = array(
      'name'               => _x( 'Forms', 'post type general name', 'wp-libre-form' ),
      'singular_name'      => _x( 'Form', 'post type singular name', 'wp-libre-form' ),
      'menu_name'          => _x( 'Forms', 'admin menu', 'wp-libre-form' ),
      'name_admin_bar'     => _x( 'Form', 'add new on admin bar', 'wp-libre-form' ),
      'add_new'            => _x( 'New Form', 'form', 'wp-libre-form' ),
      'add_new_item'       => __( 'Add New Form', 'wp-libre-form' ),
      'new_item'           => __( 'New Form', 'wp-libre-form' ),
      'edit_item'          => __( 'Edit Form', 'wp-libre-form' ),
      'view_item'          => __( 'View Form', 'wp-libre-form' ),
      'all_items'          => __( 'All Forms', 'wp-libre-form' ),
      'search_items'       => __( 'Search Forms', 'wp-libre-form' ),
      'not_found'          => __( 'No forms found.', 'wp-libre-form' ),
      'not_found_in_trash' => __( 'No forms found in Trash.', 'wp-libre-form' )
    );

    $args = array(
      'labels'             => $labels,
      'public'             => true,
      'publicly_queryable' => true,
      'exclude_from_search'=> true,
      'show_ui'            => true,
      'show_in_menu'       => true,
      'menu_icon'          => 'dashicons-archive',
      'query_var'          => false,
      'capability_type'    => 'post',
      'has_archive'        => false,
      'hierarchical'       => false,
      'menu_position'      => null,
      'rewrite'            => array(
        'slug' => 'libre-forms',
      ),
      'supports'           => array(
        'title',
        'editor',
        'revisions',
        'custom-fields',
      ),
    );

    register_post_type( 'wplf-form', $args );
  }


  /**
   * Disable TinyMCE editor for forms, which are simple HTML things
   */
  function disable_tinymce( $default ) {
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
  function admin_post_scripts_cpt( $hook ) {
    global $post;

    // make sure we're on the correct view
    if ( 'post-new.php' != $hook && 'post.php' != $hook ) {
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
  function default_content_cpt( $content ) {
    global $pagenow;

    // only on post.php screen
    if ( 'post-new.php' != $pagenow && 'post.php' != $pagenow ) {
      return $content;
    }

    // only for this cpt
    if ( isset( $_GET['post_type'] ) && 'wplf-form' === $_GET['post_type'] ) {
      ob_start();

      // default content starts here:
?>
<label for="name"><?php _e( 'Please enter your name', 'wp-libre-form' ); ?></label>
<input type="text" name="name" placeholder="<?php _ex( 'John Doe', 'Default placeholder name', 'wp-libre-form' ); ?>">

<label for="email"><?php _e( 'Please enter your email address', 'wp-libre-form' ); ?> <?php _e( '(required)', 'wp-libre-form' ); ?></label>
<input type="email" name="email" placeholder="<?php _ex( 'example@email.com', 'Default placeholder email', 'wp-libre-form' ); ?>" required>

<label for="message"><?php _e( 'Write your message below', 'wp-libre-form' ); ?> <?php _e( '(required)', 'wp-libre-form' ); ?></label>
<textarea name="message" rows="5" placeholder="<?php _ex( 'I wanted to ask about...', 'Default placeholder message', 'wp-libre-form' ); ?>" required></textarea>

<button type="submit"><?php _e( 'Submit', 'wp-libre-form' ); ?></button>

<!-- <?php _ex( 'Any valid HTML form can be used here!', 'The HTML comment at the end of the example form', 'wp-libre-form' ); ?> -->
<?php
      $content = esc_textarea( ob_get_clean() );
    }

    return $content;
  }


  /**
   * Custom columns in edit.php for Forms
   */
  function custom_columns_cpt( $columns ) {
    $new_columns = array(
      'cb' => $columns['cb'],
      'title' => $columns['title'],
      'shortcode' => __( 'Shortcode', 'wp-libre-form' ),
      'submissions' => __( 'Submissions', 'wp-libre-form' ),
      'date' => $columns['date'],
    );
    return $new_columns;
  }


  /**
   * Custom column display for Form CPT in edit.php
   */
  function custom_columns_display_cpt( $column, $post_id ) {
    if( 'shortcode' === $column ) {
?>
<input type="text" class="code" value='[libre-form id="<?php echo $post_id; ?>"]' readonly>
<?php
    }
    if( 'submissions' === $column ) {
      // count number of submissions
      $submissions = get_posts( array(
        'post_type' => 'wplf-submission',
        'posts_per_page' => -1,
        'meta_key' => '_form_id',
        'meta_value' => $post_id,
      ) );
?>
  <a href="<?php echo admin_url( 'edit.php?post_type=wplf-submission&form=' . $post_id ); ?>"><?php echo count( $submissions ); ?></a>
<?php
    }
  }


  /**
   * Add meta box to show fields in form
   */
  function add_meta_boxes_cpt() {
    // Shortcode meta box
    add_meta_box(
      'wplf-shortcode',
      __( 'Shortcode', 'wp-libre-form' ),
      array( $this, 'metabox_shortcode' ),
      'wplf-form',
      'normal',
      'high'
    );

    // Messages meta box
    add_meta_box(
      'wplf-messages',
      __( 'Success Message', 'wp-libre-form' ),
      array( $this, 'metabox_thank_you' ),
      'wplf-form',
      'normal',
      'high'
    );

    // Form Fields meta box
    add_meta_box(
      'wplf-fields',
      __( 'Form Fields Detected', 'wp-libre-form' ),
      array( $this, 'metabox_form_fields' ),
      'wplf-form',
      'side'
    );

    // Email on submit
    add_meta_box(
      'wplf-submit-email',
      __( 'Emails', 'wp-libre-form' ),
      array( $this, 'metabox_submit_email' ),
      'wplf-form',
      'side'
    );

    // Submission title format meta box
    add_meta_box(
      'wplf-title-format',
      __( 'Submission Title Format', 'wp-libre-form' ),
      array( $this, 'meta_box_title_format' ),
      'wplf-form',
      'side'
    );
  }


  /**
   * Meta box callback for shortcode meta box
   */
  function metabox_shortcode( $post ) {
?>
<p><input type="text" class="code" value='[libre-form id="<?php echo $post->ID; ?>"]' readonly></p>
<?php
  }

  /**
   * Meta box callback for fields meta box
   */
  function metabox_thank_you( $post ) {
    // get post meta
    $meta = get_post_meta( $post->ID );
    $message = isset( $meta['_wplf_thank_you'] ) ? $meta['_wplf_thank_you'][0] : _x( 'Thank you! :)', 'Default success message', 'wp-libre-form' );
?>
<p>
<?php wp_editor( esc_textarea( $message ), 'wplf_thank_you', array(
  'wpautop' => true,
  'media_buttons' => true,
  'textarea_name' => 'wplf_thank_you',
  'textarea_rows' => 6,
  'teeny' => true
  )); ?>
</p>
<?php
    wp_nonce_field( 'wplf_form_meta', 'wplf_form_meta_nonce' );
  }


  /**
   * Meta box callback for form fields meta box
   */
  function metabox_form_fields( $post ) {
?>
<p><?php _e('Fields marked with * are required', 'wp-libre-form'); ?></p>
<div class="wplf-form-field-container">
<!--  <div class="wplf-form-field widget-top"><div class="widget-title"><h4>name</h4></div></div> -->
</div>
<input type="hidden" name="wplf_fields" id="wplf_fields">
<input type="hidden" name="wplf_required" id="wplf_required">
<?php
  }

  /**
   * Meta box callback for submit email meta box
   */
  function metabox_submit_email( $post ) {
    // get post meta
    $meta = get_post_meta( $post->ID );
    $email_enabled = isset( $meta['_wplf_email_copy_enabled'] ) ? $meta['_wplf_email_copy_enabled'][0] : true;
    $email_copy_to = isset( $meta['_wplf_email_copy_to'] ) ? $meta['_wplf_email_copy_to'][0] : '';
?>
<p>
  <label for="wplf_email_copy_enabled">
    <input type="checkbox" <?php echo $email_enabled ? 'checked="checked"' : ''; ?> id="wplf_email_copy_enabled" name="wplf_email_copy_enabled">
    <?php _e( 'Send an email copy when a form is submitted?' ); ?>
  </label>
</p>
<p><input type="text" name="wplf_email_copy_to" value="<?php echo esc_attr( $email_copy_to ); ?>" placeholder="<?php echo esc_attr( get_option( 'admin_email' ) ); ?>" style="width:100%;display:none"></p>
<?php
  }

  /**
   * Meta box callback for submission title format
   */
  function meta_box_title_format( $post ) {
    // get post meta
    $meta = get_post_meta( $post->ID );
    $default = '%name% <%email%>'; // default submission title format
    $format = isset( $meta['_wplf_title_format'] ) ? $meta['_wplf_title_format'][0] : $default;
?>
<p><?php _e('Submissions from this form will use this formatting in their title.', 'wp-libre-form'); ?></p>
<p><?php _e('You may use any field values enclosed in "%" markers.', 'wp-libre-form');?></p>
<p><input type="text" name="wplf_title_format" value="<?php echo esc_attr( $format ); ?>" placeholder="<?php echo esc_attr( $default ); ?>" class="code" style="width:100%"></p>
<?php
  }


  /**
   * Handles saving our post meta
   */
  function save_cpt( $post_id ) {
    // verify nonce
    if ( ! isset( $_POST['wplf_form_meta_nonce'] ) ) {
      return;
    }
    else if ( ! wp_verify_nonce( $_POST['wplf_form_meta_nonce'], 'wplf_form_meta' ) ) {
      return;
    }

    // only for this cpt
    if ( !isset( $_POST['post_type'] ) || 'wplf-form' != $_POST['post_type'] ) {
      return;
    }

    // check permissions.
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
      return;
    }

    // save success message
    if ( isset( $_POST['wplf_thank_you'] ) ) {
      update_post_meta( $post_id, '_wplf_thank_you', wp_kses_post( $_POST['wplf_thank_you'] ) );
    }

    // save fields
    if ( isset( $_POST['wplf_fields'] ) ) {
      update_post_meta( $post_id, '_wplf_fields', sanitize_text_field( $_POST['wplf_fields'] ) );
    }

    // save required fields
    if ( isset( $_POST['wplf_required'] ) ) {
      update_post_meta( $post_id, '_wplf_required', sanitize_text_field( $_POST['wplf_required'] ) );
    }

    // save email copy enabled state
    if ( isset( $_POST['wplf_email_copy_enabled'] ) ) {
      update_post_meta( $post_id, '_wplf_email_copy_enabled', $_POST['wplf_email_copy_enabled'] === 'on' );
    }
    else {
      update_post_meta( $post_id, '_wplf_email_copy_enabled', false );
    }

    // save email copy
    if ( isset( $_POST['wplf_email_copy_to'] ) ) {
      $emailField = $_POST['wplf_email_copy_to'];
      $to = '';

      if( strpos( $emailField, "," ) > 0 ) {
        // Intentional. Makes no sense if the first character is a comma, so pass it along as a single address.
        // sanitize_email() should take care of the rest.
        $emailArray = explode( ",", $emailField );
        foreach($emailArray as $email){
          $email = trim($email);
          $email = sanitize_email( $email ) . ", ";
          $to .= $email;
        }
        $to = rtrim( $to, ", " );
      }
      else {
        $to = sanitize_email( $emailField );
      }

      update_post_meta( $post_id, '_wplf_email_copy_to', $to );
    }

    // save title format
    if ( isset( $_POST['wplf_title_format'] ) ) {
      $safe_title_format = $_POST['wplf_title_format']; // TODO: are there any applicable sanitize functions?

      // A typical title format will include characters like <, >, %, -.
      // which means all sanitize_* fuctions will probably mess with the field
      // The only place the title formats are displayed are within value=""
      // attributes where of course they are escaped using esc_attr() so it
      // should be fine to save the meta field without further sanitisaton
      update_post_meta( $post_id, '_wplf_title_format', $safe_title_format );
    }
  }


  /**
   * Strip <form> tags from the form content
   *
   * We apply <form> via the shortcode, you can't have nested forms anyway
   */
  function strip_form_tags( $content ) {
    return preg_replace( '/<\/?form.*>/i', '', $content);
  }


  /**
   * The function we display the form with
   */
  function wplf_form( $id , $content = '', $xclass = '' ) {
    global $post;

    if( 'publish' === get_post_status( $id ) || 'true' === $_GET['preview'] ) {
      if( empty( $content ) ) {
        // you can override the content via a parameter
        $content = get_post( $id )->post_content;
      }
      ob_start();
?>
<form class="libre-form libre-form-<?php echo $id . ' ' . $xclass; ?>">
  <?php echo apply_filters( 'wplf_form', $content ); ?>
  <input type="hidden" name="referrer" value="<?php the_permalink(); ?>">
  <input type="hidden" name="_form_id" value="<?php esc_attr_e( $id ); ?>">
</form>
<?php
      $output = ob_get_clean();
      return $output;
    }

    // return nothing if the form doesn't exist
    return '';
  }


  /**
   * Enqueue the front end JS
   */
  function maybe_enqueue_frontend_script() {
    global $post;

    // register the script, but only enqueue it if the current post contains a form in it
    wp_register_script( 'wplf-form-js', plugins_url( 'assets/scripts/wplf-form.js', dirname(__FILE__) ), array( 'jquery' ) );

    if( is_a( $post, 'WP_Post' ) && ( has_shortcode( $post->post_content, 'libre-form') || $post->post_type === 'wplf-form') ) {
      wp_enqueue_script( 'wplf-form-js' );
      wp_localize_script( 'wplf-form-js', 'ajax_object', array( 'ajax_url' => admin_url( 'admin-ajax.php' ) ) );
    }
  }


  /**
   * Shortcode for displaying a Form
   */
  function shortcode($attributes, $content = null) {
    $attributes = shortcode_atts( array(
      'id' => null,
      'xclass' => '',
    ), $attributes );

    // display form
    return $this->wplf_form( $attributes['id'], null, $attributes['xclass'] );
  }


  /**
   * Use the shortcode for previewing forms
   */
  function use_shortcode_for_preview( $content ) {
    global $post;
    if( isset( $post->post_type ) && $post->post_type === 'wplf-form') {
      return $this->wplf_form( $post->ID, $content );
    }
    return $content;
  }
}

endif;

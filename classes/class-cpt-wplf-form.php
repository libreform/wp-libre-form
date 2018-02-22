<?php

if ( ! class_exists( 'CPT_WPLF_Form' ) ) :

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
  public function __construct() {
    // init custom post type
    add_action( 'init', array( $this, 'register_cpt' ) );

    // post.php / post-new.php view
    add_filter( 'get_sample_permalink_html', array( $this, 'modify_permalink_html' ), 10, 2 );
    add_action( 'save_post', array( $this, 'save_cpt' ) );
    add_filter( 'content_save_pre', array( $this, 'strip_form_tags' ), 10, 1 );
    add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes_cpt' ) );
    add_action( 'add_meta_boxes', array( $this, 'maybe_load_imported_template' ), 10, 2 );
    add_action( 'admin_enqueue_scripts', array( $this, 'admin_post_scripts_cpt' ), 10, 1 );

    // edit.php view
    add_filter( 'post_row_actions', array( $this, 'remove_row_actions' ), 10, 2 );
    add_filter( 'manage_edit-wplf-form_columns', array( $this, 'custom_columns_cpt' ), 100, 1 );
    add_action( 'manage_wplf-form_posts_custom_column', array( $this, 'custom_columns_display_cpt' ), 10, 2 );

    add_filter( 'default_content', array( $this, 'default_content_cpt' ) );
    add_filter( 'user_can_richedit', array( $this, 'disable_tinymce' ) );

    // front end
    add_shortcode( 'libre-form', array( $this, 'shortcode' ) );
    add_action( 'wp', array( $this, 'maybe_set_404_for_single_form' ) );
    add_filter( 'the_content', array( $this, 'use_shortcode_for_preview' ), 0 );
    add_action( 'wp_enqueue_scripts', array( $this, 'maybe_enqueue_frontend_script' ) );

    // default filters for the_content, but we don't want to use actual the_content
    add_filter( 'wplf_form', 'convert_smilies' );
    add_filter( 'wplf_form', 'convert_chars' );
    add_filter( 'wplf_form', 'shortcode_unautop' );

    // we want to keep form content strictly html, so let's remove auto <p> tags
    remove_filter( 'wplf_form', 'wpautop' );
    remove_filter( 'wplf_form', 'wptexturize' );

    // Removing wpautop isn't enough if form is used inside a ACF field or so.
    // Fitting the output to one line prevents <br> tags from appearing.
    add_filter( 'wplf_form', array( $this, 'minify_html' ) );
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
      'not_found_in_trash' => __( 'No forms found in Trash.', 'wp-libre-form' ),
    );

    $args = array(
      'labels'              => $labels,
      'public'              => true,
      'publicly_queryable'  => true,
      'exclude_from_search' => true,
      'show_ui'             => true,
      'show_in_menu'        => true,
      'menu_icon'           => 'dashicons-archive',
      'query_var'           => false,
      'capability_type'     => 'post',
      'has_archive'         => false,
      'hierarchical'        => false,
      'menu_position'       => null,
      'rewrite'             => array(
        'slug' => 'libre-forms',
      ),
      'supports'            => array(
        'title',
        'editor',
        'revisions',
        'custom-fields',
      ),
    );

    register_post_type( 'wplf-form', $args );
  }

  /**
   * Modify post.php permalink html to show notice if form isn't publicly visible.
   */
  public function modify_permalink_html( $html, $post_id ) {
    $publicly_visible = $this->get_publicly_visible_state( $post_id );

    if ( get_post_type( $post_id ) === 'wplf-form' && ! $publicly_visible ) {
      $html .= '<span>';
      $html .= __( 'Permalink is for preview purposes only.', 'wp-libre-form' );
      $html .= '</span>';
    }

    return $html;
  }

  /**
   * Disable TinyMCE editor for forms, which are simple HTML things
   */
  public function disable_tinymce( $default ) {
    global $post;

    // only for this cpt
    if ( 'wplf-form' === get_post_type( $post ) ) {
      return false;
    }

    return $default;
  }

  /**
   * Include custom JS and CSS on the edit screen
   */
  public function admin_post_scripts_cpt( $hook ) {
    global $post;

    // make sure we're on the correct view
    if ( 'post-new.php' !== $hook && 'post.php' !== $hook ) {
      return;
    }

    // only for this cpt
    if ( 'wplf-form' !== $post->post_type ) {
      return;
    }

    $assets_url = plugins_url( 'assets', dirname( __FILE__ ) );

    // enqueue the custom JS for this view
    wp_enqueue_script( 'wplf-form-edit-js', $assets_url . '/scripts/wplf-admin-form.js' );

    // enqueue the custom CSS for this view
    wp_enqueue_style( 'wplf-form-edit-css', $assets_url . '/styles/wplf-admin-form.css' );
  }


  /**
   * Pre-populate form editor with default content
   */
  public function default_content_cpt( $content ) {
    global $pagenow;

    // only on post.php screen
    if ( 'post-new.php' !== $pagenow && 'post.php' !== $pagenow ) {
      return $content;
    }

    // only for this cpt
    if ( isset( $_GET['post_type'] ) && 'wplf-form' === $_GET['post_type'] ) {
      ob_start();

      // default content starts here:
      // @codingStandardsIgnoreStart
?>
<p><label for="name"><?php esc_html_e( 'Please enter your name', 'wp-libre-form' ); ?></label>
<input type="text" name="name" id="name" placeholder="<?php echo esc_html_x( 'John Doe', 'Default placeholder name', 'wp-libre-form' ); ?>"></p>

<p><label for="email"><?php echo esc_html_x( 'Please enter your email address', 'wp-libre-form' ); ?> <?php esc_html_e( '(required)', 'wp-libre-form' ); ?></label>
<input type="email" name="email" id="email" placeholder="<?php echo esc_html_x( 'example@email.com', 'Default placeholder email', 'wp-libre-form' ); ?>" required></p>

<p><label for="message"><?php esc_html_e( 'Write your message below', 'wp-libre-form' ); ?> <?php esc_html_e( '(required)', 'wp-libre-form' ); ?></label>
<textarea name="message" rows="5" id="message" placeholder="<?php echo esc_html_x( 'I wanted to ask about...', 'Default placeholder message', 'wp-libre-form' ); ?>" required></textarea></p>

<p><button type="submit"><?php esc_html_e( 'Submit', 'wp-libre-form' ); ?></button></p>

<!-- <?php echo esc_html_x( 'Any valid HTML form can be used here!', 'The HTML comment at the end of the example form', 'wp-libre-form' ); ?> -->
<?php
      // @codingStandardsIgnoreEnd
      $content = esc_textarea( ob_get_clean() );
    }

    return $content;
  }

  /**
   * Remove view action in edit.php for forms
   */
  function remove_row_actions( $actions, $post ) {
    $publicly_visible = $this->get_publicly_visible_state( $post->ID );

    if ( 'wplf-form' === $post->post_type && ! $publicly_visible ) {
      unset( $actions['view'] );
    }

    return $actions;
  }

  /**
   * Custom columns in edit.php for Forms
   */
  public function custom_columns_cpt( $columns ) {
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
  public function custom_columns_display_cpt( $column, $post_id ) {
    if ( 'shortcode' === $column ) {
?>
<input type="text" class="code" value='[libre-form id="<?php echo intval( $post_id ); ?>"]' readonly>
<?php
    }
    if ( 'submissions' === $column ) {
      // count number of submissions
      $submissions = get_posts( array(
        'post_type' => 'wplf-submission',
        'posts_per_page' => -1,
        'meta_key' => '_form_id',
        'meta_value' => $post_id,
        'suppress_filters' => false,
      ) );
?>
  <a href="<?php echo esc_url_raw( admin_url( 'edit.php?post_type=wplf-submission&form=' . $post_id ) ); ?>">
    <?php echo count( $submissions ); ?>
  </a>
<?php
    }
  }


  /**
   * Add meta box to show fields in form
   */
  public function add_meta_boxes_cpt() {
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
      'normal',
      'high'
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
  public function metabox_shortcode( $post ) {
?>
<p><input type="text" class="code" value='[libre-form id="<?php echo esc_attr( $post->ID ); ?>"]' readonly></p>
<?php
  }

  /**
   * Meta box callback for fields meta box
   */
  function metabox_thank_you( $post ) {
    // get post meta
    $meta = get_post_meta( $post->ID );
    $message = isset( $meta['_wplf_thank_you'] ) ?
      $meta['_wplf_thank_you'][0] : _x( 'Success!', 'Default success message', 'wp-libre-form' );
?>
<p>
<?php wp_editor( esc_textarea( $message ), 'wplf_thank_you', array(
  'wpautop' => true,
  'media_buttons' => true,
  'textarea_name' => 'wplf_thank_you',
  'textarea_rows' => 6,
  'teeny' => true,
  )); ?>
</p>
<?php
    wp_nonce_field( 'wplf_form_meta', 'wplf_form_meta_nonce' );
  }


  /**
   * Meta box callback for form fields meta box
   */
  public function metabox_form_fields() {
?>
<p><?php esc_html_e( 'Fields marked with * are required', 'wp-libre-form' ); ?></p>
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
  public function metabox_submit_email( $post ) {
    // get post meta
    $meta = get_post_meta( $post->ID );
    $email_enabled = isset( $meta['_wplf_email_copy_enabled'] ) ? $meta['_wplf_email_copy_enabled'][0] : true;
    $email_copy_to = isset( $meta['_wplf_email_copy_to'] ) ? $meta['_wplf_email_copy_to'][0] : '';
    $email_copy_from = isset( $meta['_wplf_email_copy_from'] ) ? $meta['_wplf_email_copy_from'][0] : '';
    $email_copy_from_address = isset( $meta['_wplf_email_copy_from_address'] ) ? $meta['_wplf_email_copy_from_address'][0] : '';
    $email_copy_subject = isset( $meta['_wplf_email_copy_subject'] ) ? $meta['_wplf_email_copy_subject'][0] : '';
    $email_copy_content = isset( $meta['_wplf_email_copy_content'] ) ? $meta['_wplf_email_copy_content'][0] : '';

    $sitename = strtolower( $_SERVER['SERVER_NAME'] );
    if ( substr( $sitename, 0, 4 ) == 'www.' ) {
      $sitename = substr( $sitename, 4 );
    }
    $email_copy_from_default = 'wordpress@' . $sitename;
?>
<p>
  <label for="wplf_email_copy_enabled">
    <input
      id="wplf_email_copy_enabled"
      name="wplf_email_copy_enabled"
      type="checkbox"
      <?php echo $email_enabled ? 'checked="checked"' : ''; ?>
    >
    <?php esc_html_e( 'Send an email copy when a form is submitted?', 'wp-libre-form' ); ?>
  </label>
</p>
<p class="wplf-email-copy-to-field">
  <?php esc_attr_e( 'You may use any form field values and following global tags: submission-id, referrer, form-title, form-id, user-id, timestamp, datetime, language, all-form-data. All field values and tags should be enclosed in "%" markers.', 'wp-libre-form' ); ?>
</p>
<p class="wplf-email-copy-to-field">
  <label for="wplf_email_copy_to" style="display:inline-block;width:100px;font-weight:600;"><?php esc_attr_e( 'Send copy to', 'wp-libre-form' ); ?></label>
  <input
    type="text"
    name="wplf_email_copy_to"
    value="<?php echo esc_attr( $email_copy_to ); ?>"
    placeholder="<?php echo esc_attr( get_option( 'admin_email' ) ); ?>"
    style="width:80%;"
  >
</p>
<p class="wplf-email-copy-to-field">
  <label for="wplf_email_copy_from" style="display:inline-block;width:100px;font-weight:600;"><?php esc_attr_e( 'Sender name', 'wp-libre-form' ); ?></label>
  <input
    type="text"
    name="wplf_email_copy_from"
    value="<?php echo esc_attr( $email_copy_from ); ?>"
    placeholder="WordPress"
    style="width:80%;"
  >
</p>
<p class="wplf-email-copy-to-field">
  <label for="wplf_email_copy_from_address" style="display:inline-block;width:100px;font-weight:600;"><?php esc_attr_e( 'Sender email', 'wp-libre-form' ); ?></label>
  <input
    type="text"
    name="wplf_email_copy_from_address"
    value="<?php echo esc_attr( $email_copy_from_address ); ?>"po
    placeholder="<?php echo esc_attr( $email_copy_from_default ); ?>"
    style="width:80%;"
  >
</p>
<p class="wplf-email-copy-to-field">
  <label for="wplf_email_copy_subject" style="display:inline-block;width:100px;font-weight:600;"><?php esc_attr_e( 'Subject', 'wp-libre-form' ); ?></label>
  <?php // @codingStandardsIgnoreStart ?>
  <input
    type="text"
    name="wplf_email_copy_subject"
    value="<?php echo esc_attr( $email_copy_subject ); ?>"
    placeholder="<?php esc_attr_e( '[%submission-id%] Submission from %referrer%', 'wp-libre-form' ); ?>"
    style="width:80%;"
  >
  <?php // @codingStandardsIgnoreEnd ?>
</p>
<p class="wplf-email-copy-to-field" style="display:table;width:100%;">
  <label for="wplf_email_copy_content" style="display:table-cell;width:105px;font-weight:600;vertical-align:top;"><?php esc_attr_e( 'Content', 'wp-libre-form' ); ?></label>
  <?php // @codingStandardsIgnoreStart ?>
  <textarea
    name="wplf_email_copy_content"
    placeholder="<?php esc_attr_e( 'Form %form-title% (ID %form-id%) was submitted with values below', 'wp-libre-form' ); ?>:

%all-form-data%"
    style="display:table-cell;width:94%;"
    rows="10"
  ><?php echo esc_attr( $email_copy_content ); ?></textarea>
  <?php // @codingStandardsIgnoreEnd ?>
</p>
<?php
  }

  /**
   * Meta box callback for submission title format
   */
  public function meta_box_title_format( $post ) {
    // get post meta
    $meta = get_post_meta( $post->ID );
    $default = '%name% <%email%>'; // default submission title format
    $format = isset( $meta['_wplf_title_format'] ) ? $meta['_wplf_title_format'][0] : $default;
?>
<p><?php esc_html_e( 'Submissions from this form will use this formatting in their title.', 'wp-libre-form' ); ?></p>
<p><?php esc_html_e( 'You may use any field values enclosed in "%" markers.', 'wp-libre-form' ); ?></p>
<p>
  <input
    type="text"
    name="wplf_title_format"
    value="<?php echo esc_attr( $format ); ?>"
    placeholder="<?php echo esc_attr( $default ); ?>"
    class="code"
    style="width:100%"
    autocomplete="off"
  >
</p>
<?php
  }

  /**
   * Check and maybe load a static HTML template for a specific form.
   *
   * Hooked to `add_meta_boxes`.
   *
   * @param string $post_type Post type for which editor is being rendered for.
   * @param \WP_Post $post Current post object.
   *
   * @return void
   */
  function maybe_load_imported_template( $post_type, $post ) {
    if ( $post_type !== 'wplf-form' || $post->post_status === 'auto-draft' ) {
      return;
    }

    $form_id = (int) $post->ID;

    /**
     * Allows importing a static HTML template for a specific form ID.
     *
     * If the template returned is `null` then no template is loaded.
     *
     * @param string|null $template_content Raw HTML to import for a form.
     * @param int $form_id Form ID (WP_Post ID) to import template for.
     */
    $template_content = apply_filters( 'wplf_import_html_template', null, $form_id );

    if ( $template_content === null ) {
      return;
    }

    // Clear unwanted form tags. WPLF will insert those by itself when rendering a form.
    $template_content = preg_replace( '%<form ?[^>]*?>%', '', $template_content );
    $template_content = preg_replace( '%</form>%', '', $template_content );

    $this->override_form_template( $template_content, $form_id );
  }

  /**
   * Override a form's template with an imported template file.
   *
   * @param string $template_content Raw HTML content to use for the form content.
   * @param int $form_id ID of form we're overriding the template for.
   *
   * @return void
   */
  protected function override_form_template( $template_content, $form_id ) {
    $this->maybe_persist_override_template( $template_content, $form_id );

    static $times_content_replaced = 0;

    // Make the editor textarea uneditable.
    add_filter( 'the_editor', function ( $editor ) {
      if ( ! preg_match( '%id="wp-content-editor-container"%', $editor ) ) {
        return $editor;
      }

      $editor = preg_replace( '%\<textarea %', '<textarea readonly="readonly" ', $editor );

      $notice = _x(
        'This form template is being overridden by code, you must edit it in your project code',
        'Template override notice in form edit admin view',
        'wp-libre-form'
      );

      $notice = sprintf( '<div class="wplf-template-override-notice">%s</div>', $notice );

      return $notice . $editor;
    } );

    // Custom settings for the form editor.
    add_filter( 'wp_editor_settings', function ( $settings, $editor_id ) {
      if ( $editor_id !== 'content' ) {
          return $settings;
      }

      $settings['tinymce'] = false;
      $settings['quicktags'] = false;
      $settings['media_buttons'] = false;

      return $settings;
    }, 10, 2 );

    // Replace all editor content with template content.
    add_filter( 'the_editor_content', function ( $content ) use ( $template_content, &$times_content_replaced ) {
      // This is hacky, yes. We only want to override the content for the first
      // editor field we come by, meaning 99% of the time we hit the wanted form
      // template editor field at the top of the edit view page.
      if ( $times_content_replaced > 0 ) {
        return $content;
      }

      $times_content_replaced++;

      return $template_content;
    } );
  }

  /**
   * Check if we need to auto-persist the form template override into WP database.
   *
   * @param string $template Template to maybe persist.
   * @param int $form_id Form ID to persist template for.
   * @param bool $force Force a persist even though not required?
   *
   * @return void
   */
  protected function maybe_persist_override_template( $template, $form_id, $force = false ) {
    $hash_transient = 'wplf_form_tmpl_hash_' . $form_id;
    $template_hash = md5( $template );
    $stored_hash = get_transient( $hash_transient );

    if ( ! $force && $template_hash === $stored_hash ) {
      return;
    }

    // Safe-guard to prevent accidental infinite loops.
    remove_action( 'save_post', array( $this, 'save_cpt' ) );

    $updated = wp_update_post( array(
      'ID' => (int) $form_id,
      'post_content' => $template,
    ) );

    add_action( 'save_post', array( $this, 'save_cpt' ) );

    // Maybe we should do something else than just silently fail if persisting failed above.
    if ( $updated ) {
        set_transient( $hash_transient, $template_hash, HOUR_IN_SECONDS * 8 );
    }
  }

  /**
   * Handles saving our post meta
   */
  public function save_cpt( $post_id ) {
    // verify nonce
    if ( ! isset( $_POST['wplf_form_meta_nonce'] ) ) {
      return;
    } elseif ( ! wp_verify_nonce( $_POST['wplf_form_meta_nonce'], 'wplf_form_meta' ) ) {
      return;
    }

    // only for this cpt
    if ( ! isset( $_POST['post_type'] ) || 'wplf-form' !== $_POST['post_type'] ) {
      return;
    }

    // check permissions.
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
      return;
    }

    // save success message
    if ( isset( $_POST['wplf_thank_you'] ) ) {
      $success = wp_kses_post( $_POST['wplf_thank_you'] );
      $success = apply_filters( 'wplf_save_success_message', $success, $post_id );
      update_post_meta( $post_id, '_wplf_thank_you', $success );
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
    } else {
      update_post_meta( $post_id, '_wplf_email_copy_enabled', false );
    }

    // save email copy
    if ( isset( $_POST['wplf_email_copy_to'] ) ) {
      $email_field = $_POST['wplf_email_copy_to'];
      $to = '';

      if ( strpos( $email_field, ',' ) > 0 ) {
        // Intentional. Makes no sense if the first character is a comma, so pass it along as a single address.
        // sanitize_email() should take care of the rest.
        $email_array = explode( ',', $email_field );
        foreach ( $email_array as $email ) {
          $email = trim( $email );
          $email = sanitize_email( $email ) . ', ';
          $to .= $email;
        }
        $to = rtrim( $to, ', ' );
      } else {
        $to = sanitize_email( $email_field );
      }

      if ( ! empty( $to ) ) {
        update_post_meta( $post_id, '_wplf_email_copy_to', $to );
      } else {
        delete_post_meta( $post_id, '_wplf_email_copy_to' );
      }
    }

    // save email copy from
    if ( isset( $_POST['wplf_email_copy_from'] ) && ! empty( $_POST['wplf_email_copy_from'] ) ) {
      update_post_meta( $post_id, '_wplf_email_copy_from', sanitize_text_field( $_POST['wplf_email_copy_from'] ) );
    } else {
      delete_post_meta( $post_id, '_wplf_email_copy_from' );
    }

    if ( isset( $_POST['wplf_email_copy_from_address'] ) && ! empty( $_POST['wplf_email_copy_from_address'] ) ) {
      update_post_meta( $post_id, '_wplf_email_copy_from_address', sanitize_text_field( $_POST['wplf_email_copy_from_address'] ) );
    } else {
      delete_post_meta( $post_id, '_wplf_email_copy_from_address' );
    }

    // save email copy subject
    if ( isset( $_POST['wplf_email_copy_subject'] ) && ! empty( $_POST['wplf_email_copy_subject'] ) ) {
      update_post_meta( $post_id, '_wplf_email_copy_subject', sanitize_text_field( $_POST['wplf_email_copy_subject'] ) );
    } else {
      delete_post_meta( $post_id, '_wplf_email_copy_subject' );
    }

    // save email copy content
    if ( isset( $_POST['wplf_email_copy_content'] ) && ! empty( $_POST['wplf_email_copy_content'] ) ) {
      update_post_meta( $post_id, '_wplf_email_copy_content', wp_kses_post( $_POST['wplf_email_copy_content'] ) );
    } else {
      delete_post_meta( $post_id, '_wplf_email_copy_content' );
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
  public function strip_form_tags( $content ) {
    return preg_replace( '/<\/?form.*>/i', '', $content );
  }


  /**
   * The function we display the form with
   */
  public function wplf_form( $id, $content = '', $xclass = '', $attributes = [] ) {
    global $post;
    $preview = ! empty( $_GET['preview'] ) ? $_GET['preview'] : false;

    if ( 'publish' === get_post_status( $id ) || $preview ) {
      $form = get_post( $id );
      if ( empty( $content ) ) {
        // you can override the content via parameter
        $content = $form->post_content;
      }

      // filter content html
      $content = apply_filters( "wplf_{$form->post_name}_form", $content );
      $content = apply_filters( "wplf_{$form->ID}_form", $content );

      // run default filters after. The user probably wants to filter original content, not modified by WP
      $content = apply_filters( 'wplf_form', $content );

      ob_start();
?>
<form
  data-form-id="<?php echo intval( $id ); ?>"
  class="libre-form libre-form-<?php echo esc_attr( $id . ' ' . $xclass ); ?>"
  <?php
    // check if form contains file inputs
    if ( false !== strpos( $content, "type='file'" )
      || false !== strpos( $content, 'type="file"' )
      || false !== strpos( $content, 'type=file' )
    ) : ?>
    enctype="multipart/form-data"
  <?php endif; ?>
  <?php
    // add custom attributes from shortcode to <form> element
    foreach ( $attributes as $attr_name => $attr_value ) {
      echo esc_attr( $attr_name ) . '="' . esc_attr( $attr_value ) . "\"\n";
    }
  ?>
>
  <?php if ( is_singular( 'wplf-form' ) && current_user_can( 'edit_post', $id ) ) : ?>
    <?php
      $publicly_visible = $this->get_publicly_visible_state( $id );
      if ( ! $publicly_visible ) :
    ?>
      <p style="background:#f5f5f5;border-left:4px solid #dc3232;padding:6px 12px;">
        <strong style="color:#dc3232;">
          <?php esc_html_e( 'This form preview URL is not public and cannot be shared.', 'wp-libre-form' ); ?>
        </strong>
        <br />
        <?php esc_html_e( 'Non-logged in visitors will see a 404 error page instead.', 'wp-libre-form' ); ?>
      </p>
    <?php endif; ?>
  <?php endif; ?>
  <?php
    // This is where we output the user-input form html. We allow all HTML here. Yes, even scripts.
    // @codingStandardsIgnoreStart
    echo $content;
    // @codingStandardsIgnoreEnd
  ?>
  <input type="hidden" name="referrer" value="<?php the_permalink(); ?>">
  <input type="hidden" name="_referrer_id" value="<?php echo esc_attr( get_the_id() ); ?>">
  <input type="hidden" name="_form_id" value="<?php echo esc_attr( $id ); ?>">
</form>
<?php
      $output = ob_get_clean();

      // enqueue our footer script here
      wp_enqueue_script( 'wplf-form-js' );

      return $output;
    }

    // return nothing if the form doesn't exist
    return '';
  }


  /**
   * Enqueue the front end JS
   */
  public function maybe_enqueue_frontend_script() {
    global $post;

    // register the script, but only enqueue it if the current post contains a form in it
    wp_register_script(
      'wplf-form-js',
      plugins_url( 'assets/scripts/wplf-form.js', dirname( __FILE__ ) ),
      apply_filters( 'wplf_frontend_script_dependencies', array() ),
      WPLF_VERSION,
      true
    );

    // add dynamic variables to the script's scope
    wp_localize_script( 'wplf-form-js', 'ajax_object', apply_filters( 'wplf_ajax_object', array(
      'ajax_url' => admin_url( 'admin-ajax.php' ),
      'ajax_credentials' => apply_filters( 'wplf_ajax_fetch_credentials_mode', 'same-origin' ),
      'wplf_assets_dir' => plugin_dir_url( realpath( __DIR__ . '/../wp-libre-form.php' ) ) . 'assets',
    ) ) );
  }


  /**
   * Shortcode for displaying a Form
   */
  public function shortcode( $shortcode_atts, $content = null ) {
    $attributes = shortcode_atts( array(
      'id' => null,
      'xclass' => '',
    ), $shortcode_atts, 'libre-form' );

    // we don't render id and class as <form> attributes
    $id = $attributes['id'];
    $xclass = $attributes['xclass'];
    $attributes = array_diff_key( $shortcode_atts, array(
      'id' => null,
      'xclass' => null,
    ) );

    // display form
    return $this->wplf_form( $id, $content, $xclass, $attributes );
  }


  /**
   * Use the shortcode for previewing forms
   */
  public function use_shortcode_for_preview( $content ) {
    global $post;
    if ( ! isset( $post->post_type ) || $post->post_type !== 'wplf-form' ) {
      return $content;
    }
    return '[libre-form id="' . (int) $post->ID . '"]' . $this->minify_html( $content ) . '[/libre-form]';
  }

  /**
   * Set and show 404 page for visitors trying to see single form.
   * And yes, it is a global $post. That's right.
   */
  public function maybe_set_404_for_single_form() {
    global $post;

    if ( ! is_singular( 'wplf-form' ) ) {
      return;
    }

    $publicly_visible = $this->get_publicly_visible_state( $post->ID );
    if ( $publicly_visible ) {
      return;
    }

    if ( ! current_user_can( 'edit_post', $post->ID ) ) {
      global $wp_query;
      $wp_query->set_404();
    }
  }

  /**
   * Wrapper function to check if form is publicly visible.
   */
  public function get_publicly_visible_state( $id ) {
    return apply_filters( 'wplf-form-publicly-visible', false, $id );
  }

  /**
   * A very simple uglify. Just removes line breaks from html
   */
  public function minify_html( $html ) {
    return str_replace( array( "\n", "\r" ), ' ', $html );
  }
}

endif;

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

    // post.php view
    add_action( 'add_meta_boxes', array( $this, 'add_meta_boxes_cpt' ) );

    // edit.php view
    add_filter( 'manage_edit-wplf-submission_columns' , array( $this, 'custom_columns_cpt' ), 100, 1);
    add_action( 'manage_posts_custom_column' , array( $this, 'custom_columns_display_cpt' ), 10, 2 );
    add_action( 'restrict_manage_posts', array( $this, 'form_filter_dropdown' ) );
    add_filter( 'pre_get_posts', array( $this, 'filter_by_form' ) );
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
        echo '<a href="' . esc_url_raw( $referrer ) . '">' . esc_url( $referrer ) . '</a>';
      }
    }
    if( 'form' === $column ) {
      if( $form_id = get_post_meta($post_id, '_form_id', true) ) {
        $form = get_post( $form_id );
        echo '<a href="' . get_edit_post_link( $form_id, '' ) . '" target="_blank">' . esc_html( $form->post_title ) . '</a>';
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

  /**
   * Show a form filter in the edit.php view
   */
  function form_filter_dropdown() {
    global $pagenow;

    $allowed = array("wplf-submission"); // show filter on these post types (currently only one?)
    $allowed = apply_filters("wplf-dropdown-filter", $allowed);
    $post_type = get_query_var("post_type");

    if( 'edit.php' != $pagenow || !in_array($post_type, $allowed)) {
      return;
    }

    $transient = get_transient("wplf-form-filter");

    if($transient){
      $forms = $transient;
    }

    else{
      $forms = get_posts( array(
        'post_per_page' => '-1',
        'post_type' => 'wplf-form',
      ) );

      set_transient("wplf-form-filter", $forms, 15 *  MINUTE_IN_SECONDS);
    }

?>
<label for="filter-by-form" class="screen-reader-text">Filter by form</label>
<select name="form" id="filter-by-form">
  <option value="0"><?php _e('All Forms', 'wp-libre-form'); ?></option>
  <?php foreach( $forms as $form ) : ?>
  <option value="<?php echo $form->ID; ?>" <?php echo isset( $_REQUEST['form'] ) && $_REQUEST['form'] == $form->ID ? 'selected' : ''; ?>><?php echo $form->post_title; ?></option>
  <?php endforeach; ?>
</select>
<?php
  }

  /**
   * Filter by form in the edit.php view
   */
  function filter_by_form( $query ) {
    global $pagenow;

    if( 'edit.php' != $pagenow ) {
      return $query;
    }

    if( $query->get( 'post_type' ) != 'wplf-submission' ) {
      return $query;
    }

    if( isset( $_REQUEST['form'] ) && ! empty( $_REQUEST['form'] ) ) {
      $query->set( 'meta_key', '_form_id' );
      $query->set( 'meta_value', intval( $_REQUEST['form'] ) );
    }

    return $query;
  }

  /**
   * Add meta box to show fields in form
   */
  function add_meta_boxes_cpt() {
    // Shortcode meta box
    add_meta_box(
      'wplf-shortcode',
      __( 'Submission', 'wp-libre-form' ),
      array( $this, 'metabox_submission' ),
      'wplf-submission',
      'normal',
      'high'
    );
  }

  /**
   * The submission metabox callback
   */
  function metabox_submission() {
    global $post;
    $postmeta = get_post_meta( $post->ID );
    $fields = array_keys( $postmeta );
    $home_path = get_home_path();
?>
<p>
  <table class="wp-list-table widefat striped">
    <thead>
      <tr>
        <th><strong><?php _e( 'Field', 'wp-libre-form' ); ?></strong></th>
        <th><strong><?php _e( 'Value', 'wp-libre-form' ); ?></strong></th>
      </tr>
    </thead>
    <tbody>
      <?php foreach( $fields as $field ) : ?>
        <?php if( '_' != $field[0]  ) : ?>
        <?php
        $value = $postmeta[ $field ][0];

        // maybe show a link for the field if suitable
        $possible_link = '';

        // if the field ends with '_attachment' and there is an attachment url that corresponds to the id, show a link
        $attachment_suffix = '_attachment';
        if ( substr( $field, -strlen( $attachment_suffix ) ) === $attachment_suffix && wp_get_attachment_url( $value ) ) {
          $link_text = __( 'View Attachment', 'wp-libre-form' );
          $possible_link = '<a target="_blank" href="' . get_edit_post_link( $value ) . '" style="float:right">' . $link_text . '</a>';
        }

        // Show a link if the field corresponds to a URL
        // assume values starting with '/' are root relative URLs and should be handled as links
        $value_is_url = $value[0] === '/' ? true : filter_var( $value, FILTER_VALIDATE_URL );
        if ( $value_is_url ) {
          $link_text = __( 'Open Link', 'wp-libre-form' );
          $possible_link = '<a target="_blank" href="' . $value . '" style="float:right">' . $link_text . '</a>';
        }
        ?>
        <tr>
          <th><strong><?php echo $field; ?></strong> <?php echo $possible_link; ?></th>
          <?php if( strlen( $value ) > 60 || strpos( $value, "\n" ) ) : ?>
          <td><textarea style="width:100%" readonly><?php echo esc_textarea( $value ); ?></textarea></td>
          <?php else : ?>
          <td><input style="width:100%" type="text" value="<?php esc_attr_e( $value ); ?>" readonly></td>
          <?php endif; ?>
        </tr>
        <?php endif; ?>
      <?php endforeach; ?>
    </tbody>
  </table>
</p>
<?php
  }
}

endif;

<?php

class WPLF_Plugins {
  public static $instance;
  private $plugins;

  private function __construct() {
    add_action( 'admin_menu', function() {
      add_submenu_page(
        'edit.php?post_type=wplf-form',
        __( 'WP Libre Form plugins', 'wp-libre-form' ),
        __( 'Plugins', 'wp-libre-form' ),
        'manage_options',
        'wplf-plugins',
        array( $this, 'render_admin_page' )
      );
    } );

    add_action( 'admin_enqueue_scripts', array( $this, 'admin_assets' ), 10, 1 );
  }

  /**
   * Include custom JS and CSS on the plugins page
   */
  public function admin_assets( $hook ) {
    if ( $hook !== 'wplf-form_page_wplf-plugins' ) {
      return;
    }

    $assets_url = plugins_url( 'assets', dirname( __FILE__ ) );

    // enqueue the custom JS for this view
    wp_enqueue_script( 'wplf-form-edit-js', $assets_url . '/scripts/wplf-plugins.js', [], false, true );

    // enqueue the custom CSS for this view
    wp_enqueue_style( 'wplf-form-edit-css', $assets_url . '/styles/wplf-plugins.css' );
  }

  public static function init() {
    if ( is_null( self::$instance ) ) {
      self::$instance = new WPLF_Plugins();
    }

    return self::$instance;
  }

  private function render_plugin( $plugin = array() ) {
    $name = $plugin['name'];
    $version = $plugin['version'];
    $link = $plugin['link'];
    $description = $plugin['description'];
    ?>

    <article class="wplf-plugin-box">
      <h3><?php echo sanitize_text_field( $name ); ?></h3>
      <div class="wplf-plugin-box__meta">
        <?php if ( $version ) { ?>
          <span class="wplf-plugin-box__meta--version">
            <?php echo sanitize_text_field( $version ); ?>
          </span>
        <?php } ?>

        <?php if ( $link ) {
          $link = sanitize_text_field( $link );
          ?>
          <a
            href="<?php echo $link; ?>"
            class="wplf-plugin-box__meta--link button button-primary"
            target="_blank"
            rel="noreferrer noopener"
          >
            <?php echo __( 'Plugin page', 'wp-libre-form' ); ?>
          </a>
        <?php } ?>
      </div>
      <p><?php echo sanitize_text_field( $description ); ?></p>
    </article>
    <?php
  }

  public function render_admin_page() {
    $available = $this->get_available_plugins();
    $enabled = $this->get_enabled_plugins();
    $plugins_with_options = array_filter( $enabled, function( $plugin ) {
      return ! empty( $plugin['settings_page'] ) && is_callable( $plugin['settings_page'] );
    } );

    ?>
    <div class="wplf-plugins">
      <header class="wplf-plugins-menu nav-tab-wrapper">
        <a href="#" class="nav-tab">
          <?php echo __( 'General', 'wp-libre-form' ); ?>
        </a>
        <?php foreach ( $plugins_with_options as $plugin ) { ?>
          <a href="#" class="nav-tab">
            <?php echo sanitize_text_field( $plugin['name'] ); ?>
          </a>
        <?php } ?>
      </header>

      <div class="wplf-plugins-page" data-page="General">
        <h1><?php echo __( 'WP Libre Form plugins', 'wp-libre-form' ); ?></h1>
        <p>
          <?php echo __(
            "The core of WP Libre Form is kept small and simple, for a reason.",
            'wp-libre-form'
          ); ?>
        </p>
        <p>
          <?php echo __(
            "Simplicity comes with drawbacks, and chances are that the feature you're looking for doesn't exist.
Plugins help remedy the problem.",
            'wp-libre-form'
          ); ?>
        </p>

        <h2><?php echo __( 'Enabled plugins', 'wp-libre-form' ); ?></h1>
        <div class="wplf-plugin-list">
          <?php foreach ( $enabled as $plugin ) {
            $this->render_plugin( $plugin );
          } ?>
        </div>

        <h2><?php echo __( 'Available plugins', 'wp-libre-form' ); ?></h1>

        <div class="wplf-plugin-list">
          <?php foreach ( $available as $plugin ) {
            $this->render_plugin( $plugin );
          } ?>
        </div>

      </div>

      <?php foreach ( $plugins_with_options as $plugin ) {
        $name = sanitize_text_field( $plugin['name'] );
      ?>
      <div class="wplf-plugins-page" data-page="<?php echo $name; ?>">
        <?php $plugin['settings_page'](); ?>
      </div>
      <?php } ?>
    </div>
    <?php
  }

  private function get_enabled_plugins() {
    return $this->plugins;
  }

  private function get_available_plugins() {
    $list = [
      [
        'name' => 'Export',
        'version' => null,
        'link' => 'https://github.com/libreform/export',
        'description' => 'Add CSV export functionality',
      ],

      [
        'name' => 'Formbuilder',
        'version' => null,
        'link' => 'https://github.com/k1sul1/wp-libre-formbuilder',
        'description' => "Writing HTML isn't for everyone. Add a visual builder with this plugin.",
      ]
    ];

    // Remove already installed plugins
    $enabled = $this->get_enabled_plugins();
    $list = array_filter($list, function($plugin) use ($enabled) {
      foreach ($enabled as $p) {
        if ($p['name'] === $plugin['name']) {
          return false;
        }
      }

      return true;
    });

    return $list;
  }

  public function register( $data = array() ) {
    $data = array_merge( array(
      'name' => null,
      'description' => null,
      'version' => null,
      'link' => null,
      'settings_page' => null,
    ), $data );

    $this->plugins[] = $data;
  }
}

<?php

class WPLF_Plugins {
  public static $instance;
  private $plugins = array();

  public function __get( $key ) {
    if ( ! empty( $this->plugins[ $key ] ) ) {
      return $this->plugins[ $key ]['instance'];
    }

    throw new Exception( 'No plugin found with that name' );
  }

  private function __construct() {
    add_action(
         'admin_menu', function() {
      add_submenu_page(
        'edit.php?post_type=wplf-form',
        __( 'WP Libre Form plugins', 'wp-libre-form' ),
        __( 'Plugins', 'wp-libre-form' ),
        'manage_options',
        'wplf-plugins',
        array( $this, 'render_admin_page' )
      );
    }
        );

    add_action(
         'admin_enqueue_scripts', function( $hook ) {
      if ( $hook !== 'wplf-form_page_wplf-plugins' ) {
        return;
      }

      $assets_url = plugins_url( 'assets', dirname( __FILE__ ) );

      // enqueue the custom JS for this view
      wp_enqueue_script( 'wplf-form-edit-js', $assets_url . '/scripts/wplf-plugins.js', [], false, true );

      // enqueue the custom CSS for this view
      wp_enqueue_style( 'wplf-form-edit-css', $assets_url . '/styles/wplf-plugins.css' );
    }, 10, 1
        );

    add_action( 'admin_notices', function() {
      $this->notify_about_feature(
        esc_html__(
          "Hey! Did you notice that WP Libre Form now lists plugins that extend it's functionality, go check them out!",
          'wp-libre-form'
        ),
        get_admin_url() . 'edit.php?post_type=wplf-form&page=wplf-plugins',
        'wplf-plugins-notice-dismissed'
      );
    } );
  }

  public static function init() {
    if ( is_null( self::$instance ) ) {
      self::$instance = new WPLF_Plugins();
    }

    return self::$instance;
  }

  public function notify_about_feature( $message = '', $link = '', $option_name = null ) {
    if ( ! $option_name ) return;

    if ( ! empty( $_POST[ $option_name ] ) ) {
      update_option( $option_name, 'true' );
      $dismissed = true;
    } else {
      $dismissed = get_option( $option_name, 'false' ) === 'true';
    }

    if ( $dismissed ) return;
    ?>
    <div class="notice notice-info wplf-notice-feature-plugin">
      <form method="post" action="<?php echo esc_attr( $link ); ?>">
        <input type="hidden" name="<?php echo esc_attr( $option_name ); ?>" value="true">
        <p>
          <?php echo esc_html( $message ); ?>
        </p>
        <p>
          <button class="button button-primary">
            <?php echo esc_html__( 'View feature and close this notice', 'wp-libre-form' ); ?>
          </button>
        </p>
      </form>
    </div>
    <?php
  }

  private function render_plugin( $plugin = array() ) {
    $plugin = $this->fill_plugin_data( $plugin );
    $name = $plugin['name'];
    $version = $plugin['version'];
    $link = $plugin['link'];
    $description = $plugin['description'];
    $settings_page = $plugin['settings_page'];

    $settings_page_presumed_link = false;
    if ( gettype( $settings_page ) === 'string' ) {
      $settings_page_presumed_link = true;
    }
    ?>

    <article class="wplf-plugin-box">
      <h3><?php echo esc_html( $name ); ?></h3>
      <div class="wplf-plugin-box__meta">
        <?php if ( $version ) { ?>
          <span class="wplf-plugin-box__meta--version">
            <?php echo esc_html( $version ); ?>
          </span>
        <?php } ?>

        <div class="wplf-plugin-box__meta--links">
          <?php if ( $link ) {
            $link = esc_attr( $link );
            ?>
            <a
              href="<?php echo esc_attr( $link ); ?>"
              class="button button-primary"
              target="_blank"
              rel="noreferrer noopener"
            >
              <?php echo esc_html__( 'Plugin page', 'wp-libre-form' ); ?>
            </a>
          <?php } ?>

          <?php if ( $settings_page_presumed_link ) {
            $settings_page = sanitize_text_field( $settings_page );
            ?>
            <a
              href="<?php echo esc_attr( $settings_page ); ?>"
              class="button button-primary"
              target="_blank"
              rel="noreferrer noopener"
            >
              <?php echo esc_html__( 'Plugin settings', 'wp-libre-form' ); ?>
            </a>
          <?php } ?>
        </div>

      </div>
      <p><?php echo esc_html( $description ); ?></p>
    </article>
    <?php
  }

  public function render_admin_page() {
    $available = $this->get_available_plugins();
    $enabled = $this->get_enabled_plugins();
    $plugins_with_options = array_filter(
         $enabled, function( $plugin ) {
      return ! empty( $plugin['settings_page'] ) && is_callable( $plugin['settings_page'] );
    }
        );

    ?>
    <div class="wplf-plugins">
      <header class="wplf-plugins-menu nav-tab-wrapper">
        <a href="#" class="nav-tab" data-page="General">
          <?php echo esc_html__( 'General', 'wp-libre-form' ); ?>
        </a>
        <?php foreach ( $plugins_with_options as $plugin ) {
          $name = sanitize_text_field( $plugin['name'] ); ?>
          <a href="#" class="nav-tab" data-page="<?php echo esc_attr( $name ); ?>">
            <?php echo esc_html( $name ); ?>
          </a>
        <?php } ?>
      </header>

      <div class="wplf-plugins-page" data-page="General">
        <h1><?php echo esc_html__( 'WP Libre Form plugins', 'wp-libre-form' ); ?></h1>
        <p>
          <?php echo esc_html__(
            'The core of WP Libre Form is kept small and simple, for a reason.',
            'wp-libre-form'
          ); ?>
        </p>
        <p>
          <?php echo esc_html__(
            "Simplicity comes with drawbacks, and chances are that the feature you're looking for doesn't exist.
Plugins help remedy the problem.",
            'wp-libre-form'
          ); ?>
        </p>


        <?php if ( ! empty( $enabled ) ) { ?>
          <h2><?php echo esc_html__( 'Enabled plugins', 'wp-libre-form' ); ?></h1>

          <div class="wplf-plugin-list">
            <?php foreach ( $enabled as $plugin ) {
              $this->render_plugin( $plugin );
            } ?>
          </div>
        <?php } ?>

        <?php if ( ! empty( $available ) ) { ?>
          <h2><?php echo esc_html__( 'Available plugins', 'wp-libre-form' ); ?></h1>

          <div class="wplf-plugin-list">
            <?php foreach ( $available as $plugin ) {
              $this->render_plugin( $plugin );
            } ?>
          </div>
        <?php } ?>

      </div>

      <?php foreach ( $plugins_with_options as $plugin ) {
        $name = sanitize_text_field( $plugin['name'] );
      ?>
      <div class="wplf-plugins-page" data-page="<?php echo esc_attr( $name ); ?>">
        <?php $plugin['settings_page'](); ?>
      </div>
      <?php } ?>
    </div>
    <?php
  }

  private function get_enabled_plugins() {
    return apply_filters( 'wplf_enabled_plugins', $this->plugins );
  }

  private function get_available_plugins() {
    $list = [
      'Export' => $this->fill_plugin_data(
           [
        'name' => 'Export',
        'link' => 'https://github.com/libreform/export',
        'description' => 'Add CSV export functionality',
      ]
          ),

      'Formbuilder' => $this->fill_plugin_data(
           [
        'name' => 'Formbuilder',
        'link' => 'https://github.com/k1sul1/wp-libre-formbuilder',
        'description' => "Writing HTML isn't for everyone. Add a visual builder with this plugin.",
      ]
          ),
    ];

    // Remove already installed plugins
    $enabled = $this->get_enabled_plugins();
    $list = array_filter(
        $list, function( $plugin ) use ( $enabled ) {
      foreach ( $enabled as $name => $p ) {
        if ( $name === $plugin['name'] ) {
          return false;
        }
      }

      return true;
    }
        );

    return apply_filters( 'wplf_available_plugins', $list );
  }

  /**
   * Helper function to avoid having to !empty() check everything
   *
   * @param array $data
   */
  private function fill_plugin_data( $data = array() ) {
    return array_merge(
         array(
      'name' => null,
      'description' => null,
      'instance' => null,
      'version' => null,
      'link' => null,
      'settings_page' => null,
    ), $data
        );
  }

  /**
   * Register a plugin for WP Libre Form
   *
   * @param array $data
   */
  public function register( $data = array() ) {
    $data = $this->fill_plugin_data( $data );

    if ( empty( $data['name'] ) ) {
      throw new Exception( 'Must provide a name for the plugin to be registered' );
    } elseif ( empty( $data['instance'] ) ) {
      throw new Exception( 'Must provide plugin instance for the plugin to be registered' );
    } elseif ( empty( $data['link'] ) ) {
      throw new Exception( 'Must provide a link to a page which instructs the user on how to download the plugin to be registered' );
    } elseif ( empty( $data['version'] ) ) {
      throw new Exception( 'Must provide a version for the plugin to be registered' );
    }

    $this->plugins[ $data['name'] ] = $data;
  }
}

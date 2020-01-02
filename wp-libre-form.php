<?php
/**
 * Plugin name: WP Libre Form
 * Plugin URI: https://github.com/hencca/wp-libre-form
 * Description: A minimal HTML form builder for WordPress; made for developers
 * Version: 1.5.0.3
 * Author: @anttiviljami
 * Author URI: https://github.com/anttiviljami/
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl.html
 * Text Domain: wp-libre-form
 *
 * This plugin is a simple html form maker for WordPress.
 */

/** Copyright 2017 Viljami Kuosmanen

  This program is free software; you can redistribute it and/or modify
  it under the terms of the GNU General Public License, version 3, as
  published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program; if not, write to the Free Software
  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
 */


if ( ! class_exists( 'WP_Libre_Form' ) ) :

define( 'WPLF_VERSION', '1.5.0.1' );

class WP_Libre_Form {
  public static $instance;
  public $plugins;

  public static function init() {
    if ( is_null( self::$instance ) ) {
      self::$instance = new WP_Libre_Form();
    }
    return self::$instance;
  }

  private function __construct() {
    require_once 'classes/class-cpt-wplf-form.php';
    require_once 'classes/class-cpt-wplf-submission.php';
    require_once 'classes/class-wplf-dynamic-values.php';
    require_once 'classes/class-wplf-plugins.php';
    require_once 'inc/wplf-ajax.php';

    // default functionality
    require_once 'inc/wplf-form-actions.php';
    require_once 'inc/wplf-form-validation.php';

    // init our plugin classes
    CPT_WPLF_Form::init();
    CPT_WPLF_Submission::init();
    WPLF_Dynamic_Values::init();

    $this->plugins = WPLF_Plugins::init();

    add_action( 'after_setup_theme', array( $this, 'init_polylang_support' ) );

    add_action( 'plugins_loaded', array( $this, 'load_our_textdomain' ) );

    add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );

    // flush rewrites on activation since we have slugs for our cpts
    register_activation_hook( __FILE__, array( 'WP_Libre_Form', 'flush_rewrites' ) );
    register_deactivation_hook( __FILE__, 'flush_rewrite_rules' );
  }

  /**
   * Plugin activation hook
   */
  public static function flush_rewrites() {
    CPT_WPLF_Form::register_cpt();
    CPT_WPLF_Submission::register_cpt();
    flush_rewrite_rules();
  }

  /**
   * Load our plugin textdomain
   */
  public static function load_our_textdomain() {
    $loaded = load_plugin_textdomain( 'wp-libre-form', false, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
    if ( ! $loaded ) {
      $loaded = load_muplugin_textdomain( 'wp-libre-form', dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
    }
  }

  public function register_rest_routes() {
    register_rest_route( 'wplf/v1', 'submit', [
      'methods' => 'POST',
      'callback' => 'wplf_ajax_submit_handler', // admin-ajax handler, works but...
      // The REST API handbook discourages from using $_POST, and instead use $request->get_params()
    ]);
  }

  /**
   * Enable Polylang support
   */
  public function init_polylang_support() {
    if ( apply_filters( 'wplf_load_polylang', true ) && class_exists( 'Polylang' ) ) {
      require_once 'classes/class-wplf-polylang.php';
      WPLF_Polylang::init();
    }
  }

  /**
   * Public version of wplf_form
   */
  public function wplf_form( $id, $content = '', $xclass = '' ) {
    return CPT_WPLF_Form::wplf_form( $id, $content, $xclass );
  }
}

endif;

/**
 * Expose a global function for less awkward usage
 */
function wplf() {
  // init the plugin
  return WP_Libre_Form::init();
}

wplf();

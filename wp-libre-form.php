<?php
/**
 * Plugin name: WP Libre Form
 * Plugin URI: https://github.com/anttiviljami/wp-libre-form
 * Description: A minimal HTML form builder for WordPress; made for developers
 * Version: 1.2.3
 * Author: @anttiviljami
 * Author URI: https://github.com/anttiviljami/
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl.html
 * Text Domain: wp-libre-form
 *
 * This plugin is a simple html form maker for WordPress.
 */

/** Copyright 2017 Antti Kuosmanen

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

define( 'WPLF_VERSION', '1.2.3' );

class WP_Libre_Form {
  public static $instance;

  public static function init() {
    if ( is_null( self::$instance ) ) {
      self::$instance = new WP_Libre_Form();
    }
    return self::$instance;
  }

  private function __construct() {
    require_once 'classes/class-cpt-wplf-form.php';
    require_once 'classes/class-cpt-wplf-submission.php';
    require_once 'inc/wplf-ajax.php';

    // default functionality
    require_once 'inc/wplf-form-actions.php';
    require_once 'inc/wplf-form-validation.php';

    // init our plugin classes
    CPT_WPLF_Form::init();
    CPT_WPLF_Submission::init();

    add_action( 'after_setup_theme', function() {
      if ( apply_filters( 'wplf_load_polylang', true ) ) {
        require_once 'classes/class-wplf-polylang.php';
        WPLF_Polylang::init();
      }
    } );

    add_action( 'plugins_loaded', array( $this, 'load_our_textdomain' ) );

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

    if( !$loaded ) {
      $loaded = load_muplugin_textdomain( 'wp-libre-form', dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
    }
  }

  /**
   * Public version of wplf_form
   */
  public function wplf_form( $id, $content = '', $xclass = '' ) {
    return CPT_WPLF_Form::wplf_form( $id, $content, $xclass );
  }

  /**
   * Returns the theme's email templates
   *
   * Modified from WP_Theme::get_page_templates
   */
  public function get_email_templates() {
    // If you screw up your current theme and we invalidate your parent, most things still work. Let it slide.
    //if ( $this->errors() && $this->errors()->get_error_codes() !== array( 'theme_parent_invalid' ) )
    //  return array();
    $theme = wp_get_theme();

    $email_templates = wp_cache_get( 'email_copy_templates', 'wplf', false, $email_templates );

    if ( !is_array( $email_templates ) ) {

      $internal_templates_path = plugin_dir_path(__file__) . 'email-templates/';
      $email_templates = array();

      $files = (array) $theme->get_files( 'php', 1, true);

      // include wplf's own templates
      $internal_templates = glob($internal_templates_path . '*.php');
      foreach ($internal_templates as $full_path) {
        $file = basename($full_path);
        // internal templates get prefixed with _wplf.
        // This makes it easy to resolve the full path and if necessary, filter out these from the template selector
        $files['_wplf/' . $file] = $full_path;
      }
      foreach ( $files as $file => $full_path ) {
        if ( ! preg_match( '|Wplf Template Name:(.*)$|mi', file_get_contents( $full_path ), $header ) )
          continue;
        $name = _cleanup_header_comment( $header[1] );
        // Translation support for template name.
        // TODO: Not 100% sure if this is done right.
        $name = __($name, 'wp-libre-form');
        $email_templates[ $file ] = [
          'name' => $name,
          'path' => $full_path,
          'file' => $file
        ];
      }

      wp_cache_set( 'email_copy_templates', $email_templates, 'wplf');
    }
    // TODO: Original WP code had template header translation here. Didn't seem too important
    // in this scenario and frankly I just couldn't be bothered/had more important things to do.
    // But in case someone wants to add and test it, here's the place! :)

    return (array) apply_filters( 'wplf_email_copy_templates', $email_templates );
  }

  /**
  * Substitutes %..% tokens in $string with values with corresponding keys in $data.
  *
  * @param string $string     Input string
  * @param array  $data       Key-value pairs to substitute in $string
  * @param bool   $cleanup    Remove unused tokens at the end
  */
public function substitute($string, $data = array(), $cleanup = true) {
    // Moved and modified from wplf-ajax.php

    preg_match_all('/%(.+?)%/', $string, $toks);
    $toks = array_unique($toks[1]);
    foreach($toks as $tok) {
      $replace = '';
      if( array_key_exists( $tok, $data ) ) {
        $replace = sanitize_text_field( $data[$tok] );
        $string = str_replace('%' . $tok . '%', $replace, $string);
      }
    }

    // cleanup
    if ($cleanup)
      $string = preg_replace('/%.+?%/', '', $string);

    return $string;
  }
}

endif;

// init the plugin
WP_Libre_Form::init();

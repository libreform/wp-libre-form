<?php

/**
 * Plugin name: WP Libre Form
 * Plugin URI: https://github.com/libreform/wp-libre-form
 * Description: A minimal HTML form builder for WordPress; made for developers
 * Version: 2.0.0-alpha
 * Author: Libre Form
 * Author URI: https://github.com/libreform/
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl.html
 * Text Domain: wplf
 *
 */

require_once 'lib/helpers.php';


// phpcs:disable

/**
 * Get WP Libre Form instance. Always use this method to
 * interact with the instance, do not create your own instance.
 */
function libreform(...$params) {
  static $instance;

  if (!$instance) {
    require_once apply_filters('wplfPluginClassLocation', 'classes/class-plugin.php');

    $instance = new WPLF\Plugin(...$params);
  }

  return $instance;
}


[$version] = get_file_data(__FILE__, ['Version']);

$wplf = libreform([
  'dirname' => dirname(plugin_basename(__FILE__)),
  'url' => plugins_url('', __FILE__),
  'version' => $version,
]);

add_action('plugins_loaded', function() use ($wplf) {
  $wplf->initialize();
});

// These will not work inside init, they must be top level: https://developer.wordpress.org/reference/functions/register_activation_hook/
register_activation_hook(__FILE__, [$wplf, 'onActivation']);
register_deactivation_hook(__FILE__, [$wplf, 'onDeactivation']);

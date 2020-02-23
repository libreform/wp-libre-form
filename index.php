<?php
/**
 * Plugin name: WP Libre Form
 * Plugin URI: https://github.com/libreform/wp-libre-form
 * Description: A minimal HTML form builder for WordPress; made for developers
 * Version: 2.0.0
 * Author: Libre Form
 * Author URI: https://github.com/libreform/
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl.html
 * Text Domain: libreform
 *
  */

require_once 'lib/helpers.php';


// phpcs:disable
function libreform(...$params) {

  static $instance;

  if (!$instance) {
    require_once 'classes/class-plugin.php';

    $instance = new WPLF\Plugin(...$params);
  }

  return $instance;
}

function uninstallLibreform() {
  libreform()->onUninstall();
}

[$version] = get_file_data(__FILE__, ['Version']);

// die('/' . dirname(plugin_basename(__FILE__)));
$wplf = libreform([
  // 'dirname' => dirname(plugin_basename(__FILE__)),
  'dirname' => dirname(plugin_basename(__FILE__)),
  'url' => plugins_url('', __FILE__),
  'version' => $version,
]);

register_activation_hook(__FILE__, [$wplf, 'onActivation']);
register_deactivation_hook(__FILE__, [$wplf, 'onDeactivation']);
register_uninstall_hook(__FILE__, 'uninstallLibreform');


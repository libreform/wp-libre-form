<?php

namespace WPLF;

abstract class Module {
  public $core;

  /**
   * Just a bit of magic. Nothing to see here.
   * Basically this is a proxy that lets you write $this->settings instead of $this->core->settings.
   * Do not use the whitelisted names in the module.
   */
  public function __get(string $name) {
    $whitelist = ['addons', 'settings', 'version', 'url', 'dirname'];
    $existsInModule = isset($this->$name);

    log($name . $existsInModule ? 'exists' : 'no');

    if (in_array($name, $whitelist)) {
      if ($existsInModule) {
        throw new \Exception("Ambiguous property name $name, it exists in core and the module");
      }

      return $this->core->$name;
    }
  }

  public function injectCore(Plugin $wplf) {
    $this->core = $wplf;
  }
}

class Plugin {
  public $addons;
  public $settings;

  public $version;
  public $url;
  public $dirname;

  public function __construct($data = []) {
    $this->version = $data['version'] ?? null;
    $this->url = $data['url'] ?? null;
    $this->dirname = $data['dirname'] ?? null;

    $this->loadModule('settings', 'wplfSettings');
    $this->loadModule('form', $this);
    // $this->loadModule('submission', $this);
    // $this->loadModule('selectors', $this);
    $this->loadModule('addons', $this);

    add_action('init', [$this, 'afterInit']);
    add_action('rest_api_init', [$this, 'afterRestApiInit']);
    add_action('after_setup_theme', [$this, 'afterSetupTheme']);

    add_action('admin_scripts', [$this, 'enqueueAdminAssets']);
    add_action('wp_enqueue_scripts', [$this, 'enqueueFrontendAssets']);
  }

  public function afterInit() {
    $path = '/' . $this->dirname . '/assets/lang/'; // Why doesn't this work?
    $success = load_plugin_textdomain('libreform', false, $path);

    if (!$success) {
      $success = load_muplugin_textdomain('libreform', $path);

      if (!$success && isDebug()) {
        log('Failed to load WP Libre Form textdomain' . $path);
      }
    }
  }

  public function afterSetupTheme() {
    $enablePolylangSupport = apply_filters('wplfEnablePolylangSupport', true);

    if ($enablePolylangSupport && class_exists('Polylang')) {
      $this->loadModule('polylang', $this);
    }
  }

  public function afterRestApiInit() {
    $this->loadModule('rest-api', $this);
  }

  public function enqueueAdminAssets() {
    $version = isDebug() ? date('U') : $this->version;
    $isMS = is_multisite();
    $hasUnfiltered = current_user_can('unfiltered_html');

    wp_enqueue_script('wplf-admin', $this->url . '/dist/wplf-admin.js', [], $version, true);
    wp_enqueue_style('wplf-admin', $this->url . '/dist/wplf-admin.js', [], $version);

    wp_localize_script('wplf-admin', 'wplfData', apply_filters('wplfAdminData', [
      // 'dynamic_value_chars' => $this->settings->get('dynval-regex')['chars'],
      'autoinit' => $this->settings->get('autoinit'),
      'parse-wplf-shortcode-rest-api' => $this->settings->get('parse-wplf-shortcode-rest-api'),
      'has_unfiltered_html' => $isMS ? $hasUnfiltered ? 1 : 0 : 1,
    ]));
  }

  public function enqueueFrontendAssets() {
    $version = isDebug() ? date('U') : $this->version;
    $data = apply_filters('wplfFrontendData', [
      'backendUrl' => rest_url('wplf/v2'),
      'fetchCredentials' => 'same-origin', // Send cookies with form
      'request_headers' => (object) apply_filters('wplfSubmissionHeaders', []),
      'assetsDir' => $this->url . 'assets',
      'settings' => [
        'autoinit' => $this->settings->get('autoinit'),
      ],
    ]);

    wp_register_script(
      'wplf-frontend',
      $this->url . '/dist/wplf-frontend.js',
      [], // does not depend on anything, not even jQuery
      $version,
      true
   );

    wp_localize_script('wplf-form-js', 'wplfData', $data);
  }

  /**
   * Plugin activation hook. Must be a static method to work.
   */
  public static function onActivation() {
    isDebug() && log('Activated');
    flush_rewrite_rules();
  }

  /**
   * Plugin deactivation hook. Must be a static method to work.
   */
  public static function onDeactivation() {
    isDebug() && log('Deactivated');
    flush_rewrite_rules();
  }

  /**
   * Plugin uninstall hook. Must be a static method to work.
   * Unreliable, if plugin is uninstalled by removing the files, this will not run.
   */
  public static function onUninstall() {

  }

  /**
   * Modules must be named as class-kebab-case.php, and they must contain a class with the
   * same name in PascalCase: class KebabCase extends X {}
   */
  public function loadModule(string $moduleName, ...$params) {
    $path = "class-$moduleName.php";
    $className = str_replace('-', '', ucwords($moduleName, '_')); // Convert to PascalCase
    $namespacedClassName = "\\WPLF\\$className";

    require_once $path;

    $this->{$moduleName} = new $namespacedClassName($this, ...$params);
  }

  public function render(int $formId, $options = []) {
    return $this->form->render($id, $options);
  }
}

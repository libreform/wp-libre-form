<?php

namespace WPLF;

class Addons extends Module {
  private $plugins = [];

  public function __construct(Plugin $wplf) {
    parent::__construct($wplf);

    add_action('admin_menu', function () {
      add_submenu_page(
          'edit.php?post_type=' . Plugin::$postType,
          __('WP Libre Form addons', 'wplf'),
          __('Addons', 'wplf'),
          'manage_options',
          'wplfAddons',
          array($this, 'renderAdminPage')
      );
    });
  }

  public function __get($key) {
    if (! empty($this->plugins[ $key ])) {
      return $this->plugins[ $key ]['instance'];
    }

    throw new Error('No plugin found with that name');
  }

  private function renderPlugin($plugin = array()) {
    $plugin = $this->fillPluginData($plugin);
    $name = $plugin['name'];
    $version = $plugin['version'];
    $link = $plugin['link'];
    $description = $plugin['description'];
    $settings_page = $plugin['settings_page'];

    $settings_page_presumed_link = false;
    if (gettype($settings_page) === 'string') {
      $settings_page_presumed_link = true;
    }
    ?>

    <article class="wplf-plugin-box">
      <h3><?php echo esc_html($name); ?></h3>
      <div class="wplf-plugin-box__meta">
        <?php if ($version) { ?>
          <span class="wplf-plugin-box__meta--version">
            <?php echo esc_html($version); ?>
          </span>
        <?php } ?>

        <div class="wplf-plugin-box__meta--links">
          <?php if ($link) {
            $link = esc_attr($link);
            ?>
            <a
              href="<?php echo esc_attr($link); ?>"
              class="button button-primary"
              target="_blank"
              rel="noreferrer noopener"
            >
              <?php echo esc_html__('Plugin page', 'wplf'); ?>
            </a>
          <?php } ?>

          <?php if ($settings_page_presumed_link) {
            $settings_page = sanitize_text_field($settings_page);
            ?>
            <a
              href="<?php echo esc_attr($settings_page); ?>"
              class="button button-primary"
              target="_blank"
              rel="noreferrer noopener"
            >
              <?php echo esc_html__('Plugin settings', 'wplf'); ?>
            </a>
          <?php } ?>
        </div>

      </div>
      <p><?php echo esc_html($description); ?></p>
    </article>
    <?php
  }

  public function renderAdminPage() {
    $recommended = $this->get_recommended_plugins();
    $enabled = $this->get_enabled_plugins();
    $plugins_with_options = array_filter(
        $enabled,
        function ($plugin) {
          return ! empty($plugin['settings_page']) && is_callable($plugin['settings_page']);
        }
    );

    ?>
    <div class="wplf-plugins wplf-tabs" data-name="WPLFAddons" data-default="general" data-remember>
      <header class="wplf-plugins-menu">
        <a href="#" class="wplf-tabs__tabSwitcher" data-name="WPLFAddons" data-target="general">
          <?php echo esc_html__('General', 'wplf'); ?>
        </a>

        <?php foreach ($plugins_with_options as $plugin) {
          $name = sanitize_text_field($plugin['name']); ?>

          <a href="#" class="wplf-tabs__tabSwitcher" data-name="WPLFAddons" data-target="<?php echo esc_attr($name); ?>">
            <?php echo esc_html($name); ?>
          </a>
        <?php } ?>
      </header>

      <section class="wplf-tabs__tab" data-name="WPLFAddons" data-tab="general">
        <h1><?php echo esc_html__('WP Libre Form plugins', 'wplf'); ?></h1>
        <p>
          <?=__('The core feature set of WP Libre Form is kept small for multiple reasons, but we understand that sometimes more is more. ', 'wplf')?>
        </p>
        <p>
          <?=__("If the core doesn't offer enough features for you, you can install an addon for more functionality. You could also hire a developer to build you an addon if the one you need doesn't exist yet.", 'wplf')?>
          <?=__("You'll find your active addons below.", 'wplf')?>
        </p>

        <p>
          <?=__("Consult our documentation if you want to build an addon.", 'wplf')?>
        </p>
        <?php if (! empty($enabled)) { ?>
          <h2><?php echo esc_html__('Enabled plugins', 'wplf'); ?></h1>

          <div class="wplf-plugin-list">
            <?php foreach ($enabled as $plugin) {
              $this->renderPlugin($plugin);
            } ?>
          </div>
        <?php } ?>

        <?php if (! empty($recommended)) { ?>
          <h2><?php echo esc_html__('Recommended plugins', 'wplf'); ?></h1>

          <div class="wplf-plugin-list">
            <?php foreach ($recommended as $plugin) {
              $this->renderPlugin($plugin);
            } ?>
          </div>
        <?php } ?>

      </section>

      <?php foreach ($plugins_with_options as $plugin) {
        $name = sanitize_text_field($plugin['name']);
      ?>
      <section class="wplf-tabs__tab" data-name="WPLFAddons" data-tab="<?php echo esc_attr($name); ?>">
        <?php $plugin['settings_page'](); ?>
      </section>
      <?php } ?>
    </div>
    <?php
  }

  private function get_enabled_plugins() {
    return apply_filters('wplf_enabled_plugins', $this->plugins);
  }

  private function get_recommended_plugins() {
    $list = [
      // 'Export' => $this->fillPluginData([
        // 'name' => 'Export',
        // 'link' => 'https://github.com/libreform/export',
        // 'description' => 'Add CSV export functionality.',
      // ]),

    //   'Formbuilder' => $this->fillPluginData(
    //       [
    //       'name' => 'Formbuilder',
    //       'link' => 'https://github.com/k1sul1/wp-libreformbuilder',
    //       'description' => "Writing HTML isn't for everyone. Add a visual builder with this plugin.",
    //        ]
    //  ),
    ];

    // Remove already installed plugins
    $enabled = $this->get_enabled_plugins();
    $list = array_filter(
        $list,
        function ($plugin) use ($enabled) {
          foreach ($enabled as $name => $p) {
            if ($name === $plugin['name']) {
              return false;
            }
          }

          return true;
        }
    );

    return apply_filters('wplf_recommended_plugins', $list);
  }

  /**
   * Helper function to avoid having to !empty() check everything
   *
   * @param array $data
   */
  private function fillPluginData($data = array()) {
    return array_merge(
        array(
        'name' => null,
        'description' => null,
        'instance' => null,
        'version' => null,
        'link' => null,
        'settings_page' => null,
        ),
        $data
    );
  }

  /**
   * Register a plugin for WP Libre Form
   *
   * @param array $data
   */
  public function register($data = array()) {
    $data = $this->fillPluginData($data);

    if (empty($data['name'])) {
      throw new Exception('Must provide a name for the plugin to be registered');
    } elseif (empty($data['instance'])) {
      throw new Exception('Must provide plugin instance for the plugin to be registered');
    } elseif (empty($data['link'])) {
      throw new Exception('Must provide a link to a page which instructs the user on how to download the plugin to be registered');
    } elseif (empty($data['version'])) {
      throw new Exception('Must provide a version for the plugin to be registered');
    }

    $this->plugins[ $data['name'] ] = $data;
  }
}
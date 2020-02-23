<?php

namespace WPLF;

class Settings extends Module {
  private $settings = [];
  private $key;

  private $availableSettings = [
    'parse-wplf-shortcode-rest-api' => [
      'type' => 'select',
      'label' => 'Parse form shortcode in REST API',
      'options' => [
        'false' => 'False',
        'true' => 'True',
      ],
    ],

    'allowDirect' => [
      'type' => 'select',
      'label' => 'Allow direct access to forms',
      'options' => [
        'false' => 'False',
        'true' => 'True',
      ],
    ],

    // Yeah I know checkbox would be better but handling them in forms is a PITA
    'autoinit' => [
      'type' => 'select',
      'label' => 'Initialize forms automatically',
      'options' => [
        'false' => 'False',
        'true' => 'True',
      ],
    ],
  ];

  public function __construct(Plugin $wplf, $key = 'wplfSettings') {
    $this->injectCore($wplf);

    $this->key = $key;
    $this->settings = get_option($this->key, $this->getDefaultSettings());

    add_action('admin_menu', function () {
      add_submenu_page(
          'edit.php?post_type=wplf-form',
          __('WP Libre Form settings', 'libreform'),
          __('Settings', 'libreform'),
          'manage_options',
          $this->key,
          array($this, 'render_settings_page')
     );
    });
  }

  private function getDefaultSettings() {
    return [
      'dynval-regex' => 'recommended',
      'allowDirect' => true,
      'parse-wplf-shortcode-rest-api' => 'true',
      'autoinit' => 'true',
    ];
  }

  private function isValidSetting($setting) {
    return isset($this->availableSettings[$setting]);
  }

  public function get($setting) {
    if ($this->isValidSetting($setting)) {
      $value = $this->settings[$setting];

      if ($value === 'true') {
        return true;
      } elseif ($value === 'false') {
        return false;
      }
    }

    return false;
  }

  public function updateSetting($setting, $value) {
    if (!$this->isValidSetting($setting)) {
      throw new Exception('Invalid WP Libre Form setting');
    }

    $settings = get_option($this->key, $this->getDefaultSettings());
    $settings[$setting] = $value;
    $this->settings = $settings;

    return update_option($this->key, $settings);
  }

  public function render_settings_page() {
    if (!empty($_POST)) {
      // Handle settings form submission

      foreach ($_POST as $k => $v) {
        if ($this->isValidSetting($k)) {
          $this->updateSetting($k, $v);
        }
      }
    }
    ?>

    <form class="wplf-settings" method="post">
      <?php foreach ($this->availableSettings as $setting => $data) {
        switch ($data['type']) {
          case 'select':
            ?>
            <label>
              <strong><?php echo esc_html($data['label']); ?></strong>
              <select name="<?php echo esc_attr($setting); ?>">
                <?php foreach ($data['options'] as $k => $v) { ?>
                  <option value="<?php echo esc_attr($k); ?>" <?php echo $k === $this->settings[$setting] ? 'selected' : ''; ?>><?php echo esc_attr($v); ?></option>
                <?php } ?>
              </select>
            </label>

            <br>
            <?php
                break;

          default:
            // no op
        }
      } ?>

      <input type="submit">
    </form>
    <?php
  }
}

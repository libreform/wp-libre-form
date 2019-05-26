<?php

class WPLF_Settings {
  public static $instance;
  private $settings = [];

  private $available_settings = [
    'dynval-regex' => [
      'type' => 'select',
      'label' => 'Dynamic values regular expression',
      'options' => [
        'legacy' => "Legacy (/%[^%%\n]+%/)",
        'recommended' => 'Recommended (/## \w+ ##/)',
      ],
    ],

    'parse-wplf-shortcode-rest-api' => [
      'type' => 'select',
      'label' => 'Parse form shortcode in REST API',
      'options' => [
        'false' => 'false',
        'true' => 'True',
      ],
    ],

    // Yeah I know checkbox would be better but handling them in forms is a PITA
    'autoinit' => [
      'type' => 'select',
      'label' => 'Initialize forms automatically',
      'options' => [
        'false' => 'false',
        'true' => 'True',
      ],
    ],
  ];

  private function __construct() {
    $this->settings = get_option('wplf-settings', $this->get_default_settings());

    add_action('admin_menu', function () {
      add_submenu_page(
          'edit.php?post_type=wplf-form',
          __('WP Libre Form settings', 'wp-libre-form'),
          __('Settings', 'wp-libre-form'),
          'manage_options',
          'wplf-settings',
          array($this, 'render_settings_page')
      );
    });
  }

  private function get_default_settings() {
    return [
      'dynval-regex' => 'recommended',
      'parse-wplf-shortcode-rest-api' => 'true',
      'autoinit' => 'true',
    ];
  }

  private function is_valid_setting($setting) {
    return isset($this->available_settings[$setting]);
  }

  public function get($setting) {
    if ($this->is_valid_setting($setting)) {
      $value = $this->settings[$setting];

      if ($value === 'true') {
        return true;
      } else if ($value === 'false') {
        return false;
      } else if ($setting === 'dynval-regex') {
        // WP / PHP doesn't allow me to store regular expressions without fucking them up.
        // So I'm not storing them. Spent way too much time trying to get simple things like selected attribute
        // in the options page right, but nah.

        if ($value === 'recommended') {
          return [
            'regex' => '/## \w+ ##/',
            'chars' => '##',
          ];
        } else if ($value === 'legacy') {
          return [
            'regex' => '/%[^%%\n]+%/',
            'chars' => '%',
          ];
        } else {
          throw new Exception('Invalid WP Libre Form dynamic value regular expression');
        }

        return $value;
      }
    }

    return false;
  }

  public function update_setting($setting, $value) {
    if (!$this->is_valid_setting($setting)) {
      throw new Exception('Invalid WP Libre Form setting');
    }

    $settings = get_option('wplf-settings', $this->get_default_settings());
    $settings[$setting] = $value;
    $this->settings = $settings;

    return update_option('wplf-settings', $settings);
  }

  public function render_settings_page() {
    if (!empty($_POST)) {
      // Handle settings form submission

      foreach ($_POST as $k => $v) {
        if ($this->is_valid_setting($k)) {
          $this->update_setting($k, $v);
        }
      }
    }
    ?>

    <form class="wplf-settings" method="post">
      <?php foreach ($this->available_settings as $setting => $data) {
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

  public static function init() {
    if (is_null(self::$instance)) {
      self::$instance = new WPLF_Settings();
    }

    return self::$instance;
  }
}

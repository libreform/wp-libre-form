<?php

namespace WPLF;

class Settings extends Module {
  private $options = [];
  private $key;

  public $settings = [];

  private $availableOptions = [
    'parseLibreformShortcodeInRestApi' => [
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

    // Checkboxes are still a pain in the ass to handle
    'autoinit' => [
      'type' => 'select',
      'label' => 'Initialize forms automatically',
      'options' => [
        'false' => 'False',
        'true' => 'True',
      ],
    ],
  ];

  public function __construct($key = 'wplfSettings') {
    $this->key = $key;
    $this->options = get_option($this->key, $this->getDefaultSettings());

    add_action('admin_menu', function () {
      add_submenu_page(
        'edit.php?post_type=' . Plugin::$postType,
        __('WP Libre Form options', 'wplf'),
        __('Settings', 'wplf'),
        'manage_options',
        $this->key,
        [$this, 'render']
      );
    });
  }

  private function getDefaultSettings() {
    return [
      'allowDirect' => 'true',
      'parseLibreformShortcodeInRestApi' => 'true',
      'autoinit' => 'true',
    ];
  }

  private function isValidSetting($setting) {
    return isset($this->availableOptions[$setting]);
  }

  public function get($setting) {
    if ($this->isValidSetting($setting)) {
      $value = $this->options[$setting];

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

    $options = get_option($this->key, $this->getDefaultSettings());
    $options[$setting] = $value;
    $this->options = $options;

    return update_option($this->key, $options);
  }

  public function render() {
    if (!empty($_POST)) {
      // Handle options form submission

      foreach ($_POST as $k => $v) {
        if ($this->isValidSetting($k)) {
          $this->updateSetting($k, $v);
        }
      }
    }
    ?>

    <form class="wplf-options" method="post">
      <?php foreach ($this->availableOptions as $setting => $data) {
        switch ($data['type']) {
          case 'select': ?>
            <label>
              <strong><?php echo esc_html($data['label']); ?></strong>
              <select name="<?php echo esc_attr($setting); ?>">
                <?php foreach ($data['options'] as $k => $v) {
                  $selected = $this->options[$setting] === $k ? 'selected' : '';
                  $value = esc_attr($k);?>
                  <option value="<?=$value?>" <?=$selected?>>
                    <?php echo esc_attr($v); ?>
                  </option>
                <?php } ?>
              </select>
            </label>

            <br><?php
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

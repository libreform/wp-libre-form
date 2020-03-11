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
        'false' => 'No',
        'true' => 'Yes',
      ],
    ],

    'allowDangerousDelete' => [
      'type' => 'select',
      'label' => 'Allow deleting forms which have submissions',
      'options' => [
        'false' => 'No',
        'true' => 'Yes',
      ],
    ],

    'allowDirect' => [
      'type' => 'select',
      'label' => 'Allow direct access to forms',
      'options' => [
        'false' => 'No',
        'true' => 'Yes',
      ],
    ],

    'autoinit' => [
      'type' => 'select',
      'label' => 'Initialize forms automatically',
      'options' => [
        'false' => 'No',
        'true' => 'Yes',
      ],
    ],

    'historyTableCreated' => [
      'type' => 'hidden',
    ]
  ];

  public function __construct(Plugin $wplf, $key = 'Settings') {
    parent::__construct($wplf);

    $this->key = $key;
    $this->options = $this->io->getOption($this->key, $this->getDefaultSettings());

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
      'allowDangerousDelete' => 'false',
      'parseLibreformShortcodeInRestApi' => 'true',
      'autoinit' => 'true',
      'historyTableCreated' => 'false',
    ];
  }

  private function isValidSetting($setting) {
    return isset($this->availableOptions[$setting]);
  }

  public function get($setting) {
    if ($this->isValidSetting($setting)) {
      $value = $this->options[$setting] ?? null;

      if ($value === 'true') {
        return true;
      } elseif ($value === 'false') {
        return false;
      }
    }

    return false;
  }

  public function set($setting, $value) {
    if (!$this->isValidSetting($setting)) {
      throw new Error('Invalid setting');
    }

    $options = $this->io->getOption($this->key, $this->getDefaultSettings());
    $options[$setting] = $value;
    $this->options = $options;

    return $this->io->setOption($this->key, $options);
  }

  public function render() {
    if (!empty($_POST)) {
      // Handle options form submission

      foreach ($_POST as $k => $v) {
        if ($this->isValidSetting($k)) {
          $this->set($k, $v);
        }
      }
    }
    ?>

    <form class="wplf-options" method="post">
      <h1>
        <?=__('WP Libre Form settings')?>
      </h1>

      <p>
        <?=__('Leave these options alone unless you know what they do. Consult the documentation if necessary.', 'wplf')?>
      </p>

      <?php foreach ($this->availableOptions as $setting => $data) {
        echo '<div class="wplf-formRow">';
        switch ($data['type']) {
          case 'select':
                ?>
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

        echo '</div>';
      } ?>

      <input type="submit" class="button">

    </form>
    <?php
  }
}

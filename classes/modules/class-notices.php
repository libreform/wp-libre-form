<?php

namespace WPLF;

class Notices extends Module {
  private $notices = [];
  private $optionName = 'wplfDismissedNotices';

  public function __construct() {
    add_action('wp', [$this, 'handleDismissal']);
    add_action('admin_notices', [$this, 'render']);
  }

  public function add(string $name, string $content, $options = []) : string {
    $type = $options['type'] ?? 'info';
    $dismissable = $options['dismissable'] ?? false;
    $show = $options['show'] ?? false;

    $this->notices[$name] = compact('content', 'type', 'dismissable', 'show');

    return $name;
  }

  public function show(string $name) {
    $this->notices[$name]['show'] = true;
  }

  public function hide(string $name) {
    $this->notices[$name]['show'] = false;
  }

  public function handleDismissal() {
    $dismiss = $_GET['wplfDismissNotice'] ?? false;

    if ($dismiss) {
      $dismissedNotices = get_option($this->optionName, []);
      $dismissedNotices[] = $dismiss;

      update_option($this->optionName, $dismissedNotices);
    }
  }

  public function render() {
    $dismissedNotices = get_option($this->optionName, []);

    foreach ($this->notices as $name => $data) {
      $type = esc_attr($data['type']);
      $dismissable = $data['dismissable'];
      $content = $data['content'];
      $show = $data['show'];
      $name = esc_attr($name);

      if (!$data['show'] || $dismissed) {
        continue;
      }

      ?>
      <div class="notice notice-<?=$type?> wplf-notice" data-name="<?=$name?>">
        <?=$content?>

        <?php
        echo $content;

        if ($dismissable) {
          echo "<a href='?wplfDismissNotice=$name' aria-label='Dismiss'>";
          echo "&times;";
          echo "</a>";
        }
        ?>
      </div>
      <?php
    }
  }
}

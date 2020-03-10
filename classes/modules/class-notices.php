<?php

namespace WPLF;

class Notices extends Module {
  private $items = [];
  private $optionName = 'DismissedNotices';

  public function __construct() {
    add_action('wp', [$this, 'handleDismissal']);
    add_action('admin_notices', [$this, 'render']);
  }

  public function add(string $name, string $content, $options = []): string {
    $type = $options['type'] ?? 'info';
    $dismissable = $options['dismissable'] ?? false;
    $show = $options['show'] ?? false;

    $this->items[$name] = compact('content', 'type', 'dismissable', 'show');

    return $name;
  }

  public function show(string $name) {
    $this->items[$name]['show'] = true;
  }

  public function hide(string $name) {
    $this->items[$name]['show'] = false;
  }

  public function handleDismissal() {
    $dismiss = $_GET['wplfDismissNotice'] ?? false;

    if ($dismiss) {
      $dismissedNotices = $this->io->getOption($this->optionName, []);
      $dismissedNotices[] = $dismiss;

      $this->io->setOption($this->optionName, $dismissedNotices);
    }
  }

  public function render() {
    $dismissedNotices = $this->io->getOption($this->optionName, []);

    foreach ($this->items as $name => $data) {
      $type = esc_attr($data['type']);
      $dismissable = $data['dismissable'];
      $content = $data['content'];
      $show = $data['show'];
      $name = esc_attr($name);

      if (!$data['show'] || isset($dismissedNotices[$name])) {
        continue;
      }

      ?>
      <div class="notice notice-<?=$type?> wplf-notice" data-name="<?=$name?>">
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

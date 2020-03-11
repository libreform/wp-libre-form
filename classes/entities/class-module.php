<?php

namespace WPLF;

abstract class Module {
  public $core;

  public function __construct(Plugin $wplf, ...$params) {
    $this->injectCore($wplf);
  }

  /**
   * Proxy that lets you write $this->settings etc instead of $this->core->settings.
   * Do not use the whitelisted names in the module.
   */
  public function __get(string $name) {
    $proxylist = [
      'settings',
      'notices',
      'form',
      'io',
      'selectors',
      'addons',
      'restApi',
      'adminInterface',
      'polylang',
      'version',
      'url',
      'dirname'
    ];

    if (in_array($name, $proxylist)) {
      return $this->core->$name;
    }
  }

  private function injectCore(Plugin $wplf) {
    $this->core = $wplf;
  }
}

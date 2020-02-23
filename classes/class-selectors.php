<?php

namespace WPLF;

class Selectors extends Module {
  public function __construct(Plugin $wplf) {
    $this->injectCore($wplf);


  }
}

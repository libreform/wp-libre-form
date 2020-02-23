<?php

namespace WPLF;

class RestApi extends Module {
  public function __construct(Plugin $wplf) {
    $this->injectCore($wplf);
  }
}
<?php

namespace WPLF;

/**
 * Custom exceptions to avoid ambiguity with the standard Exception and to add data to the errors
 */
class Error extends \Exception {
  private $additionalData;

  public function __construct(string $message, ?array $data = null) {
    $this->additionalData = $data;

    parent::__construct($message);
  }

  public function getData() {
    return $this->additionalData;
  }
}

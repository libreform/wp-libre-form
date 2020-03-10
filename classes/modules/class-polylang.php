<?php

namespace WPLF;

class Polylang extends Module {
  protected $strings = [];
  protected $changed = false;
  private $optionName = 'PolylangStrings';

  public function __construct() {
    add_action('admin_init', array($this, 'registerStrings'));
    add_action('pll_language_defined', [$this, 'onLanguageDefined']);
    add_action('shutdown', [$this, 'saveStrings']);
    // pll_init
  }

  public function afterInjectCore(Plugin $wplf) {
    $this->strings = $this->io->getOption($this->optionName, []);

    $wplf->selectors->createSelector(
        'PLL__',
        function ($params = []) use ($wplf) {
          $text = $params[0] ?? null;

          if (!$text) {
            log("No string was provided to PLL__ selector"); // Always log, faulty usage

            return;
          }

          // It's not possible to access this class from the selector directly because PHP scope
          // I declare this as A-OK; thisisfine.jpg
          $wplf->polylang->registerString($text);


          return $this->translate($text);
        },
        [
        'name' => __('Polylang', 'wplf'),
        'description' => __('Translate a string with Polylang.', 'wplf'),
        'usage' => __('Works everywhere. Prefer keywords over sentences in the selector.', 'wplf'),
        'example' => '## PLL__ NameLabel ##',
        ]
    );
  }

  public function onLanguageDefined() {
    add_filter('wplfAdminData', [$this, 'addLangToScripts']);
    add_filter('wplfFrontendData', [$this, 'addLangToScripts']);
  }

  public function addLangToScripts($localizeScriptData = []) {
    $localizeScriptData['lang'] = \pll_current_language(); // Necessary to ensure correct language thank you response

    return $localizeScriptData;
  }

  public function registerStrings() {
    foreach ($this->strings as $string => $null) {
      pll_register_string('WP Libre Form string', $string, 'WP Libre Form');
    }
  }

  public function registerString(string $string): void {
    if (!isset($this->strings[$string])) {
      // Saving the string as the key makes it cheaper to check if the string already exists
      $this->strings[$string] = null;
      $this->changed = true;
    }
  }

  public function saveStrings(): void {
    // Say no to unnecessary DB writes.
    if ($this->changed) {
      $this->io->setOption($this->optionName, $this->strings);
    }
  }

  public function translate($string) {
    if (function_exists('pll__')) {
      return pll__($string, pll_current_language());
    } else {
      return $string;
    }
  }
}

<?php
namespace WPLF;

class Polylang extends Module {
  protected $strings = [];
  private $optionName = 'wplfPolylangStrings';

  public function __construct() {
    add_action('admin_init', array($this, 'registerStrings'));
    add_action('pll_language_defined', [$this, 'onLanguageDefined']);
    add_action('shutdown', [$this, 'saveStrings']);

    $this->strings = get_option($this->optionName, []);

    \libreform()->selectors->createSelector(
      'PLL__',
      function ($params = []) {
        $text = $params[0] ?? null;

        if (!$text) {
          log("No string was provided to PLL__ selector"); // Always log, faulty usage

          return;
        }

        if (is_admin()) {
          // It's not possible to access this class from the selector directly.
          // I declare this as A-OK; thisisfine.jpg
          libreform()->polylang->registerString($text);
        }


        return pll__($text);
      },
      [
        'name' => __('Polylang', 'wplf'),
        'description' => __('Translate a string with Polylang.', 'wplf'),
        'usage' => __('Works everywhere. Prefer using keywords in the selector over full sentences. Example; <code>## PLL__ NameLabel ##</code>', 'wplf'),
      ]
    );
  }

  public function onLanguageDefined() {
    add_filter('wplfAdminData', [$this, 'addLangToScripts']);
    add_filter('wplfFrontendData', [$this, 'addLangToScripts']);
  }

  public function addLangToScripts($localizeScriptData = []) {
    $localizeScriptData['lang'] = \pll_get_current_language();

    return $localizeScriptData;
  }

  public function render_form($form_content) {
    // Get all strings inside double curly braces.
    preg_match_all($this->regular_expression, $form_content, $matches);
    foreach ($matches[0] as $match) {
      // match contains the braces, get rid of them.
      $string = trim(str_replace(array('{', '}'), array('', ''), $match));
      $form_content = str_replace($match, $this->translate($string), $form_content);
    }

    return $form_content;
  }

  public function registerStrings() {
    if (!function_exists('pll_register_string')) {
      log('Polylang module was loaded but pll_register_string does not exist');
      // which would be real fucking weird tbh but it might happen in the future

      return;
    }

    foreach ($this->strings as $string => $null) {
      //
      pll_register_string('WP Libre Form string', $string, 'WP Libre Form');
    }
  }

  public function registerString(string $string) : void {
    $this->strings[$string] = null; // Reusing my "no need for array unique" trick
  }

  public function saveStrings() : void {
    update_option($this->optionName, $this->strings);
  }

  public function translate($string) {
    if (function_exists('pll__')) {
      return pll__($string);
    } else {
      return $string; // Don't kill anything.
    }
  }
}

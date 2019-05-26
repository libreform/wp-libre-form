<?php
if (! class_exists('WPLF_Dynamic_Values')) {
  class WPLF_Dynamic_Values
    {

    public static $instance;

    public static function init(WP_Libre_Form $wplf)
    {
      if (is_null(self::$instance)) {
        self::$instance = new WPLF_Dynamic_Values($wplf);
      }
      return self::$instance;
    }

    /**
     * Hook our actions, filters and such
     */
    public function __construct(WP_Libre_Form $wplf)
    {
      add_filter('wplf_form', array( $this, 'render_form' ), 10, 4);

      $this->wplf = $wplf;
    }

    public function render_form($content, $id, $xclass, $attributes)
    {
      $settings = $this->wplf->settings->get('dynval-regex');

      // Get all strings inside  placeholders
      preg_match_all($settings['regex'], $content, $matches);

      foreach ($matches[0] as $match) {
        // match contains the ## chars, get rid of them.
        $string = trim(str_replace(array( $settings['chars'] ), array( '' ), $match));
        $content = str_replace(
            $match,
            $this->populate_value(
                $string,
                compact('content', 'id', 'xclass', 'attributes')
            ),
            $content
        );
      }

      return $content;
    }

    public static function get_available()
    {
      $register = function ($value, $callback, $labels = array()) use (&$available) {
        if (! is_callable($callback)) {
          throw new Exception('$callback is not callable');
        }

        $available[ $value ] = [
          'callback' => $callback,
          'labels' => array_merge([
            'name' => $value,
            'description' => esc_html__('No description provided', 'wp-libre-form'),
          ], $labels),
        ];

        return $available;
      };

      return apply_filters('wplf_dynamic_values', array_merge(
          $register('USER_ID', 'get_current_user_id', [
          'name' => esc_html__('User ID', 'wp-libre-form'),
          'description' => esc_html__('Get current user ID. Prints 0 if user isn\'t logged in.', 'wp-libre-form'),
          ]),
          $register('USER_EMAIL', function () {
            $user = wp_get_current_user();

            if ($user->ID === 0) {
              return false;
            }

            return $user->user_email;
          }, [
          'name' => esc_html__('User email', 'wp-libre-form'),
          'description' => esc_html__('Get user email, if it exists.', 'wp-libre-form'),
          ]),
          $register('USER_NAME', function () {
            $user = wp_get_current_user();

            if ($user->ID === 0) {
              return false;
            }

            return "{$user->first_name} {$user->last_name}";
          }, [
          'name' => esc_html__('User name', 'wp-libre-form'),
          'description' => esc_html__('Get user name, if it exists.', 'wp-libre-form'),
          ]),
          $register('TIMESTAMP', function () {
            return date('U');
          }, [
          'name' => esc_html__('Timestamp', 'wp-libre-form'),
          'description' => esc_html__(
              'Get UNIX epoch at the time of form render. Can be used to determine how long did it take for the user to fill the form.'
          ),
          ])
      ));
    }

    public function populate_value($string, $data = [])
    {
      $available = self::get_available();

      if (! empty($available[ $string ]) && is_callable($available[ $string ]['callback'])) {
        return $available[ $string ]['callback']($data);
      }
    }
  }
}

<?php
if ( ! class_exists( 'WPLF_Polylang' ) ) {
  class WPLF_Dynamic_Values {

    public static $instance;
    protected $regular_expression = "/%[^%%\n]+%/";

    public static function init() {
      if ( is_null( self::$instance ) ) {
        self::$instance = new WPLF_Dynamic_Values();
      }
      return self::$instance;
    }

    /**
     * Hook our actions, filters and such
     */
    public function __construct() {
      add_filter( 'wplf_form', array( $this, 'render_form' ), 10, 4 );
    }

    public function render_form( $content, $id, $xclass, $attributes ) {
      // Get all strings inside % placeholders
      preg_match_all( $this->regular_expression, $content, $matches );
      foreach ( $matches[0] as $match ) {
        // match contains the % chars, get rid of them.
        $string = trim( str_replace( array( '%' ), array( '' ), $match ) );
        $content = str_replace(
          $match,
          $this->populate_value(
            $string,
            compact( 'content', 'id', 'xclass', 'attributes' )
          ),
          $content
        );
      }

      return $content;
    }

    public function get_available() {
      return apply_filters( 'wplf_dynamic_values', array(
        'USER_ID' => 'get_current_user_id',
        'USER_EMAIL' => function () {
          $user = wp_get_current_user();

          if ( $user->ID === 0 ) {
            return false;
          }

          return $user->user_email;
        },
        'USER_NAME' => function () {
          $user = wp_get_current_user();

          if ( $user->ID === 0 ) {
            return false;
          }

          return "{$user->first_name} {$user->last_name}";
        },
        'TIMESTAMP' => function () {
          return date( 'U' );
        },
      ) );
    }

    public function populate_value( $string, $data = [] ) {
      $available = $this->get_available();

      if ( ! empty( $available[ $string ] ) && is_callable( $available[ $string ] ) ) {
        return $available[ $string ]($data);
      }
    }
  }
}

<?php
if ( ! class_exists( 'WPLF_Polylang' ) ) {
  class WPLF_Polylang {

    public static $instance;
    protected $regular_expression = "/{{[^{}\n]+}}/";
    protected $strings = array();

    public static function init() {
      if ( is_null( self::$instance ) ) {
        self::$instance = new WPLF_Polylang();
      }
      return self::$instance;
    }

    /**
     * Hook our actions, filters and such
     */
    public function __construct() {
      add_filter( 'wplf_form', array( $this, 'render_form' ) );
      add_filter( 'save_post_wplf-form', array( $this, 'save_form' ), 10, 3 );
      add_action( 'after_setup_theme', array( $this, 'register_strings' ) );

      // Earlier than default. User probably wants to filter the translated message.
      add_action( 'wplf_success_message', array( $this, 'render_success_message' ), 9 );
      add_action( 'wplf_save_success_message', array( $this, 'save_success_message' ) );
      add_action( 'wplf_ajax_object', array( $this, 'ajax_object' ) );

      $this->strings = get_option( 'wplf-translation-strings', array() );
      $this->register_strings();
    }

    public function render_form( $form_content ) {
      // Get all strings inside double curly braces.
      preg_match_all( $this->regular_expression, $form_content, $matches );
      foreach ( $matches[0] as $match ) {
        // match contains the braces, get rid of them.
        $string = trim( str_replace( array( '{', '}' ), array( '', '' ), $match ) );
        $form_content = str_replace( $match, $this->translate_string( $string ), $form_content );
      }

      return $form_content;
    }

    public function save_form( $post_id, $post, $update ) {
      unset( $post_id, $update ); // not used here so shut up linter!

      preg_match_all( $this->regular_expression, $post->post_content, $matches );
      if ( ! empty( $matches ) ) {
        foreach ( $matches[0] as $match ) {
          // match contains the braces, get rid of them.
          $string = trim( str_replace( array( '{', '}' ), array( '', '' ), $match ) );
          $this->strings[ $string ] = null;
          // By storing the string as the array key, we don't need to use array_unique.
        }
      }

      update_option( 'wplf-translation-strings', $this->strings ); // Let's be optimistic.
    }

    public function render_success_message( $message ) {
      // Get all strings inside double curly braces.
      preg_match_all( $this->regular_expression, $message, $matches );
      foreach ( $matches[0] as $match ) {
        // match contains the braces, get rid of them.
        $string = trim( str_replace( array( '{', '}' ), array( '', '' ), $match ) );
        $message = str_replace( $match, $this->translate_string( $string ), $message );
      }

      return $message;
    }

    public function save_success_message( $message ) {
      preg_match_all( $this->regular_expression, $message, $matches );
      if ( ! empty( $matches ) ) {
        foreach ( $matches[0] as $match ) {
          // match contains the braces, get rid of them.
          $string = trim( str_replace( array( '{', '}' ), array( '', '' ), $match ) );
          $this->strings[ $string ] = null;
          // By storing the string as the array key, we don't need to use array_unique.
        }
      }

      update_option( 'wplf-translation-strings', $this->strings ); // Let's be optimistic.

      return $message;
    }

    public function ajax_object( $array ) {
      if ( function_exists( 'pll_current_language' ) ) {
        $array['lang'] = pll_current_language();
      } else {
        $array['lang'] = null;
      }
      return $array;
    }

    public function register_strings() {
      foreach ( $this->strings as $string => $value ) {
        $this->register_string( $string );
      }
    }

    public function register_string( $string ) {
      if ( function_exists( 'pll_register_string' ) ) {
        pll_register_string( $string, $string, 'WP Libre Form' );
      }
    }

    public function translate_string( $string ) {
      if ( function_exists( 'pll__' ) ) {
        return pll__( $string );
      } else {
        return $string; // Don't kill anything.
      }
    }
  }
}

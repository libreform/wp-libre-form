<?php
if ( !class_exists( 'WPLF_Polylang' ) ) {
  class WPLF_Polylang {
    /**
     * CPT for the forms
     */
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
    private function __construct() {
      add_filter( 'wplf_form', array( $this, 'render_form' ) );
      add_filter( 'save_post_wplf-form', array( $this, 'save_form' ), 10, 3);
      add_action( 'after_setup_theme', array ( $this, 'register_strings') );

      $this->strings = get_option( 'wplf-translation-strings', array() );
      $this->register_strings();
    }

    public function render_form ( $form_content ) {
      // Get all strings inside double curly braces.
      preg_match_all( $this->regular_expression, $form_content, $matches );
      foreach( $matches[0] as $match ){
        // match contains the braces, get rid of them.
        $string = trim( str_replace( array( "{" , "}" ), array( "", "" ), $match ) );
        $form_content = str_replace( $match, $this->translate_string ( $string ), $form_content );
      }

      return $form_content;
    }

    function save_form ( $post_id, $post, $update ) {
      preg_match_all( $this->regular_expression, $post->post_content, $matches );
      if( !empty( $matches ) ) {
        foreach( $matches[0] as $match ){
          // match contains the braces, get rid of them.
          $string = trim( str_replace( array( "{" , "}" ), array( "", "" ), $match ) );
          $this->strings[$string] = null;
          // By storing the string as the array key, we don't need to use array_unique.
        }
      }

      update_option( 'wplf-translation-strings', $this->strings ); // Let's be optimistic.
    }

    public function register_strings () {
      foreach( $this->strings as $string => $value ) {
        $this->register_string( $string );
      }
    }

    public function register_string ( $string  ) {
      if( function_exists( 'pll_register_string' ) ) {
        pll_register_string( $string, $string, 'WP Libre Form' );
      } else {
        // Don't kill anything.
      }
    }

    public function translate_string ( $string ) {
      if( function_exists( 'pll__' ) ) {
        return pll__( $string );
      } else {
        return $string; // Don't kill anything.
      }
    }
  }
}

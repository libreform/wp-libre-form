<?php

namespace WPLF;

class Plugin {
  // Always loaded in this order
  public $settings;
  public $notices;
  public $form;
  public $submissions;
  public $selectors;
  public $addons;

  // Loaded conditionally
  public $restApi;
  public $adminInterface;
  public $polylang;

  // Passed in the constructor
  public $version;
  public $url;
  public $dirname;

  public static $postType = 'libreform';

  public function __construct($data = []) {
    $this->version = $data['version'] ?? null;
    $this->url = $data['url'] ?? null;
    $this->dirname = $data['dirname'] ?? null;

    require_once 'entities/class-module.php';
    require_once 'entities/class-error.php';
    require_once 'entities/class-form.php';
    require_once 'entities/class-submission.php';

    $this->loadModule('settings', 'wplfSettings');
    $this->loadModule('notices');
    $this->loadModule('submissions');
    $this->loadModule('selectors');
    $this->loadModule('addons');

    add_action('init', [$this, 'afterInit']);
    add_action('admin_init', [$this, 'afterAdminInit']);
    add_action('rest_api_init', [$this, 'afterRestApiInit']);
    add_action('after_setup_theme', [$this, 'afterSetupTheme']);

    add_action('admin_enqueue_scripts', [$this, 'enqueueAdminAssets']);
    add_action('wp_enqueue_scripts', [$this, 'enqueueFrontendAssets']);

    add_shortcode('libreform', [$this, 'shortcode']);

    add_action('init', [$this, 'registerPostType']);
    add_action('wp', [$this, 'preventDirectAccess']);
    add_action('save_post', [$this, 'afterSavePost']); // Save the meta
    add_filter('content_save_pre', '\WPLF\stripFormTags', 10, 1); // Strip form tags from the content, we add our own


    add_action('before_delete_post', [$this, 'beforeDeleteForm']);
    add_action('delete_post', [$this, 'deleteForm']);

    // Change columns in edit.php
    add_filter('manage_edit-' . self::$postType . '_columns', function($columns) {
      // Change columns
      return [
        'cb' => $columns['cb'],
        'title' => $columns['title'],
        'shortcode' => __('Shortcode', 'wplf'),
        'submissions' => __('Submissions', 'wplf'),
        'date' => $columns['date'],
      ];
    }, 100, 1);

    // Change the contents of the columns we just changed
    add_action('manage_' . self::$postType . '_posts_custom_column', function($column, $postId) {
      // Change column contents

      if ($column === 'shortcode') { ?>
        <input type="text" class="code" value='[libreform id="<?php echo intval($post_id); ?>"]' readonly><?php
      }

      if ($column === 'submissions') {
        // count number of submissions
        $submissions = get_posts([
          'post_type' => 'wplf-submission',
          'posts_per_page' => -1,
          'meta_key' => '_form_id',
          'meta_value' => $post_id,
          'suppress_filters' => false,
        ]); ?>

        <a href="<?php echo esc_url_raw(admin_url('edit.php?post_type=wplf-submission&form=' . $post_id)); ?>">
          <?php echo count($submissions); ?>
        </a><?php
      }
    }, 10, 2);

    // If direct access to form is allowed, replace the HTML content with a form
    add_filter('the_content', [$this, 'replaceContentWithFormOnSingleForm'], 0);
  }

  public function afterInit() {
    $path = '/' . $this->dirname . '/assets/lang/'; // Why doesn't this work?
    $success = load_plugin_textdomain('libreform', false, $path);

    if (!$success) {
      $success = load_muplugin_textdomain('libreform', $path);

      if (!$success && isDebug()) {
        // log('Failed to load WP Libre Form textdomain' . $path);
      }
    }
  }

  public function afterSetupTheme() {
    $enablePolylangSupport = apply_filters('wplfEnablePolylangSupport', true);

    if ($enablePolylangSupport && class_exists('Polylang')) {
      $this->loadModule('polylang');
    }
  }

  public function afterRestApiInit() {
    $this->loadModule('rest-api');
  }

  public function afterAdminInit() {
    $this->loadModule('admin-interface');
  }

  public function getLocalizeScriptData(array $additional = []) {
    $isMS = is_multisite();
    $hasUnfiltered = current_user_can('unfiltered_html');

    return array_merge([
      'backendUrl' => rest_url('wplf/v2'),
      'fetchCredentials' => 'same-origin', // Send cookies with form
      'requestHeaders' => (object) apply_filters('wplfSubmissionHeaders', [
        'X-WP-Nonce' =>  wp_create_nonce('wp_rest'),
      ]),
      // 'lang' => $this->polylang ? \pll_current_language() : null,
      'assetsDir' => $this->url . '/assets',
      // 'nonce' =>,
      'settings' => [
        'autoinit' => $this->settings->get('autoinit'),
        'parseLibreformShortcodeInRestApi' => $this->settings->get('parseLibreformShortcodeInRestApi'),
        'hasUnfilteredHtml' => $isMS ? $hasUnfiltered ? 1 : 0 : 1,
        'debugLevel' => isDebug() ? 'all' : 'errors',
      ],
    ], $additional);
  }

  public function enqueueAdminAssets() {
    $version = isDebug() ? date('U') : $this->version;
    $cm = wp_enqueue_code_editor(['type' => 'text/html']);
    $cm = array_replace_recursive($cm, [
      'codemirror' => [
        'theme' => 'monokai',
        'indentUnit' => 2,
        'indentWithTabs' => false, // we're not savages
        'inputStyle' => 'contenteditable',
        'lineNumbers' => false, // Who cares?
        'lint' => false, // The lint is blind to our indentUnit settings and is pretty annoying since it doesn't really help
      ],
    ]);

    wp_enqueue_script('wp-theme-plugin-editor');
    wp_enqueue_style('wp-codemirror');

    wp_enqueue_script('wplf-admin', $this->url . '/dist/wplf-admin.js', [], $version, true);
    wp_enqueue_style('wplf-admincss', $this->url . '/dist/wplf-admin.css', [], $version);

    wp_localize_script('wplf-admin', 'wplfData', apply_filters('wplfAdminData', $this->getLocalizeScriptData(['codeMirror' => $cm])));
  }

  public function enqueueFrontendAssets() {
    $version = isDebug() ? date('U') : $this->version;
    $data = apply_filters('wplfFrontendData', $this->getLocalizeScriptData());

    wp_register_script(
      'wplf-frontend',
      $this->url . '/dist/wplf-frontend.js',
      [], // does not depend on anything, not even jQuery
      $version,
      true
    );
    wp_enqueue_style('wplf-frontend', $this->url . '/dist/wplf-frontend.css', [], $version);
    wp_localize_script('wplf-frontend', 'wplfData', $data);
  }

  /**
   * Plugin activation hook. Must be a static method to work.
   */
  public static function onActivation() {
    isDebug() && log('Activated');
    flush_rewrite_rules();
  }

  /**
   * Plugin deactivation hook. Must be a static method to work.
   */
  public static function onDeactivation() {
    isDebug() && log('Deactivated');
    flush_rewrite_rules();
  }

  /**
   * Plugin uninstall hook. Must be a static method to work.
   * Unreliable, if plugin is uninstalled by removing the files, this will not run.
   */
  public static function onUninstall() {

  }

  /**
   * Modules must be named as class-kebab-case.php, and they must contain a class with the
   * same name in PascalCase: class KebabCase extends X {}
   */
  public function loadModule(string $moduleName, ...$params) {
    $path = "modules/class-$moduleName.php";

    require_once $path;

    $className = str_replace('-', '', ucwords($moduleName, '_')); // Convert to PascalCase
    $instanceVariable = lcfirst($className);
    $namespacedClassName = "\\WPLF\\$className";

    $module = new $namespacedClassName(...$params);
    $module->injectCore($this);

    $this->{$instanceVariable} = $module;
  }

  public function deleteForm($post_id) {
    $post = get_post($post_id);

    if ($post->post_type !== self::$postType) {
      do_action("wplf_deleteForm", $post);
      do_action("wplf_{$post->slug}_deleteForm", $post);
      do_action("wplf_{$post->slug}_deleteForm", $post);

      $this->deleteTransients();
    }
  }

  public function afterSavePost($formId) {
    $form = get_post($formId);

    if ($form->post_type !== Plugin::$postType) {
      return;
    }

    $form = new Form($form);

    // $form->render();

    $nonceExistsAndIsValid = $_POST['wplfSavePostNonce'] ??  wp_verify_nonce($_POST['wplfSavePostNonce']. 'wplfSavePostNonce');
    $currentUserCanEdit = current_user_can('edit_post', $form->ID);
    $isTheRightPostType = $_POST['post_type'] ?? false === self::$postType;
    $hasUnfilteredHtml = !is_multisite() || current_user_can('unfiltered_html');

    if (!$isTheRightPostType || !$nonceExistsAndIsValid || !$currentUserCanEdit) {
      return;
    } else if (!$hasUnfilteredHtml) {
      wp_die(
        '<h1>' . esc_html__('You do not have unfiltered_html capability', 'wplf') . '</h1>' .
        '<p>' . esc_html__('Only Super Admins have unfiltered_html capability by default in WordPress Network.', 'wplf') . '</p>',
        403
      );
    }


    $this->deleteTransients();
    $this->render($form, [], true); // Render in admin context for reasons like Polylang

    // log($_POST['wplfFields'] );

    $form->setAddToMediaLibrary($_POST['wplfAddToMediaLibrary'] ?? 0);
    $form->setThankYouMessage($_POST['wplfThankYou'] ?? __('Success!', 'wplf'));
    $form->setFields($_POST['wplfFields'] ?? '[]');
    $form->setEmailCopyData([
      'enabled' => (bool) ($_POST['wplfEmailCopyEnabled'] ?? false),
      'to' => parseEmailToField($_POST['wplfEmailCopyTo'] ?? ''),
      'from' => sanitize_email($_POST['wplfEmailCopyFrom'] ?? ''),
      'subject' => sanitize_text_field($_POST['wplfEmailCopySubject'] ?? ''),
      'content' => wp_kses_post($_POST['wplfEmailCopyContent'] ?? ''),
    ]);

    /**
     * Typically the format will include characters like <, >, %. Sanitize functions mess up the value.
     * The value is only displayed in the same input that it came from, where it is escaped at runtime.
     */
    $form->setSubmissionTitleFormat($_POST['wplfSubmissionTitleFormat'] ?? null);

    /**
     * We may add a feature that changes how the form behaves. That might forms
     * so this acts as a "feature freeze", giving control of the feature to the user.
     */
    $updateAllowed = $_POST['wplfUpdateVersionCreatedAt'] ?? false === '1';

    if ($updateAllowed) {
      $form->setVersionCreatedAt($this->version);
    }
  }

   /**
   * Pre-populate form editor with default content
   */
  public function defaultContent($content) {
    global $pagenow;

    // only on post.php screen
    if ('post-new.php' !== $pagenow && 'post.php' !== $pagenow) {
      return $content;
    }

    // only for this cpt
    if (isset($_GET['post_type']) && self::$postType === $_GET['post_type']) {
      ob_start();
      $this->printDefaultForm();
      $content = esc_textarea(ob_get_clean());
    }

    return $content;
  }

  public function replaceContentWithFormOnSingleForm($content) {
    $post = get_post();

    if (!isset($post->post_type) || $post->post_type !== self::$postType) {
      return $content;
    }

    $form = new Form($post);
    return $this->render($form, [], true);
  }

  public function preventDirectAccess() {
    if (!is_singular(self::$postType)) {
      return;
    }

    $post = get_post();
    $allowDirect = $this->settings->get('allowDirect');
    $currentUserCanEditForm = current_user_can('edit_post', $post->ID);

    if (!$allowDirect && !$currentUserCanEditForm) {
      global $wp_query;
      $wp_query->set_404();
    }
  }

  public function registerPostType() {
    $args = [
      'labels' => [
        'name' => _x('Forms', 'post type general name', 'wplf'),
        'singular_name' => _x('Form', 'post type singular name', 'wplf'),
        'menu_name' => _x('Forms', 'admin menu', 'wplf'),
        'name_admin_bar' => _x('Form', 'add new on admin bar', 'wplf'),
        'add_new' => _x('New Form', 'form', 'wplf'),
        'add_new_item' => __('Add New Form', 'wplf'),
        'new_item' => __('New Form', 'wplf'),
        'edit_item' => __('Edit Form', 'wplf'),
        'view_item' => __('View Form', 'wplf'),
        'all_items' => __('All Forms', 'wplf'),
        'search_items' => __('Search Forms', 'wplf'),
        'not_found' => __('No forms found.', 'wplf'),
        'not_found_in_trash' => __('No forms found in Trash.', 'wplf'),
      ],
      'public'              => true,
      'publicly_queryable'  => true,
      'exclude_from_search' => true,
      'show_ui'             => true,
      'show_in_menu'        => true,
      'menu_icon'           => 'dashicons-archive',
      'query_var'           => false,
      'capability_type'     => 'post',
      'has_archive'         => false,
      'hierarchical'        => false,
      'menu_position'       => null,
      'rewrite'             => [
        'slug' => 'libreforms',
      ],
      'supports'            => array(
        'title',
        'editor',
        'revisions',
        'custom-fields',
     ),
      'show_in_rest' => true,
    ];

    register_post_type(self::$postType, $args);
  }

  /**
   * Delete all form related transients
   */
  public function deleteTransients() {
    delete_transient('wplf-template-override');
    // delete_transient('' . self::$postType . '-filter');
  }

  public function shortcode($atts, $content = null) {
    $attributes = shortcode_atts([
      'id' => null,
      'class' => '',
    ], $atts, 'wplf');

    // Allow disabling shortcode parsing in API requests.
    $isRest = isRest();
    $parseInApi = $this->settings->get('parseLibreformShortcodeInRestApi');

    // Direct requests should contain it though.
    $isWplfEndpoint = strpos($_SERVER['REQUEST_URI'], '/wp-json/wp/v2/' . self::$postType . '') !== false;

    // Because shortcode parsing can't actually be disabled, we output the "same" shortcode
    // instead of the form. This also normalizes the shortcodes.
    if ($isRest && !$isWplfEndpoint && !$parseInApi) {
      $props = [];

      // If you change how the shortcode is rebuilt,
      // it's a breaking change and must be versioned accordingly.
      foreach ($attributes as $k => $v) {
        $props[] = "$k=\"$v\"";
      }

      return '[libreform ' . join($props, ' ') . ']';
    }

    // we don't render id and class as <form> attributes, unset them with array_diff_key
    $id = $attributes['id'];
    $className = $attributes['classname'] ?? null;

    $attributes = array_diff_key($atts, array(
      'id' => null,
      'classname' => null,
    ));

    // Filter the attributes
    foreach ($attributes as $k => $v) {
      if (is_numeric($k)) {
        unset($attributes[$k]);
        $attributes[$v] = null;
      }
    }

    $form = new Form(get_post($id));

    return $this->render($form, [
      'content' => $content,
      'className' => $className,
      'attributes' => $attributes,
    ]);
  }

  // public function render(int $formId, $options = []) {
  //   wp_enqueue_script('wplf-frontend');

  //   $form = new Form(get_post($formId));
  //   $output = $form->render($options);

  //   return $output;
  // }


  public function render(Form $form, $options = [], $force = false) {
    // Allow rendering even if the form is not published. The custom preview system
    // doesn't trigger is_preview() but it must be able to render.
    if ($form->post_status === 'publish' || !is_preview() || $force) {
      if (!isRest()) {
        wp_enqueue_script('wplf-frontend');
      }

      ob_start();
      $form->render($options);

      $output = ob_get_clean();
      $output = $this->selectors->parse($output, $form, $options);
      $output = apply_filters('wplfAfterRender', $output, $form, $options);
      $output = minifyHtml($output); // Minify after filter, I doubt that anyone want the minified HTML


      return $output;
    }

    log("Form $form->ID is not published");
    return false;
  }
}

<?php

namespace WPLF;

class Submission extends Module {
  public function __construct(Plugin $wplf) {
    $this->injectCore($wplf);

    // init custom post type
    add_action('init', [$this, 'registerCpt']);

    // post.php / post-new.php view
    add_filter('get_sample_permalink_html', [$this, 'modifyPermalinkHtml'], 10, 2);
    add_action('save_post', [$this, 'saveCpt']);
    add_filter('content_save_pre', [$this, 'stripFormTags'], 10, 1);
    add_action('add_meta_boxes', [$this, 'addMetaBoxesCpt']);
    add_action('add_meta_boxes', [$this, 'maybeLoadImportedTemplate'], 10, 2);
    add_action('admin_notices', [$this, 'printNotices'], 10);
    add_action('delete_post', [$this, 'deleteForm']);

    // edit.php view
    add_filter('post_row_actions', [$this, 'removeRowActions'], 10, 2);
    add_filter('manage_edit-wplf-form_columns', [$this, 'customColumnsCpt'], 100, 1);
    add_action('manage_wplf-form_posts_custom_column', [$this, 'customColumnsDisplayCpt'], 10, 2);

    add_filter('default_content', [$this, 'defaultContentCpt']);
    add_filter('user_can_richedit', [$this, 'disableTinymce']);
    add_filter('use_block_editor_for_post_type', [$this, 'disableGutenberg'], 10, 2);

    // front end
    add_shortcode('libreform'', [$this, 'shortcode']);
    add_action('wp', [$this, 'maybeSet_404ForSingleForm']);
    add_filter('the_content', [$this, 'use_shortcode_for_preview'], 0);
    add_action('wp_enqueue_scripts', [$this, 'maybeEnqueueFrontendScript']);

    // default filters for the_content, but we don't want to use actual the_content
    add_filter('wplf_form', 'convert_smilies');
    add_filter('wplf_form', 'convert_chars');
    add_filter('wplf_form', 'shortcode_unautop');

    // we want to keep form content strictly html, so let's remove auto <p> tags
    remove_filter('wplf_form', 'wpautop');
    remove_filter('wplf_form', 'wptexturize');

    // Removing wpautop isn't enough if form is used inside a ACF field or so.
    // Fitting the output to one line prevents <br> tags from appearing.
    add_filter('wplf_form', [$this, 'minifyHtml']);

    // before delete, remove the possible uploads
    add_action('before_delete_post', [$this, 'clean_up_entry']);
  }
}

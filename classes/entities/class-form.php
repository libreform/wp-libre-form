<?php

namespace WPLF;

/**
 */
class Form {
  public int $ID;

  private $raw;

  /**
   * Since it's not possible to extend WP_Post, a bit of magic will do.
   * $this->something will look at this class first, if it doesn't exist, it looks at the WP_Post class
   */
  public function __get(string $name) {
    $existsHere = isset($this->$name) ? $this->$name : false;
    $existsInPost = isset($this->raw->$name) ? $this->raw->$name : false;

    return  $existsHere ?: $existsInPost ?: null;
  }

  public function __construct(\WP_Post $form) {
    $this->ID = $form->ID;
    $this->raw = $form;

    if ($form->post_type !== Plugin::$postType) {
      throw new Error("Post ID {$this->ID} is not a form");
    }

    // $this->content = $form->post_content;
  }

  public function getPost() {
    return $this->raw;
  }

  // without prefix
  public function getDbTable() {
    return "wplf_{$this->ID}_submissions";
  }

  public function getMeta(string $name) {
    // Prefix keys with _ to make them "hidden" and

    return get_post_meta($this->ID, "_wplf" . $name, true);
  }

  public function setMeta(string $name, $data = []) : void {
    update_post_meta($this->ID, "_wplf" . $name, $data);
  }

  public function getFields() : array {
    $data = $this->getMeta('Fields');

    return is_array($data) ? $data : [];
  }

  public function setFields(string $json) : void {
    $fields = json_decode(stripslashes($json));

    foreach ($fields as $name => $data) {
      if ($fields->type === 'file' && $fields->multiple) {
        // Remove brackets from the name
        $fields->name = str_replace('[]', '', $field->name);
      }
    }

    $this->setMeta('Fields', $fields);
  }

  // can't store booleans in postmeta
  public function setAddToMediaLibrary(int $status) : void {
    $this->setMeta('AddToMediaLibrary', $status);
  }

  public function getEmailCopyData() {
    return $this->getMeta('EmailCopy');
  }

  public function setEmailCopyData($data = []) : void {
    $this->setMeta('EmailCopy', $data);
  }

  public function getSubmissionTitleFormat() {
    return $this->getMeta('SubmissionTitleFormat');
  }

  public function setSubmissionTitleFormat(?string $formattedString = '%form-title% #%submission-id%') : void {
    $this->setMeta('SubmissionTitleFormat', $formattedString);
  }

  public function getVersionCreatedAt() {
    return $this->getMeta('VersionCreatedAt');
  }

  public function setVersionCreatedAt(string $version) : void {
    $this->setMeta('VersionCreatedAt', $version);
  }

  public function getThankYouMessage() {
    return $this->getMeta('ThankYou');
  }

  public function setThankYouMessage(string $message) : void {
    $this->setMeta('ThankYou', $message);
  }

  public function render($options = []) {
    // $content = $this->post_content;
    $content = $options['content'] ?? null;
    $attributes = $options['attributes'] ?? [];
    $className = $attributes['class'] ?? null;

    $useFallbackThankYou = (int) ($_GET['wplfFallbackThankYou'] ?? false) === $this->ID;

    if (!$content) {
      $content = $this->post_content;
    }

    $content = shortcode_unautop(convert_chars(convert_smilies($content)));
    $content = apply_filters('wplfBeforeRender', $content, $this->post, $options);

    $this->postContainsFileInputs = ( // faster than regex
      strpos($content, "type='file'") !== false ||
      strpos($content, 'type="file"') !== false ||
      strpos($content, 'type=file') !== false
    );

    $id = intval($this->ID);

    // Filter null values out
    $attributes = array_filter([
      'data-form-id' => $id,
      'tabindex' => '-1',
      'class' => join(' ', array_filter(["wplf", "wplf-$id", $className])),
      'enctype' => $this->postContainsFileInputs ? 'multipart/form-data' : null,
      'method' => 'POST',
      'action' => rest_url('wplf/v2/submit')
    ]);
    ?>

    <form
      <?php
      foreach ($attributes as $attr_name => $attr_value) {
        echo esc_attr($attr_name) . '="' . esc_attr($attr_value) . "\"\n";
      }
      ?>
    >
      <?php

      if ($useFallbackThankYou) { ?>
        <div class="form-notice form-notice__thankyou">
          Fallback
          <?=$this->getThankYouMessage($this->post)?>
        </div><?php
      }

      // This is where we output the user-input form html. We allow all HTML here. Yes, even scripts.
      echo $content;

      // Prove yourself human by NOT filling this field
      ?>
      <div class="wplf-formRow wplf-fcaptcha" aria-hidden="true">
        <label>
          <strong>Prove that you are a human</strong>

          <input type="text" name="_fcaptcha">
        </label>
      </div>
      <?php

      if (is_archive()) {
        global $wp;
        $current_url = home_url($wp->request);

        if (empty(get_option('permalink_structure'))) {
          $current_url = add_query_arg($wp->query_string, '', home_url($wp->request));
        }
        ?>
        <input type="hidden" name="referrer" value="<?php echo esc_attr($current_url); ?>">
        <input type="hidden" name="_referrerId" value="Archive">
        <input type="hidden" name="_referrerArchiveTitle" value="<?php echo esc_attr(get_the_archive_title()); ?>">
        <?php
      } else { ?>
        <input type="hidden" name="referrer" value="<?php the_permalink(); ?>">
        <input type="hidden" name="_referrerId" value="<?php echo esc_attr(get_the_id()); ?>"><?php
      } ?>

      <input type="hidden" name="_fallbackThankYou" value="1">
      <input type="hidden" name="_formId" value="<?=$id?>">
    </form><?php
  }

  public function printDefaultForm() {
    $required = esc_html_x('(required)', 'wplf');
    $defaultName = esc_html_x('John Doe', 'Default placeholder name', 'wplf');
    $nameLabel = esc_html_x('Please enter your name', 'wplf');

    $defaultEmail = esc_html_x('example@email.com', 'Default placeholder email', 'wplf');
    $emailLabel = esc_html_x('Please enter your email address', 'wplf');

    $defaultMessage = esc_html_x('I wanted to ask about...', 'Default placeholder message', 'wplf');
    $messageLabel = esc_html_x('Write your message below', 'wplf');

    $buttonText = esc_html_x('Submit', 'wplf');
    $comment = esc_html_x('Any valid HTML form can be used here!', 'The HTML comment at the end of the example form', 'wplf');

    // Lines must be indented like this to show properly in the editor
    ?>

<div class="wplf-formRow">
  <label for="name">
    <strong><?=$nameLabel?></strong>
    <input type="text" name="name" id="name" placeholder="<?=$defaultName?>">
  </label>

  <label for="email">
    <strong><?=$emailLabel?> <?=$required?></strong>
    <input type="email" name="email" id="email" placeholder="<?=$defaultEmail?>" required>
  </label>
</div>

<div class="wplf-formRow">
  <label for="message">
    <strong><?=$messageLabel?></strong>
    <textarea name="message" rows="5" id="message" placeholder="<?=$defaultMessage ?>" required></textarea>
  </label>
</div>

<div class="wplf-formRow">
  <button type="submit"><?=$buttonText?></button>
</div>

<!-- <?=$comment?> --><?php
  }


  /**
   * Override a form's template with an imported template file.
 *
 * @param string $template_content Raw HTML content to use for the form content.
 * @param int $this->post_id ID of form we're overriding the template for.
 *
 * @return void
  */
  // protected function override_form_template($template_content, $this->post_id) {
  //   $this->maybe_persist_override_template($template_content, $this->post_id);

  //   static $times_content_replaced = 0;

  //   // Make the editor textarea uneditable.
  //   add_filter('the_editor', function ($editor) {
  //     if (! preg_match('%id="wp-content-editor-container"%', $editor)) {
  //       return $editor;
  //     }

  //     $editor = preg_replace('%\<textarea %', '<textarea readonly="readonly" ', $editor);

  //     $notice = _x(
  //         'This form template is being overridden by code, you must edit it in your project code',
  //         'Template override notice in form edit admin view',
  //         'wplf'
  //    );

  //     $notice = sprintf('<div class="wplf-template-override-notice">%s</div>', $notice);

  //     return $notice . $editor;
  //   });

  //   // Custom settings for the form editor.
  //   add_filter('wp_editor_settings', function ($settings, $editor_id) {
  //     if ($editor_id !== 'content') {
  //       return $settings;
  //     }

  //     $settings['tinymce'] = false;
  //     $settings['quicktags'] = false;
  //     $settings['media_buttons'] = false;

  //     return $settings;
  //   }, 10, 2);

  //   // Replace all editor content with template content.
  //   add_filter('the_editor_content', function ($content) use ($template_content, &$times_content_replaced) {
  //     // This is hacky, yes. We only want to override the content for the first
  //     // editor field we come by, meaning 99% of the time we hit the wanted form
  //     // template editor field at the top of the edit view page.
  //     if ($times_content_replaced > 0) {
  //       return $content;
  //     }

  //     $times_content_replaced++;

  //     return $template_content;
  //   });
  // }

  /**
   * Check if we need to auto-persist the form template override into WP database.
   *
   * @param string $template Template to maybe persist.
   * @param int $this->post_id Form ID to persist template for.
   * @param bool $force Force a persist even though not required?
   *
   * @return void
   */
  // protected function maybe_persist_override_template($template, $this->post_id, $force = false) {
  //   $templateHash = md5($template);
  //   $templateTransient = get_transient('wplf-template-override');

  //   if (!$templateTransient) {
  //     $templateTransient = [];
  //   }

  //   $notForcedAndHashNotChanged = (
  //     !$force &&
  //     (isset($templateTransient[$templateHash]) && $templateTransient[$templateHash] === $templateHash)
  //  );

  //   if ($notForcedAndHashNotChanged) {
  //     return;
  //   }

  //   // Safe-guard to prevent accidental infinite loops.
  //   remove_action('save_post', [$this, 'afterSavePost']);

  //   $updated = wp_update_post([
  //     'ID' => (int) $this->post_id,
  //     'post_content' => $template,
  //   ]);

  //   add_action('save_post', [$this, 'afterSavePost']);

  //   if ($updated) {
  //     $transient = array_merge($templateTransient, [$templateHash => date('U')]);

  //     set_transient('wplf-template-override', $transient, HOUR_IN_SECONDS * 8);
  //   }
  // }

}

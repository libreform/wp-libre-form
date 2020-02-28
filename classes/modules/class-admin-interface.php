<?php

namespace WPLF;

class AdminInterface extends Module {
  public function __construct() {
    // Nag if necessary
    add_action('admin_init', [$this, 'registerNotices']);

    // Show sample content so even a HTML impaired user can use the plugin
    add_filter('default_content', [$this, 'defaultContent']);

    // Fancy editors are useless for our cause
    add_filter('user_can_richedit', [$this, 'disableTinymce']);
    add_filter('use_block_editor_for_post_type', [$this, 'disableGutenberg'], 10, 2);

    add_action('edit_form_after_editor', [$this, 'addCustomEditor']);

    /**
     * Do not add more metaboxes unless you have a good reason. Bad UX.
     */
    add_meta_box(
      'wplfFields',
      __('Form Fields Detected', 'wplf'),
      [$this, 'renderFieldsMetabox'],
      Plugin::$postType,
      'side'
    );
  }

  public function registerNotices() {
    $formId = !empty($_GET['post']) ? (int) $_GET['post'] : false;
    $form = get_post($formId);

    if ($form->post_type !== Plugin::$postType) {
      return;
    }

    $form = new Form($form);
    $createdWithVersion = $form->getVersionCreatedAt();
    $unableToEdit = is_multisite() && !current_user_can('unfiltered_html');

    $multisiteInfo1 = esc_html(__(
      'Your site is part of a WordPress Network. Network installations are different from standard WordPress sites, and you need unfiltered_html capability to be able to save anything with HTML.',
      'wplf'
    ));
    $multisiteInfo2 = esc_html(__(
      'You do not have this capability, so to prevent you from accidentally destroying the form, you can\'t save here. Either switch to a user with Super Admin role, or install a plugin like Unfiltered HTML.',
      'wplf'
    ));

    $formVersionUpgradeInfo1 = sprintf(
      esc_html(
        // translators: Placeholders indicate version numbers
        __('This form was created with WPLF version %1$s, and your installed WPLF version is %2$s', 'wplf')
      ),
      esc_html($createdWithVersion),
      esc_html($this->version)
    );

    $formVersionUpgradeInfo2 = esc_html__('There might be new features available, would you like to update the form version?', 'wplf');
    $formVersionUpgradeInfo3 = esc_html__('TYes, update when I save the form', 'wplf');

    $unfilteredHtmlNotice = $this->notices->add(
      'unfilteredHtmlWarning',
      "
      <p>$multisiteInfo1</p>
      <p>$multisiteInfo2</p>

      ",
      ['type' => 'error', 'show' => $unableToEdit]
    );

    $formVersionUpgradeNotice = $this->notices->add(
      'formVersionUpgrade',
      "
      <p>$formVersionUpgradeInfo1</p>
      <p>$formVersionUpgradeInfo2</p>

      <p>
        <label>
          <input type='checkbox' name='wplfFormVersionUpdate' value='1'>
          $formVersionUpgradeInfo3
        </label>
      </p>
      ",
      ['type' => 'info', 'show' => version_compare($createdWithVersion, $this->version, '<')]
    );
  }

  public function disableTinymce($value) {
    if (Plugin::$postType === get_post_type()) {
      return false;
    }

    return $value;
  }

  public function disableGutenberg($value, $post_type) {
    if (Plugin::$postType === $post_type) {
      return false;
    }

    return $value;
  }

  public function renderFieldsMetabox() : void {
    ?>
    <p><?php esc_html_e('Fields marked with * are required', 'wplf'); ?>.</p>

    <div class="wplf-formFields">
      <div class="wplf-formFields__field">
        <strong>Field name</strong>

        <span class="wplf-formFields__field__type">
          <?php esc_html_e('Type: ', 'wplf'); ?>

          <em>text</em>
        </span>

        <span class="wplf-formFields__field__alert" title="Warning" aria-live="alert">!</span>
      </div>

      <!-- Used as JS template, do not add ANYTHING (not even HTML comments) before .wplf-formFields__field -->
    </div>



    <div class="wplf-form-field-container">
    </div>
    <input type="hidden" name="wplfFields" id="wplf_fields">
    <input type="hidden" name="wplf_required" id="wplf_required"><?php
  }

  /**
   * The editor is added under normal content field (which is hidden with CSS)
   * so it overwrites it. thisisfine.jpg
   */
  public function addCustomEditor(\WP_Post $form) : void {
    if ($form->post_type !== Plugin::$postType) {
      return;
    }

    $metaSections = [
      'preview' => [
        'text' => 'Preview',
        'fn' => [$this, 'renderPreview'],
      ],

      'usage' => [
        'text' => 'Usage',
        'fn' => [$this, 'renderUsage']
      ],
      'selectors' => [
        'text' => 'Selectors',
        'fn' => [$this, 'renderSelectors']
      ],
      'submission' => [
        'text' => 'Submissions',
        'fn' => [$this, 'renderSubmissions']
      ],
      'email' => [
        'text' => 'Settings',
        'fn' => [$this, 'renderSettings']
      ],
    ];

    wp_nonce_field('wplfSavePostNonce', 'wplfSavePostNonce');
    ?>

    <div class="wplf">
      <div class="wplf__editor">
        <textarea name="content" class="wplf-cmEditor"><?=($form->post_content)?></textarea>

        <div class="wplf-editor__meta wplf-tabs" data-name="FormEditActiveTab" data-default="<?=array_keys($metaSections)[0]?>" data-remember>
          <header>
            <?php
            foreach ($metaSections as $key => $data) {
              echo "<button type='button' class='wplf-tabs__tabSwitcher' data-name='FormEditActiveTab' data-target='$key'>";
              echo $data['text'];
              echo "</button>";
            }
            ?>
          </header>

          <?php
          foreach ($metaSections as $key => $data) {
            echo "<section class='wplf-tabs__tab' data-name='FormEditActiveTab' data-tab='$key'>";
            $data['fn']();
            echo "</section>";
          }
          ?>
        </div>
      </div>
    </div><?php
  }

  private function renderPreview() : void {
    $form = get_post(); ?>
    <div class="wplf-editor__preview">
      <!-- Updated with JS -->
      <?=$form->post_content?>
    </div><?php
  }


  private function renderUsage() : void {
    $post = get_post(); ?>
    <p>
      <?=esc_html__('Put this shortcode in a post to use the form.', 'wplf')?>
    </p>

    <div class="wplf-formRow">
      <input type="text" class="code" value='[wplf id="<?php echo esc_attr($post->ID); ?>"]' readonly>
    </div>

    <p>
      <?=esc_html__('If you prefer PHP, that works too:', 'wplf')?>
    </p>

    <!-- Ugly but it works as intended -->
    <code>&lt;?php
$form = new \WPLF\Form(get_post(<?=absint($post->ID)?>));
libreform()->render($form); ?&gt;</code>
    <?php
  }

  private function renderSelectors() : void {
    $all = $this->selectors->getAll();
    $tag = $this->selectors->getTemplateTag();
    ?>


    <div class="wplf-selectors">
      <p>
        <?=__('Selectors are special strings that will be replaced with their corresponding values at runtime.', 'wplf')?>
        <?=__('Most selectors work everywhere, while some depend on a spesific context, such as the form submission.', 'wplf')?>
      </p>

      <h3>Usage</h3>

      <p>
        <?=__('Write a selector in the form, thank you message, or even the email copy. ', 'wplf')?>
      </p>

      <h3>Syntax</h3>

      <code>## SELECTOR_NAME OptionalArgument1, OptionalArgument2 ##</code>

      <p>
        <?=__('Selector names are always uppercase alphanumeric strings, and can receive any number of arguments, separated by commas.', 'wplf')?>
        <?=__('The arguments are treated as strings, and are passed into the corresponding selector function.', 'wplf')?>
      </p>

      <?php foreach ($all as $selectorName => $selector) {
        $description = $selector['labels']['description'];
        $usage = $selector['labels']['usage'];

        // Input is trusted and has to be unescaped for formatting to work.
        ?>
        <div class="wplf-selectors__selector">
          <strong><?=esc_html("$tag $selectorName $tag")?></strong>

          <p>
            <?=$description?>
          </p>

          <p>
            <?=$usage?>
          </p>
        </div>
        <?php
      } ?>
    </div>
  <?php
  }

  private function renderSubmissions() : void {
    $form = get_post();
    $form = new Form($form);
    $submissions = $this->submissions->getFormSubmissions($form);

    var_dump($submissions);
     ?>

    <?php

  //  <?php
  }

  private function renderSettings() {
    $form = get_post();
    $form = new Form($form);
    // $meta = get_post_meta($post->ID);
    $siteurl = get_site_url();

    $thankYou = $form->getThankYouMessage();
    $submissionTitleFormat = $form->getSubmissionTitleFormat();

    $emailCopy = $form->getEmailCopyData();
    $enabled = $emailCopy['enabled'] === 1;
    $to = $emailCopy['to'];
    $from = $emailCopy['from'] ?? "wordpress@$siteurl";
    $subject = $emailCopy['subject'];
    $content = $emailCopy['content'];

    $toPlaceholder = esc_attr(get_option('admin_email'));;
    $fromPlaceholder = 'WordPress <wordpress@example.com>';
    $subjectPlaceholder = esc_attr__('[%submission-id%] Submission from %referrer%', 'wplf');
    $contentPlaceholder = esc_attr__('Form %form-title% (ID %form-id%) was submitted with values below', 'wplf') . ': %all-form-data%';
    ?>

    <div class="wplf-addToMediaLibrary">
      <div class="wplf-formRow">
        <label for="wplfAddToMediaLibrary">
          <input
            id="wplfAddToMediaLibrary"
            name="wplfAddToMediaLibrary"
            type="checkbox"
            value="1"
            <?=checked($enabled, true, false)?>
          >
          <?php esc_html_e('Add files to media library', 'wplf'); ?>
        </label>
      </div>
    </div>

    <div class="wplf-emailCopy">
      <div class="wplf-formRow">
        <label for="wplfEmailCopyEnabled">
          <input
            id="wplfEmailCopyEnabled"
            name="wplfEmailCopyEnabled"
            type="checkbox"
            value="1"
            <?=checked($enabled, true, false)?>
          >
          <?php esc_html_e('Send an email copy when a form is submitted?', 'wplf'); ?>

        </label>
      </div>

      <div class="wplf-formRow">
        <p>
          <?php esc_attr_e('You may use any form field values and following global tags: submission-id, referrer, form-title, form-id, user-id, timestamp, datetime, language, all-form-data. All field values and tags should be enclosed in "%" markers.', 'wplf'); ?>
        </p>
      </div>

      <div class="wplf-formRow">
        <label for="wplfEmailCopyTo">
          <strong>
            <?php esc_attr_e('Send copy to', 'wplf'); ?>
          </strong>

          <input
            type="text"
            name="wplfEmailCopyTo"
            value="<?php echo esc_attr($to); ?>"
            placeholder="<?=$toPlaceholder?>"
          >
        </label>
      </div>

      <div class="wplf-formRow">
        <label for="wplfEmailCopyFrom">
          <strong>
            <?php esc_attr_e('Sender email', 'wplf'); ?>
          </strong>

          <input
            type="text"
            name="wplfEmailCopyFrom"
            value="<?php echo esc_attr($from); ?>"
            placeholder="<?=$fromPlaceholder?>"
          >
        </label>
      </div>

      <div class="wplf-formRow">
        <label for="wplfEmailCopySubject">
          <strong>
            <?php esc_attr_e('Subject', 'wplf'); ?>
          </strong>

          <input
            type="text"
            name="wplfEmailCopySubject"
            value="<?php echo esc_attr($submissionTitleFormat); ?>"
            placeholder="<?=$subjectPlaceholder?>"
          >
        </label>
      </div>

      <div class="wplf-formRow">
        <label for="wplfEmailCopyContent">
          <strong>
            <?php esc_attr_e('Content', 'wplf'); ?>
          </strong>

          <textarea
            name="wplfEmailCopyContent"
            placeholder="<?=$contentPlaceholder?>"
            rows="10"
          ><?php echo esc_attr($content); ?></textarea>
        </label>
      </div>
    </div>

    <div class="wplf-thankYou">
      <div class="wplf-formRow">
        <label for="wplfThankYou">
          <strong>
            <?php esc_attr_e('Content to display after succesful form submission', 'wplf'); ?>
          </strong>

          <textarea name="wplfThankYou" class="wplf-cmEditor"><?=$thankYou?></textarea>
        </label>
      </div>
    </div>

    <div class="wplf-submissionTitleFormat">
      <div class="wplf-formRow">
        <label for="wplfThankYou">
          <strong>
            <?php esc_attr_e('Submission title format', 'wplf'); ?>
          </strong>

          <input name="wplfSubmissionTitleFormat" value="<?=esc_attr($submissionTitleFormat)?>">

          <p><?php esc_html_e('Submissions from this form will use this formatting in their title.', 'wplf'); ?></p>
          <p><?php esc_html_e('You may use any field values enclosed in "%" markers.', 'wplf'); ?></p>
          <p><?php esc_html_e('In addition, you may use %submission-id%.', 'wplf'); ?></p>
        </label>
      </div>
    </div><?php
  }
}
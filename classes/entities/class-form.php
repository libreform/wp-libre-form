<?php

namespace WPLF;

class Form {
  public $ID;
  public $title;
  public $fields = [];
  public $historyFields = [
    // 'historyId' => [],
    // 'historyId2' => [],
  ];
  public $content = null;
  public $additionalFields; // meta etc
  public $addToMediaLibrary;
  public $versionCreatedAt;

  private $raw;

  /**
   * Since it's not possible to extend WP_Post, a bit of magic will do.
   * $this->something will look at this class first, if it doesn't exist, it looks at the WP_Post class.
   * It's important for the FORM selector.
   */
  public function __get(string $name) {
    $existsHere = isset($this->$name) ? $this->$name : false;
    $existsInPost = isset($this->raw->$name) ? $this->raw->$name : false;

    return  $existsHere ?: $existsInPost ?: null;
  }

  public function __construct(?\WP_Post $form) {
    if (!$form) {
      throw new Error('No post provided');
    } elseif ($form->post_type !== Plugin::$postType) {
      throw new Error("Post ID {$this->ID} is not a form");
    }

    $this->ID = (int) $form->ID;
    $this->title = $form->post_title;
    $this->content = $form->post_content;
    $this->raw = $form;

    $this->fields = $this->getFields();
    $this->additionalFields = $this->getAdditionalFields();
    $this->addToMediaLibrary = $this->getAddToMediaLibraryValue();
    $this->versionCreatedAt = $this->getVersionCreatedAt();
  }

  /**
   * Fields are stored with a prefix to separate user data from core data
   * but we can't show that prefix to the user.
   */
  public function getFieldOriginalName(string $fieldName) {
    return str_replace('field', '', $fieldName);
  }

  /**
   * Get database column name for the field
   */
  public function getFieldColumnName(string $fieldName) {
    return 'field' . ($fieldName);
  }

  /**
   * Get raw WP_Post object that the Form is based on
   */
  public function getPost() {
    return $this->raw;
  }

  /**
   * Get WPLF spesific post meta for this form
   */
  public function getMeta(string $name, $default = null) {
    // Keys are prefixed with _ to make them "hidden"

    return get_post_meta($this->ID, "_wplf" . $name, true) ?? $default;
  }

  /**
   * Set WPLF spesific post meta for this form
   */
  public function setMeta(string $name, $data = []): void {
    update_post_meta($this->ID, "_wplf" . $name, $data);
  }

  public function isSubmissionsTableCreated(): bool {
    return $this->getMeta('DBTableCreated');
  }

  public function setSubmissionsTableCreatedValue(bool $value): void {
    $this->setMeta('DBTableCreated', $value);
  }

  /**
   * Get current HistoryId of the form
   */
  public function getHistoryId(): int {
    return (int) $this->getMeta('HistoryId');
  }

  /**
   * Set current HistoryId of the form
   */
  public function setHistoryId(int $value): void {
    $this->setMeta('HistoryId', $value);
  }

  /**
   * Get form fields, optionally for a spesific HistoryId
   *
   * @todo Move IO operations
   */
  public function getFields(int $historyId = null): array {
    if (!$historyId) {
      $data = $this->getMeta('Fields');
    } else {
      try {
        if (isset($this->historyFields[$historyId])) {
          return $this->historyFields[$historyId];
        }

        $data = libreform()->io->getHistoryFieldsByVersion($this, $historyId);

        // Save for possible later use
        $this->historyFields[$historyId] = $data;
      } catch (Error $e) {
        // As if this will ever happen, but it doesn't hurt to be safe.

        isDebug() && log($e->getMessage());

        $data = [];
      }
    }

    return is_array($data) ? $data : [];
  }

  /**
   * Set form fields for the current HistoryId
   */
  public function setFields(string $json): void {
    $fields = json_decode(stripslashes($json), true);

    $this->setMeta('Fields', $fields);
  }

  /**
   * Set whether file uploads should be added to the media library or not.
   * 0 for no, 1 for yes.
   */
  public function setAddToMediaLibraryValue(int $status): void {
    $this->setMeta('AddToMediaLibrary', $status);
  }

  public function getAddToMediaLibraryValue() {
    return $this->getMeta('AddToMediaLibrary') ?? 0;
  }

  /**
   * Get whether or not unused database columns should be destroyed.
   * 0 for no, 1 for yes.
   */
  public function getDestroyUnusedDatabaseColumnsValue(): int {
    return (int) $this->getMeta('DestroyUnusedDatabaseColumns') ?? 0;
  }

  /**
   * Set whether or not unused database columns should be destroyed.
   * 0 for no, 1 for yes.
   */
  public function setDestroyUnusedDatabaseColumnsValue(int $status): void {
    $this->setMeta('DestroyUnusedDatabaseColumns', $status);
  }

  /**
   * Get email data from the form
   */
  public function getEmailNotificationData() {
    return $this->getMeta('EmailNotification') ?? [];
  }

  /**
   * Set email data for the form
   */
  public function setEmailNotificationData($data = []): void {
    $this->setMeta('EmailNotification', $data);
  }

  public function getSubmissionTitleFormat() {
    return $this->getMeta('SubmissionTitleFormat') ?: '## FORM title ## ### SUBMISSION id ##'; // );
  }

  public function setSubmissionTitleFormat(string $formattedString = ''): void {
    $this->setMeta('SubmissionTitleFormat', $formattedString);
  }

  /**
   * Get the version of WPLF of which was used when this form was created, or last updated.
   */
  public function getVersionCreatedAt() {
    return $this->getMeta('VersionCreatedAt');
  }

  /**
   * Set the version of WPLF of which was used when this form was created, or last updated.
   */
  public function setVersionCreatedAt(string $version): void {
    $this->setMeta('VersionCreatedAt', $version);
  }

  /**
   * Get message shown after a succesful submission
   */
  public function getSuccessMessage() {
    return $this->getMeta('ThankYou') ?: '<p>' . __('Form submitted succesfully. \n\n ## SUBMISSION ##', 'wplf') . '</p>';
  }

    /**
   * Get message shown after a succesful submission
   */
  public function setSuccessMessage(string $message): void {
    $this->setMeta('ThankYou', $message);
  }

  public function isPublished() {
    return $this->post_status === 'publish';
  }

  public function getRenderOptions($settings = []) {
    $defaults = [
      'attributes' => [],
      'printAdditionalFields' => true,
      'content' => apply_filters('wplfImportFormTemplate', $this->content, $this),
      'className' => null,
      'renderNoJsFallback' => false, // When true, will show the success message above the form.
    ];

    return array_replace_recursive($defaults, $settings);
  }

  public function render($options = [], Submission $submission = null) {
    $options = $this->getRenderOptions($options);
    $submission = apply_filters('wplfFormRenderSubmission', $submission, $this, $options);
    $content = $options['content'];
    $attributes = $options['attributes'];
    $className = $options['className'];
    $renderNoJsFallback = $options['renderNoJsFallback'];
    $printAdditionalFields = $options['printAdditionalFields'];

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
      <?php foreach ($attributes as $attr_name => $attr_value) {
        echo esc_attr($attr_name) . '="' . esc_attr($attr_value) . "\"\n";
      } ?>
    >
      <?php

      if ($renderNoJsFallback) { ?>
        <div class="form-notice form-notice__thankyou wplf-submitfallback">
          <?=libreform()->selectors->parse($this->getSuccessMessage(), $this, $submission); ?>
        </div><?php
      }

      // This is where we output the user-input form html. We allow all HTML here. Yes, even scripts.
      echo $content;

      if ($printAdditionalFields) {
      // Prove yourself human by NOT filling this field
      ?>
        <div class="wplf-formRow wplf-fcaptcha" aria-hidden="true">
          <label>
            <strong>Prove that you are a human</strong>

            <input type="text" name="_fcaptcha">
          </label>
        </div>

        <?php
        $isArchive = is_archive();
        $referrerData = $isArchive ? [
          'type' => 'archive',
          'title' => get_the_archive_title(),
          'url' => currentUrl(),
        ] : [
          'type' => 'singular',
          'id' => get_the_ID(),
          'url' => currentUrl(),
        ]; ?>

        <input type="hidden" name="_referrerData" value='<?=json_encode($referrerData)?>'>
        <input type="hidden" name="_nojs" value="1">
        <input type="hidden" name="_formId" value="<?=$id?>">
        <?php
      }
      ?>
    </form><?php
  }

  /**
   * Get list of fields which names are already used. These fields
   * are handled differently than the rest of the submission, and are not added to the database
   * by default. Feel free to add your own if you must but I suggest using hidden fields instead.
   */
  public function getAdditionalFields() {
    $defaults = ['_fcaptcha', '_referrerData', '_nojs', '_formId', 'lang'];

    return apply_filters('wplfAdditionalFields', $defaults, $this);
  }

  public static function printDefaultForm() {
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
}

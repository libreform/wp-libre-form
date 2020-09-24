<?php

namespace WPLF;

class Submission {
  public $ID;
  private $form;
  private $fields = [];
  private $meta = [];
  private $rawData;

  public function __construct(Form $form, ?array $data = null) {
    $this->form = $form;
    $this->ID = $data['id'] ?? null;

    if ($data) {
      $this->rawData = $data;

      foreach ($this->rawData as $name => $v) {
        if (strpos($name, 'field') === 0) {
          // All form fields are saved to the database as columns,
          // using field{$name} as the name.
          $this->fields[$this->form->getFieldOriginalName($name)] = $v;
        } else {
          // Other columns in the table are metadata
          $this->meta[$name] = $v;
        }
      }
    }
  }

  public function getField(string $fieldName) {
    return $this->fields[$fieldName] ?? null;
  }

  public function getFields() {
    return $this->fields;
  }

  public function getMeta() {
    return $this->meta;
  }

  public function delete($removeUploads = true) {
    $fields = $this->getFields();

    foreach ($fields as $k => $data) {
      $type = $data['type'];

      if ($removeUploads && $type === 'file') {
        $path = $data['path'];

        if (!$this->io->deleteFile($path)) {
          isDebug() && log("Unable to delete file $path");
        }
      } elseif ($removeUploads && $type === 'attachment') {
        $id = $data['id'];

        if (!wp_delete_attachment($id, true)) {
          isDebug() && log("Unable to delete attachment $id");
        }
      }
    }

    return $this->io->destroySubmission($this);
  }

  public function create($fields) {
    // $update = isset($this->ID);
    $form = $this->form;

    $fields = apply_filters('wplfFieldsBeforeValidateSubmission', $fields);
    [$valid, $error] = $this->validate($fields);

    if ($error instanceof Error) {
      throw new Error($error->getMessage(), $error->getData());
    }

    $this->fields = apply_filters('wplfFieldsAfterValidateSubmission', $fields);
    $this->ID = libreform()->io->insertSubmission($form, $fields);

    do_action('wplfAfterSubmission', $this);

    if (apply_filters('wplfUseDefaultAfterSubmission', true, $this)) {
      $this->afterSubmission();
    }

    return $this->ID;
  }

  public function afterSubmission() {
    $email = $this->form->getEmailNotification();
    $data = apply_filters('wplfEmailNotificationData', $email, $this);

    if ($data['enabled']) {
      $to = $data['to'];
      $from = $data['from'];
      $subject = $data['subject'];
      $content = $data['content'];

      $headers = apply_filters('wplfEmailNotificationHeaders', [
        'From' => $from,
      ], $this);
      $attachments = apply_filters('wplfEmailNotificationAttachment', [], $this);


      $this->sendEmail($to, $subject, $content, $headers, $attachments);
    }
  }

  public function sendEmail(string $to, string $subject, string $content, array $headers = [], array $attachments = []) {
    // wp_mail hates array keys in headers
    $actualHeaders = [];

    foreach ($headers as $k => $v) {
      $actualHeaders[] = "$k: $v";
    }

    return wp_mail($to, $subject, $content, $actualHeaders, $attachments);
  }

  public function validate($data) {
    $form = $this->form;
    $valid = false;
    $error = null;

    $honeypotEnabled = apply_filters('wplfEnableHoneypot', true, $form);
    $requiredEnabled = apply_filters('wplfEnablRequiredValidation', true, $form);
    $additionalFieldsEnabled = apply_filters('wplfEnableAdditionalFieldsValidation', true, $form);

    try {
      $honeypotEnabled && $this->validateHoneypot($data);
      $requiredEnabled && $this->validateFieldsWithRequired($data);
      $additionalFieldsEnabled && $this->validateAdditionalFields($data);

      do_action('wplfValidateSubmission', $data, $this);

      $valid = true;
    } catch (Error $e) {
      $valid = false;
      $error = $e;
    }

    return [$valid, $error];
  }

  /**
   * Validate that fields with the required attribute
   * are not empty.
   *
   * @todo Check against (possible) pattern attribute
   * @todo Throw Error with (possible) title attribute
   *
   * Todo implementation requires storing the pattern and title attrs in wplfFields.
   */
  public function validateFieldsWithRequired($data): void {
    $form = $this->form;
    $fields = $form->getFields();

    $missing = [];
    foreach ($fields as $field) {
      $required = $field['required'];
      $name = $field['name'];
      $value = $data[$name] ?? false;

      $valueIsEmpty = empty($value);
      // $valueIsArray = !$valueIsEmpty ? is_array($value) : false;
      // $valueIsFileArray = $valueIsArray && isFileArray($value);

      if ($required && $valueIsEmpty) {
        $missing[] = $name;
      }
    }

    if (!empty($missing)) {
      throw new Error(__('Required fields are missing.', 'wplf'), [
        'requiredFields' => $missing,
      ]);
    }
  }

  /**
   * Check for presence of fields that weren't in the form
   * and that be malicious. Additional fields will also throw SQL errors,
   * so we want none.
   */
  public function validateAdditionalFields($data): void {
    $form = $this->form;
    $fields = $form->getFields();

    $formFieldNames = array_map(function ($field) {
      return $field['name'];
    }, $fields);
    $notAllowed = [];
    $whitelist = apply_filters('wplfAllowedFormFields', array_merge($formFieldNames, $form->getAdditionalFields()), $form);

    foreach ($data as $key => $value) {
      $fieldIsWhiteListed = in_array($key, $whitelist);

      if ($fieldIsWhiteListed) {
        continue;
      }

      $notAllowed[] = $key;
    }

    if (!empty($notAllowed)) {
      throw new Error(__('Additional fields are present.', 'wplf'), [
        'additionalFields' => $notAllowed,
      ]);
    }
  }

  /**
   * Ensure that a dumb bot isn't spamming submissions. Error is intentionally vague.
   */
  public function validateHoneypot($data): void {
    if (!empty($data['_fcaptcha'])) {
      do_action('wplfHoneypotTriggered', $data, $this);

      throw new Error('Captcha was wrong', []);
    }
  }
}

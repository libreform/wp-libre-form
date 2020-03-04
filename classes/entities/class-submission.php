<?php

namespace WPLF;

class Submission {
  public int $ID;
  private $form;
  private $fields = [];

  public function __construct(Form $form, ?array $data = null) {
    $this->form = $form;
    // $this->id = $id;

    if ($data) {
      $this->fields = $data;
    }
  }

  public function getField(string $fieldName) {
    return $this->fields[$fieldName] ?? null;
  }

  public function getFields() {
    $additionalFields = $this->form->getAdditionalFields();
    $fields = [];

    /**
     * Filter additional fields out
     */
    foreach ($this->fields as $name => $v) {
      if (!in_array($name, $additionalFields)) {
        $fields[$name] = $v;
      }
    }

    return $fields;
  }

  public function delete($submission, $removeUploads = true) {
    $fields = [];

    foreach ($fields as $k => $data) {
      $type = $data['type'];

      if ($removeUploads && $type === 'file') {
        $path = $data['path'];

        if (!$this->deleteFile($path)) {
          isDebug() && log("Unable to delete file $path");
        }
      } else if ($removeUploads && $type === 'attachment') {
        $id = $data['id'];

        if (!wp_delete_attachment($id, true)) {
          isDebug() && log("Unable to delete attachment $id");
        }
      }
    }
  }

  private function deleteFile($path) {
    return unlink($path);
  }

  public function create($fields) {
    $update = isset($this->ID);
    $form = $this->form;


    // print_r(getUploadedFiles());

    // print_r($data);

    $fields = apply_filters('wplfBeforeCreateSubmission', $fields);
    [$valid, $error] = $this->validate($fields);

    if ($error instanceof Error) {
      throw new Error($error->getMessage(), $error->getData());
    }

    $this->fields = $fields;
    $this->ID = libreform()->database->insertSubmission($form, $fields);

    return $this->ID;
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
   * are not empty
   */
  public function validateFieldsWithRequired($data) : void {
    $form = $this->form;
    $fields = $form->getFields();

    $missing = [];
    foreach ($fields as $field) {
      $required = $field['required'];
      $name = $field['name'];
      $value = $data[$name] ?? false;

      if ($required && empty($value)) {
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
   * and that be malicious
   */
  public function validateAdditionalFields($data) : void {
    $form = $this->form;
    $fields = $form->getFields();

    $formFieldNames = array_map(function($field) {
      // log($field);
      return $field['name'];
    }, $fields);
    $notAllowed = [];

    // log('formfield names');
    // log($formFieldNames);

    // log('data');
    // log($data);

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
   * Ensure that a dumb bot isn't spamming submissions
   */
  public function validateHoneypot($data) : void {
    if (!empty($data['_fcaptcha'])) {
      do_action('wplfHoneypotTriggered', $data, $this);

      throw new Error('Captcha was wrong', []);
    }
  }
}
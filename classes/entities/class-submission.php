<?php

namespace WPLF;

class Submission {
  private $form;
  private $id;

  public function __construct(Form $form, ?int $id = null) {
    $this->form = $form;
    $this->id = $id;
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

  public function create($data) {
    $update = isset($this->id);
    $form = $this->form;


    print_r(getUploadedFiles());

    print_r($data);

    $data = apply_filters('wplfBeforeCreateSubmission', $data);
    [$valid, $error] = $this->validate($data);

    if ($error instanceof Error) {
      throw new Error($error->getMessage(), $error->getData());
    }


    // [$db, $prefix] = db();
    // $query = $db->query($db->prepare($sql, [
    //   'form' => $form->ID

    //   // Consider saving
    //   // 'formFieldsAtTheTime' => ???
    // ]));

    return [
      'id' => 123,
      'data' => $data,
    ];
  }

  public function validate($data) {
    $form = $this->form;
    $valid = false;
    $error = null;

    $honeypotEnabled = apply_filters('wplfEnableHoneypot', true, $form);
    $requiredEnabled = apply_filters('wplfEnableHoneypot', true, $form);
    $additionalFieldsEnabled = apply_filters('wplfEnableHoneypot', true, $form);

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
      $required = $field->required;
      $name = $field->name;
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
      return $field->name;
    }, $fields);
    $notAllowed = [];

    $whitelist = apply_filters('wplfAllowedFormFields', array_merge($formFieldNames, [
      // Core fields
      'referrer',
      '_referrerId',
      '_referrerArchiveTitle',
      '_formId',
      '_fcaptcha',
      '_fallbackThankYou',
      'lang',
    ]), $form);

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
<?php

namespace WPLF;

/**
 * All database and filesystem operations live here. IO operations are expensive,
 * try to avoid making any unnecessary calls. Validate your data before calling IO.
 */
class Io extends Module {
  private $collate;
  private $outputType = \ARRAY_A;
  private $readyToUpload = false;

  public function __construct(Plugin $wplf) {
    parent::__construct($wplf);

    $this->collate = !empty(\DB_COLLATE) ? \DB_COLLATE : 'utf8mb4_unicode_ci';
  }

  /**
   * Function required for uploading files are not loaded by default
   */
  private function loadUploadStuff() {
    require_once(ABSPATH . 'wp-admin/includes/image.php');
    require_once(ABSPATH . 'wp-admin/includes/file.php');
    require_once(ABSPATH . 'wp-admin/includes/media.php');

    $this->readyToUpload = true;
  }

  public function getOption(string $name, $defaultData = null) {
    return get_option("wplf$name", $defaultData);
  }

  public function setOption(string $name, $data = null) {
    return update_option("wplf$name", $data);
  }

  public function getFormSubmissionsTableName(Form $form) {
    [$db, $prefix] = db();
    $name = "{$prefix}wplf_{$form->ID}_submissions";

    return $name;
  }

  public function getHistoryTableName() {
    [$db, $prefix] = db();
    $name = "{$prefix}wplf_history";

    return $name;
  }

  public function updateFormSubmissionsTable(Form $form, ?array $addFields = null, ?array $dropFields = null) {
    if (empty($addFields) && empty($dropFields)) {
      // Nothing to do.

      isDebug() && log('Skipping submission table update');
      return;
    }

    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);

    $addSql = "";
    $dropSql = "";

    $fields = $form->getFields();

    if ($addFields) {
      foreach ($addFields as $field) {
        $name = $field['name'];
        $name = $form->getFieldColumnName($name);
        $fieldDefinition = $this->mapFieldToSqlDefinition($field);

        $addSql = $addSql . "ADD COLUMN `$name` $fieldDefinition, ";
      }
    }


    if ($dropFields) {
      foreach ($dropFields as $field) {
        $name = $field['name'];
        $name = $form->getFieldColumnName($name);

        $dropSql = $dropSql . "DROP COLUMN IF EXISTS `$name`, ";
      }
    }

    $addSql = rtrim($addSql, ', ');
    $dropSql = rtrim($dropSql, ', ');

    $alterQuery = rtrim($dropFields ? "$dropSql, $addSql" : $addSql, ',');

    if (
        !$db->query("
      ALTER TABLE `$tableName` $alterQuery
    ")
    ) {
      throw new Error($db->last_error);
    }

    isDebug() && log("Updated form $form->ID submissions table");
    $this->insertHistoryFields($form);

    return true;
  }

  public function createFormSubmissionsTable(Form $form, $force = false) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);
    $historyTableName = $this->getHistoryTableName();

    if ($force) {
      if (!$db->query("DROP TABLE IF EXISTS `$tableName`;")) {
        throw new Error($db->last_error);
      }
    }

    /**
     * Prevents deletion of forms before all submissions have been deleted
     */
    if (
        !$db->query("
      CREATE TABLE `$tableName` (
        `uuid` varchar(36) DEFAULT UUID(),
        `id` bigint(20) NOT NULL AUTO_INCREMENT,
        `formId` bigint(20) UNSIGNED COMMENT 'Joins with ID in wp_posts',
        `historyId` bigint(20) COMMENT 'Joins with id in wp_wplf_history',
        `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `modified` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        `meta` TEXT,
        `referrerData` TEXT,
        `usedFallback` boolean,
        PRIMARY KEY (`id`),
        INDEX (`uuid`),
        FOREIGN KEY (`formId`) REFERENCES {$prefix}posts(ID) ON DELETE RESTRICT,
        FOREIGN KEY (`historyId`) REFERENCES $historyTableName(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE={$this->collate};
    ")
    ) {
      throw new Error($db->last_error);
    }

    $form->setSubmissionsTableCreatedValue(true);
    $this->insertHistoryFields($form);

    return true;
  }

  public function destroyFormSubmissionsTable(Form $form) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);

    if (!$db->query("DROP TABLE `$tableName`")) {
      throw new Error($db->last_error);
    }

    $form->setSubmissionsTableCreatedValue(false);

    return true;
  }

  public function createHistoryTable($force = false) {
    [$db, $prefix] = db();
    $tableName = $this->getHistoryTableName();

    if ($force) {
      if (!$db->query("DROP TABLE IF EXISTS `$tableName`;")) {
        throw new Error($db->last_error);
      }
    }

    /**
     * Rows are automatically deleted when a form is deleted
     */
    if (
        !$db->query("
      CREATE TABLE `$tableName` (
        `id` bigint(20) NOT NULL AUTO_INCREMENT,
        `formId` bigint(20) UNSIGNED NOT NULL COMMENT 'Joins with ID in wp_posts',
        `fields` LONGTEXT NOT NULL COMMENT 'Fields in JSON form',
        `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `modified` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        FOREIGN KEY (`formId`) REFERENCES {$prefix}posts(ID) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE={$this->collate};
    ")
    ) {
      throw new Error($db->last_error);
    }


    $this->settings->set('historyTableCreated', 'true'); // Converted to boolean true in the other end
    return true;
  }

  public function getFormSubmissions(Form $form, $page = 0, $limit = 500) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);

    $dataQuery = "SELECT * FROM {$tableName} ORDER BY id LIMIT %d OFFSET %d";
    $data = $db->get_results($db->prepare($dataQuery, [$limit, $page * $limit]), $this->outputType);
    $count = $this->getFormSubmissionCount($form);

    $submissions = array_map(function ($data) use ($form) {
      $submission = new Submission($form, $data);

      return $submission;
    }, $data);

    return [
      $submissions,
      (int) $count / $limit, // return amount of pages with the current limit
      (int) $count,
    ];
  }

  public function getFormSubmissionCount(Form $form) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);

    return (int) $db->get_var("SELECT COUNT(*) FROM $tableName");
  }

  /**
   * Get a submission by it's auto incremented ID.
   *
   * Do not EVER expose this function to the world or you're opening yourself to an enumeration attack.
   */
  public function getFormSubmissionById(Form $form, int $id) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);

    $dataQuery = "SELECT * FROM {$tableName} WHERE id = %s LIMIT 1";
    $data = $db->get_row($db->prepare($dataQuery, [$id]), $this->outputType);

    return new Submission($form, $data);
  }

  /**
   * Get a submission by it's UUID, which is generated by (My/Maria)SQL when the submission is created. The risk of enumeration with UUIDs is minimal, although present.
   */
  public function getFormSubmissionByUuid(Form $form, string $uuid) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);

    $dataQuery = "SELECT * FROM {$tableName} WHERE uuid = %s LIMIT 1";
    $data = $db->get_row($db->prepare($dataQuery, [$uuid]), $this->outputType);

    return new Submission($form, $data);
  }


  public function insertHistoryFields(Form $form) {
    [$db, $prefix] = db();
    $tableName = $this->getHistoryTableName($form);

    if ($db->insert($tableName, ['formId' => $form->ID, 'fields' => json_encode($form->getFields())], ['%d', '%s'])) {
      $form->setHistoryId((int) $db->insert_id);

      return $db->insert_id;
    } else {
      throw new Error('Unable to insert history entry!', [$form]);
    }
  }

  function getHistoryFieldsByVersion(Form $form, int $historyVersion) {
    [$db, $prefix] = db();
    $tableName = $this->getHistoryTableName($form);
    $id = (int) $form->ID;
    $res = $db->get_row("SELECT fields FROM $tableName WHERE formId = $id AND id = $historyVersion", $this->outputType);

    if ($res) {
      return json_decode($res['fields'], true);
    } elseif ($db->last_error) {
      throw new Error($db->last_error, [$form]);
    }
  }

  /**
   * Get a (possibly) huge chunk of fields that have existed in the form.
   * This is mainly useful for comparing current fields to previous ones in order to avoid DB conflicts.
   */
  public function getAllHistoryFieldsFormHasEverHad(Form $form) {
    [$db, $prefix] = db();
    $tableName = $this->getHistoryTableName($form);
    $id = (int) $form->ID;
    $res = $db->get_results("SELECT fields FROM $tableName WHERE formId = $id", $this->outputType);
    $historyFields = [];

    if ($res) {
      foreach ($res as $row) {
        $fields = json_decode($row['fields'], true);

        foreach ($fields as $field) {
          $name = $field['name'];
          $historyFields[$name] = array_replace_recursive($historyFields[$name] ?? [], $field);
        }
      }
    } elseif ($db->last_error) {
      throw new Error($db->last_error, [$form]);
    }

    // Casted to object for convenience reasons, JavaScript expects an object, but empty array will convert into an array
    return apply_filters('wplfHistoryFields', (object) $historyFields, $form);
  }

  public function destroyHistoryFields(Form $form) {
    [$db, $prefix] = db();
    $tableName = $this->getHistoryTableName($form);

    if ($db->delete($tableName, ['formId' => $form->ID], ['%d'])) {
      return true;
    } else {
      throw new Error('Unable to destroy history entry!', [$form]);
    }
  }

  public function destroySubmission(Submission $submission) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($submission->form);

    if ($db->delete($tableName, ['id' => $submissionm->ID], ['%d'])) {
      return true;
    } else {
      throw new Error('Unable to destroy submission!', [$form]);
    }
  }


  private function mapFieldToSqlDefinition($field) {
    if (!$field) {
      throw new Error("Invalid field");
    }

    $type = $field['type'];
    $required = $field['required'];
    $multiple = $field['multiple'];
    $definition = "";

    switch ($type) {
      case 'email':
        $definition = $definition . 'VARCHAR(254) ';
            break;

      case 'file':
        if ($multiple) {
          // Separated with commas, any number of URLs or IDs
          $definition = $definition . 'TEXT ';
        } else {
          // Max length for a single URL
          $definition = $definition . 'VARCHAR(2048) ';
        }
            break;

      case 'textarea':
        $definition = $definition . 'LONGTEXT ';
            break;

      default:
        $definition = $definition . 'TEXT ';
            break;
    }

    // This could be enforced on the database level, but it's problematic if the user
    // starts adding the requires AFTER saving once, as the columns can't be changed,
    // only created and dropped.
    // if ($required) {
      // $definition = $definition . 'NOT NULL';
    // }

    return $definition;
  }

  private function mapFieldsToInsertableData(Form $form, array $data) {
    $formFields = $form->getFields();

    $fields = [
      'formId' => ['value' => $form->ID, 'placeholder' => '%d'],
      'historyId' => ['value' => $form->getHistoryId(), 'placeholder' => '%d'],
      'usedFallback' => ['value' => 0, 'placeholder' => '%d'], // boolean in DB
    ];

    foreach ($data as $name => $value) {
      switch ($name) {
        case '_referrerData':
          $fields['referrerData'] = [
            'value' => $value,
            'placeholder' => '%s',
          ];
              break;

        case '_nojs':
          // If the field exists, the fallback was triggered.
          $fields['usedFallback'] = [
            'value' => 1,
            'placeholder' => '%d',
          ];
              break;

        case '_fcaptcha':
          // Discard the value. Validation will prevent this case from happening.
              break;

        case '_formId':
          // Already handled
              break;

        case 'lang':
          // Discard, only used to trigger Polylang
              break;

        default:
          $fields[$form->getFieldColumnName($name)] = [
            'placeholder' => '%s',
            'value' => $value,
          ];
              break;
      }
    }

    $data = [];
    $placeholders = [];

    foreach ($fields as $k => $v) {
      $data[$k] = $v['value'];
      $placeholders[] = $v['placeholder'];
    }

    return [$data, $placeholders];
  }

  private function uploadToMediaLibrary(string $fieldName): int {
    $id = \media_handle_upload($fieldName, 0, [], ['test_form' => false]);

    if (is_wp_error($id)) {
      throw new Error($x->get_error_message());
    }

    return $id;
  }

  private function uploadOutsideMediaLibrary(string $fieldName, $uploadData, Form $form): string {
    $field = findFieldByName($fieldName, $form->getFields());

    if ($uploadData['error']) {
      $number = (int) $uploadData['error'];
      $error = null;

      if ($field['required']) { // If the field is required, always error
        $error = getFileUploadError($number);
      } elseif ($number !== 4) { // Or if the error code is something other than 4 (no file uploaded), which is normal
        $error = getFileUploadError($number);
      } elseif ($number === 4) {
        return '';
      }

      if ($error) {
        throw $error;
      }
    }

    $defaultName = 'lf_' . date('ymdhms') . '-' . $uploadData['name'];
    $name = sanitize_file_name(apply_filters('wplfUploadedFileName', $defaultName, $uploadData, $form));

    $defaultPath = wp_upload_dir()['path'] . '/' . $name;
    $filePath = apply_filters('wplfUploadedFilePath', $defaultPath, $uploadData, $form);

    move_uploaded_file($uploadData['tmp_name'], $filePath);

    return $filePath;
  }

  /**
   * Where do I even start... media_handle_upload does so much stuff
   * that we want, but it operates on the $_FILES global directly. We don't want
   * that but there's nothing we can do about it. It also can't handle multiple files from one input
   * so we have to modify S_FILES ourselves. I seriously hope I'm just using it wrong but with that documentation...
   */
  public function uploadFiles(Form $form, $k, $data) {
    $this->readyToUpload || $this->loadUploadStuff();
    $actualName = $form->getFieldOriginalName($k);
    $addUploadsToMediaLibrary = $form->getAddToMediaLibraryValue();

    // Multiple uploads are in a weird format. Let's normalize them into
    // looking like single uploads.
    $isMultiple = is_array($data['name']);
    $value = "";

    error_log(print_r($data, true));
    error_log(print_r($isMultiple ? 'is multiple' : 'is not multiple', true));

    // Kept for reference, we're doing dirty things to it soon
    $oldSFiles = $_FILES;

    if ($isMultiple) {
      isDebug() && log('handling as multiple files');
      $filenames = $data['name'];

      // variable names must be exactly these or else...
      foreach ($filenames as $i => $name) {
        $type = $data['type'][$i];
        $tmp_name = $data['tmp_name'][$i];
        $error = $data['error'][$i];
        $size = $data['size'][$i];

        $upload = compact("name", "type", "tmp_name", "error", "size");

        if ($addUploadsToMediaLibrary) {
          // Just casually mutating the superglobal, nothing to see here
          $_FILES[$name . $i] = $upload;
          $actualName = $name . $i;

          $value = $value . $this->uploadToMediaLibrary($actualName) . ", ";
        } else {
          $value = $value . $this->uploadOutsideMediaLibrary($actualName, $upload, $form) . ", ";
        }
      }

      // Order has been restored
      $_FILES = $oldSFiles;
      $value = rtrim($value, ", ");
    } else {
      isDebug() && log('handling as single file');

      if ($addUploadsToMediaLibrary) {
        $value = $this->uploadToMediaLibrary($actualName);
      } else {
        $value = $this->uploadOutsideMediaLibrary($actualName, $data, $form);
      }
    }

    return $value;
  }

  public function insertSubmission(Form $form, $validatedFields) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);
    [$data, $placeholders] = $this->mapFieldsToInsertableData($form, $validatedFields);

    error_log(print_r($data, true));

    foreach ($data as $k => $value) {
      // There are restrictions in place preventing users from creating forms with input names
      // like the following; name[subname].

      // That's the only reason we can cut a corner here.
      if (is_array($value)) {
        $data[$k] = $this->uploadFiles($form, $k, $value);
      }
    }

    if ($db->insert($tableName, $data, $placeholders)) {
      return $db->insert_id;
    } else {
      throw new Error('Unable to insert submission!', [$form, $data]);
    }
  }

  /**
   * Used for deleting attachments and the like
   */
  private function deleteFile($path) {
    return unlink($path);
  }
}

// add_action( 'shutdown', function(){
//   foreach( $GLOBALS['wp_actions'] as $action => $count )
//       printf( '%s (%d)' . PHP_EOL, $action, $count );
// });

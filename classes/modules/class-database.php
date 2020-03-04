<?php

namespace WPLF;

class Database extends Module {
  private $collate;
  private $outputType = \ARRAY_A;

  public function __construct() {
    $this->collate = !empty(\DB_COLLATE) ? \DB_COLLATE : 'utf8mb4_unicode_ci';
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

  public function getFormFieldColumnName(string $fieldName) {
    return 'field' . ucfirst($fieldName);
  }

  public function updateFormSubmissionsTable(Form $form, ?array $addFields = null, ?array $dropFields = null) {
    if (empty($addFields) && empty($dropFields)) {
      log('returning early');
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
        $name = $this->getFormFieldColumnName($name);
        $fieldDefinition = $this->mapFieldToSqlDefinition($field);

        $addSql = $addSql . "ADD COLUMN `$name` $fieldDefinition, ";
      }
    }


    if ($dropFields) {
      foreach ($dropFields as $field) {
        $name = $field['name'];
        $name = $this->getFormFieldColumnName($name);

        $dropSql = $dropSql . "DROP COLUMN IF EXISTS `$name`, ";
      }
    }

    $addSql = rtrim($addSql, ', ');
    $dropSql = rtrim($dropSql, ', ');

    $alterQuery = rtrim($dropFields ? "$dropSql, $addSql" : $addSql, ',');

    if (!$db->query("
      ALTER TABLE `$tableName` $alterQuery
    ")) {
      throw new Error($db->last_error);
    }

    log("Updated form $form->ID submissions table");
    $this->insertHistoryFields($form);

    return true;
  }

  public function createFormSubmissionsTable(Form $form, $force = false) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);
    $historyTableName = $this->getHistoryTableName();

    // Columns are added in a subsequent query
    // $fieldSql = "";
    // $fields = $form->getFields();

    // foreach ($fields as $data) {
    //   $name = $data['name'];
    //   $name = $this->getFormFieldColumnName($name);
    //   $fieldDefinition = $this->mapFieldToSqlDefinition($data);

    //   $fieldSql = $fieldSql . "`$name` $fieldDefinition, ";
    // }

    if ($force) {
      if (!$db->query("DROP TABLE IF EXISTS `$tableName`;")) {
        throw new Error($db->last_error);
      }
    }

    /**
     * Prevents deletion of forms before all submissions have been deleted
     */
    if (!$db->query("
      CREATE TABLE `$tableName` (
        `id` bigint(20) NOT NULL AUTO_INCREMENT,
        `formId` bigint(20) UNSIGNED COMMENT 'Joins with ID in wp_posts',
        `historyId` bigint(20) COMMENT 'Joins with id in wp_wplf_history',
        `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `modified` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        `meta` TEXT,
        `referrerData` TEXT,
        `usedFallback` boolean,
        PRIMARY KEY (`id`),
        FOREIGN KEY (`formId`) REFERENCES {$prefix}posts(ID) ON DELETE RESTRICT,
        FOREIGN KEY (`historyId`) REFERENCES $historyTableName(id) ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE={$this->collate};
    ")) {
      throw new Error($db->last_error);
    }

    $form->setTableCreated(true);
    $this->insertHistoryFields($form);

    return true;
  }

  public function dropFormSubmissionsTable(Form $form) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);

    if (!$db->query("DROP TABLE `$tableName`")) {
      throw new Error($db->last_error);
    }

    $form->setTableCreated(false);

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
    if (!$db->query("
      CREATE TABLE `$tableName` (
        `id` bigint(20) NOT NULL AUTO_INCREMENT,
        `formId` bigint(20) UNSIGNED NOT NULL COMMENT 'Joins with ID in wp_posts',
        `fields` LONGTEXT NOT NULL COMMENT 'Fields in JSON form',
        `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
        `modified` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (`id`),
        FOREIGN KEY (`formId`) REFERENCES {$prefix}posts(ID) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE={$this->collate};
    ")) {
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

    $submissions = array_map(function($result) use ($form) {
      $submission = new Submission($form, $result);

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

  public function getFormSubmissionById(Form $form, int $id) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);

    $dataQuery = "SELECT * FROM {$tableName} WHERE id = %s LIMIT 1";
    $data = $db->get_row($db->prepare($dataQuery, [$id]), $this->outputType);

    return new Submission($form, $data);
  }

  public function insertHistoryFields(Form $form) {
    [$db, $prefix] = db();
    $tableName = $this->getHistoryTableName($form);

    if ($db->insert($tableName, ['formId' => $form->ID, 'fields' => json_encode($form->getFields())] , ['%d', '%s'])) {
      $form->setHistoryId((int) $db->insert_id);

      return $db->insert_id;
    } else {
      throw new Error('Unable to insert history entry!', [$form]);
    }
  }

  public function getHistoryFields(Form $form) {
    [$db, $prefix] = db();
    $tableName = $this->getHistoryTableName($form);
    $id = (int) $form->ID;

    $res = $db->get_results("SELECT fields FROM $tableName WHERE formId = $id", $this->outputType);

    if ($res) {
      $combined = [];

      // var_dump($res); die();

      foreach ($res as $row) {
        $combined[] = json_decode($row['fields'], true);
      }

      return array_merge_recursive(...$combined);
      // return $combined;
    } else {
      throw new Error('Unable to select history fields!', [$form]);
    }
  }

  public function destroyHistoryFields(Form $form) {
    [$db, $prefix] = db();
    $tableName = $this->getHistoryTableName($form);

    if ($db->delete($tableName, ['formId' => $form->ID] , ['%d'])) {
      return true;
    } else {
      throw new Error('Unable to insert history entry!', [$form]);
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

    // log('formfields');
    // log($formFields);

    // log('dada');
    // log($data);

    foreach ($data as $name => $value) {

      // $name = $value[$k]['name'];
      // $type = $formFields[$name]['type'];

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
          $fields[$this->getFormFieldColumnName($name)] = [
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

  public function insertSubmission(Form $form, $data) {
    [$db, $prefix] = db();
    $tableName = $this->getFormSubmissionsTableName($form);
    [$data, $placeholders] = $this->mapFieldsToInsertableData($form, $data);


    if ($db->insert($tableName, $data, $placeholders)) {
      return $db->insert_id;
    } else {
      throw new Error('Unable to insert submission!', [$form, $data]);
    }
  }
}

<?php

namespace WPLF;

class Selectors extends Module {
  private $entries = [];
  private $regex = "/##\s([\w_]+)(?(?=\s##)\s##|(\s?[\w\s]+)\s##)/"; // Now supports params after selector; ## USER_NAME Pertti ##"
  private $templateTag = '##';

  public function __construct(Plugin $wplf) {
    parent::__construct($wplf);

    $this->createSelector(
        'FORM',
        function (?array $params, ?Form $form) {
          if (!$form) {
            return false;
          }

          $field = $params[0] ?? null;

          return $form->$field;
        },
        [
        'name' => __('Form', 'wplf'),
        'description' => __('Get a value from the form object. Not to be confused with ## SUBMISSION ##.', 'wplf'),
        'usage' => __('Works everywhere. Useful as the submission title or in an email.', 'wplf'),
        'example' => '## FORM title ##',
        ]
    );

    $this->createSelector(
        'SUBMISSION',
        function (?array $params, ?Form $form, ?Submission $submission) {
          if (!$form || !$submission) {
            return false;
          }

          $field = $params[0] ?? null;

          if ($field === 'id') {
            return $submission->ID;
          } elseif ($field === null) { // Get all
            $fields = $submission->getFields();
            $data = '';

            foreach ($fields as $k => $v) {
              $v = print_r($v, true);
              $data = "{$data}$k: $v\n";
            }

            return $data;
          }

          return $submission->getField($field);
        },
        [
        'name' => __('Submission', 'wplf'),
        'description' => __('Get a value from the submission fields.', 'wplf'),
        'usage' => __('Works in "Thank you!" message and email copy.', 'wplf'),
        'example' => "## SUBMISSION subject ## for single value
## SUBMISSION ## for all values",
        ]
    );


    $this->createSelector(
        'TIMESTAMP',
        function () {
          $user = wp_get_current_user();

          if ($user->ID === 0) {
            return false;
          }

          return "{$user->first_name} {$user->last_name}";
        },
        [
        'name' => __('Timestamp', 'wplf'),
        'description' => __('Get UNIX epoch at the time of form render. Can be used to determine how long did it take for the user to fill the form.', 'wplf'),
        'usage' => __('Works everywhere.', 'wplf'),
        ]
    );

    $this->createSelector(
        'USER_ID',
        function () {
          $user = wp_get_current_user();

          if ($user->ID === 0) {
            return false;
          }

          return $user->ID;
        },
        [
        'name' => __('User ID', 'wplf'),
        'description' => __('Get user ID. Prints 0 if user isn\'t logged in.', 'wplf'),
        'usage' => __('Works everywhere.', 'wplf'),
        ]
    );

    $this->createSelector(
        'USER_EMAIL',
        function () {
          $user = wp_get_current_user();

          if ($user->ID === 0) {
            return false;
          }

          return $user->user_email;
        },
        [
        'name' => __('User email', 'wplf'),
        'description' => __('Get user email, if user is logged in.', 'wplf'),
        'usage' => __('Works everywhere.', 'wplf'),
        ]
    );

    $this->createSelector(
        'USER_NAME',
        function () {
          $user = wp_get_current_user();

          if ($user->ID === 0) {
            return false;
          }

          return "{$user->first_name} {$user->last_name}";
        },
        [
        'name' => __('User name', 'wplf'),
        'description' => __('Get user name, if user is logged in.', 'wplf'),
        'usage' => __('Works everywhere.', 'wplf'),
        ]
    );
  }

  public function getTemplateTag() {
    return $this->templateTag;
  }

  public function createSelector($value, $callback, $labels = []) {
    if (!is_callable($callback)) {
      throw new Error('$callback is not callable');
    }

    $this->entries[$value] = [
      'callback' => $callback,
      'labels' => array_merge([
        'name' => $value,
        'description' => __('No description provided', 'wplf'),
        'usage' => __('No usage instructions provided', 'wplf'),
        'example' => '## ' . $value . ' ##',
      ], $labels),
    ];

    return $this->entries;
  }

  public function getAll() {
    return apply_filters('wplfAllSelectors', $this->entries);
  }

  public function parse(string $content, ?Form $form, ?Submission $submission) {
    $selectors = $this->getAll();
    preg_match_all($this->regex, $content, $hits);

    foreach ($hits[0] as $i => $hit) {
      $selector = $hits[1][$i];
      $params = array_filter(array_map('trim', explode(',', trim($hits[2][$i]))));

      if (!isset($selectors[$selector])) {
        isDebug() && log("Unknown selector $selector");

        continue;
      }

      $content = str_replace(
          $hit,
          $selectors[$selector]['callback'](!empty($params) ? $params : null, $form, $submission),
          $content
      );
    }

    return $content;
  }
}

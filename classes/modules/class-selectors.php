<?php

namespace WPLF;

class Selectors extends Module {
  private $entries = [];
  private $regex = "/##\s([\w_]+)(?(?=\s##)\s##|(\s?[\w\s]+)\s##)/"; // Now supports params after selector; ## USER_NAME Pertti ##"
  private $templateTag = '##';

  public function __construct() {
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
        'description' => __('Get current user ID. Prints 0 if user isn\'t logged in.', 'wplf'),
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
        'description' => __('Get user email, if it exists.', 'wplf'),
      ]
    );

    $this->createSelector(
      'USER_NAME',
      function () {
        $user = wp_get_current_user();

        // log($user);

        if ($user->ID === 0) {
          return false;
        }

        return "{$user->first_name} {$user->last_name}";
      },
      [
        'name' => __('User name', 'wplf'),
        'description' => __('Get user name, if it exists.', 'wplf'),
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
        'description' => __('et UNIX epoch at the time of form render. Can be used to determine how long did it take for the user to fill the form.', 'wplf'),
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
        'usage' => __('No usage instructions provided', 'wplf')
      ], $labels),
    ];

    return $this->entries;
  }

  public function getAll() {
    return apply_filters('wplfAllSelectors', $this->entries);
  }

  public function parse(string $content, ?Form $form, $options = []) {
    $selectors = $this->getAll();
    preg_match_all($this->regex, $content, $hits);

    // log($hits);

    foreach ($hits[0] as $i => $hit) {
      $selector = $hits[1][$i];
      $params = array_map('trim', explode(',', trim($hits[2][$i])));

      // log($selector);
      // log($params);
      // $selector = trim(str_replace([$this->templateTag], [''], $hit)); // Remove whitespace and $templateTag from the value

      $content = str_replace(
        $hit,
        $selectors[$selector]['callback']($params, $form, $options),
        $content
      );
    }

    return $content;
  }
}

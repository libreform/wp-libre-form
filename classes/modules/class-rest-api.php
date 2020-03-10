<?php

namespace WPLF;

class RestApi extends Module {
  public $namespace = 'wplf/v2';

  public function __construct() {
  }

  public function afterInjectCore(Plugin $wplf) {
    $this->registerEndpoints();
  }

  public function registerEndpoints() {
    $this->registerSubmitEndpoint();
    $this->registerSubmissionsEndpoint();
    $this->registerRenderEndpoint();
  }

  public function registerSubmissionsEndpoint() {
    $endpoint = 'submissions'; // Could also accept /submissions/$formId but that has no extra value

    register_rest_route($this->namespace, $endpoint, [
      'callback' => [$this, 'getSubmissions'],
      'methods' => ['GET'],
      'permission_callback' => function () {
        return current_user_can('edit_posts');
      },
    ]);
  }

  public function registerRenderEndpoint() {
    $endpoint = 'render'; // Could also accept /submissions/$formId but that has no extra value

    register_rest_route($this->namespace, $endpoint, [
      'callback' => [$this, 'render'],
      'methods' => ['POST'],
      // 'permission_callback' => function() { return current_user_can('edit_posts'); },
    ]);
  }

  public function registerSubmitEndpoint() {
    $endpoint = 'submit';

    register_rest_route($this->namespace, $endpoint, [
      'callback' => [$this, 'handleSubmission'],
      'methods' => ['GET', 'POST'],
    ]);
  }

  public function getSubmissions($request) {
    $params = $request->get_params();
    $formId = $params['form'] ?? null;
    $page = $params['page'] ?? 1;

    try {
      $form = new Form(get_post($formId));
      [$submissions, $totalPages] = $this->submissions->getFormSubmissions($form);

      $response = new \WP_REST_Response($submissions);
      $response::set_headers(array_merge($response::get_headers(), [
        'X-WP-Total' => count($submissions),
        'X-WP-TotalPages' => $totalPages,
      ]));

      return $response;
    } catch (Error $e) {
      isDebug() && log($e->getMessage());

      return new \WP_REST_Response(['error' => $e->getMessage(), 'data' => $e->getData()], ['status' => 500]);
    }
  }

  public function render($request) {
    $params = $request->get_params();
    $formId = $params['formId'] ?? null;
    $lang = $params['lang'] ?? null;
    $html = $params['content'] ?? null;

    if ($this->polylang && $lang) {
      switch_to_locale(sanitize_text_field($lang));
    }

    try {
      $form = new Form(get_post($formId));
      $html = $this->core->render($form, ['content' => $html, 'printAdditionalFields' => false], true);

      $response = new \WP_REST_Response(['html' => trim($html), 'form' => $form]);

      return $response;
    } catch (Error $e) {
      isDebug() && log($e->getMessage());

      return new \WP_REST_Response(['error' => $e->getMessage(), 'data' => $e->getData()], ['status' => 500]);
    }
  }

  public function handleSubmission($request) {
    $params = $request->get_params();
    $useFallback = isset($params['_fallbackThankYou']); // field is removed with JS
    $formId = $params['_formId'] ?? null;

    try {
      $form = new Form(get_post($formId));
      $submission = new Submission($form);
      $submission->create(array_merge($params, getUploadedFiles() ?? []));

      if ($useFallback) {
        $referrer = $params['referrer'];
        $referrerContainsParams = strpos($referrer, '?');
        $url = $referrer . ($referrerContainsParams ? '&' : '?') . "wplfNoJs=$formId";

        header("Location: $url");
        return;
      }

      $response = new \WP_REST_Response([
        'submission' => $submission,
        'message' => $this->selectors->parse($form->getSuccessMessage(), $form, $submission),
      ]);

      return $response;
    } catch (Error $e) {
      isDebug() && log($e->getMessage());

      if ($useFallback) {
        wp_die(
            '<h1>' . $e->getMessage() . '</h1>' .
            '<p>' . esc_html__('Go back to the previous page and try again.', 'wplf') . '</p>',
            400
        );

        exit;
      }

      return new \WP_REST_Response(['error' => $e->getMessage(), 'data' => $e->getData()], 500);
    }
  }
}

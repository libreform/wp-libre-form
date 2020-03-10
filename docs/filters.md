# WP Libre Form Filters

TODO

classes/class-plugin.php
42:    if (apply_filters('wplfEnablePolylangSupport', true) && class_exists('Polylang')) {
130:      'requestHeaders' => (object) apply_filters('wplfSubmissionHeaders', [
176:    wp_localize_script('wplf-admin', 'wplfData', apply_filters('wplfAdminData', $this->getLocalizeScriptData(['codeMirror' => $cm])));
181:    $data = apply_filters('wplfFrontendData', $this->getLocalizeScriptData());
551:      $output = apply_filters('wplfAfterRender', $output, $form, $options);

classes/entities/class-form.php
154:    $content = apply_filters('wplfBeforeRender', $content, $this->post, $options);
232:    return apply_filters('wplfAdditionalFields', $defaults, $this);

classes/entities/class-submission.php
61:    $fields = apply_filters('wplfFieldsBeforeValidateSubmission', $fields);
68:    $this->fields = apply_filters('wplfFieldsAfterValidateSubmission', $fields);
73:    if (apply_filters('wplfUseDefaultAfterSubmission', true, $this)) {
82:    $data = apply_filters('wplfEmailNotificationData', $email, $this);
90:      $headers = apply_filters('wplfEmailNotificationHeaders', [
93:      $attachments = apply_filters('wplfEmailNotificationAttachment', [], $this);
116:    $honeypotEnabled = apply_filters('wplfEnableHoneypot', true, $form);
117:    $requiredEnabled = apply_filters('wplfEnablRequiredValidation', true, $form);
118:    $additionalFieldsEnabled = apply_filters('wplfEnableAdditionalFieldsValidation', true, $form);
184:    $whitelist = apply_filters('wplfAllowedFormFields', array_merge($formFieldNames, $form->getAdditionalFields()), $form);

classes/modules/class-addons.php
159:    return apply_filters('wplf_enabled_plugins', $this->plugins);
194:    return apply_filters('wplf_recommended_plugins', $list);

classes/modules/class-io.php
269:    return apply_filters('wplfHistoryFields', (object) $historyFields, $form);
426:    $name = sanitize_file_name(apply_filters('wplfUploadedFileName', $defaultName, $uploadData, $form));
429:    $filePath = apply_filters('wplfUploadedFilePath', $defaultPath, $uploadData, $form);

wp-libre-form.php
108:    if ( apply_filters( 'wplf_load_polylang', true ) && class_exists( 'Polylang' ) ) {

classes/modules/class-admin-interface.php
539:              <?=checked(apply_filters('wplfUpgradeFormByFefault', false, $form), true, false)?>

classes/modules/class-selectors.php
160:    return apply_filters('wplfAllSelectors', $this->entries);

classes/class-cpt-wplf-form.php
642:    $template_content = apply_filters( 'wplf_import_html_template', null, $form_id );
782:      $success = apply_filters( 'wplf_save_success_message', $success, $post_id );
901:      $content = apply_filters( "wplf_{$form->post_name}_form", $content );
902:      $content = apply_filters( "wplf_{$form->ID}_form", $content );
905:      $content = apply_filters( 'wplf_form', $content, $id, $xclass, $attributes );
986:      apply_filters( 'wplf_frontend_script_dependencies', array() ),
994:    wp_localize_script( 'wplf-form-js', 'ajax_object', apply_filters( 'wplf_ajax_object', array(
995:      'ajax_url' => apply_filters( 'wplf_ajax_endpoint', "$admin_url?action=wplf_submit" ),
996:      'ajax_credentials' => apply_filters( 'wplf_ajax_fetch_credentials_mode', 'same-origin' ),
997:      'request_headers' => (object) apply_filters( 'wplf_ajax_request_headers', [] ),
1070:    return apply_filters( 'wplf-form-publicly-visible', false, $id );

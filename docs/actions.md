# WP Libre Form Actions

TODO

classes/class-plugin.php
255:      do_action("wplf_beforeDeleteForm", $form, $submissionCount);
307:      do_action("wplf_deleteForm", new Form($post));

classes/entities/class-submission.php
71:    do_action('wplfAfterSubmission', $this);
125:      do_action('wplfValidateSubmission', $data, $this);
208:      do_action('wplfHoneypotTriggered', $data, $this);
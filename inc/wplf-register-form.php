<?php
// A function to register a form in the code.
// 
// Usage:
// 
// function register_libre_forms() {
//     register_libre_form( "slug", [
//         "title" => "Name",
//         "form_html" => "form's html",
//         "emails" => [
//             "first@recipient.com" => [
//                 "title" => "Title",
//                 "content" => "Content."
//             ],
//             "%email%" => [
//                 "title" => "This mail goes to %email%",
//                 "content" => "And contains %content%"
//             ],
//             "with@defaulttemplate.com" => []
//         ],
//         "title_format" => "A submission from %email%",
//         "thank_you" => "thank you html"
//     ]);
// }

function register_libre_form( $name, $args ) {
    // Throw an error if the function is not properly called
    if ( ! post_type_exists( 'wplf-form' ) ) {
        throw new Exception("'register_libre_form' has been called too early. It has to be done inside a hook.");
    } 
    
    if ( ! is_array( $args ) ) {
        throw new Exception("'register_libre_form' must have an array as its argument.");
    }

    if ( ! isset( $args["title"] ) ) {
        throw new Exception("'title' is a mandatory argument for 'register_libre_form'.");
    }

    if ( ! isset( $args["form_html"] ) ) {
        throw new Exception("'form_html' is a mandatory argument for 'register_libre_form'.");   
    }

    // Get fields and required fields from the provided HTML
    $dom = new DOMDocument();
    
    libxml_use_internal_errors( true );

    $dom->loadHTML( $args["form_html"] );

    libxml_clear_errors();

    $xpath = new DOMXPath( $dom );

    $elements = $xpath->query("//input|select|textarea");

    $fields = [];
    $required = [];

    foreach ( $elements as $element ) {
        $fields[] = $element->getAttribute("name");

        if ( $element->hasAttribute("required") ) {
            $required[] = $element->getAttribute("name");
        }
    }

    // Count a hash from the form information
    $form = (object)[
        "content" => $args["form_html"],
        "title" => $args["title"],
        "emails" => isset( $args["emails"] ) ? $args["emails"] : null,
        "title_format" => isset( $args["title_format"] ) ? $args["title_format"] : null,
        "thank_you" => isset( $args["thank_you"] ) ? $args["thank_you"] : null,
        "fields" => implode( ",", $fields ),
        "required" => implode( ",", $required )
    ];

    $form_hash = sha1( serialize( $form ) );

    // Check if the form already exists
    $name = sanitize_title( $name );

    $exists = get_page_by_path( $name, OBJECT, "wplf-form" );

    if ( $exists ) {
        $obj = (object)[
            "content" => $exists->post_content,
            "title" => $exists->post_title,
            "emails" => get_post_meta( $exists->ID,"_wplf_email_copy_to" ),
            "title_format" => get_post_meta( $exists->ID, "_wplf_title_format" ),
            "thank_you" => get_post_meta( $exists->ID, "_wplf_thank_you" ),
            "fields" => get_post_meta( $exists->ID, "_wplf_fields" ),
            "required" => get_post_meta( $exists->ID, "_wplf_required" )
        ];

        // Check the existing form against the hash of the new one. If they are the same, bail early.
        $hash = sha1( serialize( $obj ) );

        if ( $form_hash == $hash ) {
            return false;
        }
        // They are not the same, update with new information
        else {
            wp_update_post([
                "ID" => $exists->ID,
                "post_title" => $args["title"],
                "post_content" => $args["form_html"]
            ]);

            $emails = array();
            $templates = array();

            if ( isset( $args["emails"] ) && is_array( $args["emails"] ) ) {
                foreach ( $args["emails"] as $email => $template ) {
                    $emails[] = $email;

                    if ( ! empty( $template ) && is_array( $template ) && count( $template ) == 2 ) {
                        $templates[] = json_encode( $template, JSON_UNESCAPED_UNICODE );
                    }
                    else {
                        $templates[] = "";
                    }
                }
            }

            update_post_meta( $exists->ID, "_wplf_email_copy_to", $emails );

            update_post_meta( $exists->ID, '_wplf_email_templates', $templates );

            update_post_meta( $exists->ID, "_wplf_title_format", isset( $args["title_format"] ) ? $args["title_format"] : null );

            update_post_meta( $exists->ID, "_wplf_thank_you", isset( $args["thank_you"] ) ? $args["thank_you"] : null );

            update_post_meta( $exists->ID, "_wplf_fields", implode( ",", $fields ) );

            update_post_meta( $exists->ID, "_wplf_required", implode( ",", $required ) );
        }
    }
    else {
        $id = wp_insert_post([
            "post_title" => $args["title"],
            "post_status" => "publish",
            "post_type" => "wplf-form",
            "post_name" => $name,
            "post_content" => $args["form_html"]
        ]);

        update_post_meta( $id, "_wplf_email_copy_to", isset( $args["email"] ) ? $args["email"] : null );

        update_post_meta( $id, "_wplf_title_format", isset( $args["title_format"] ) ? $args["title_format"] : null );

        update_post_meta( $id, "_wplf_thank_you", isset( $args["thank_you"] ) ? $args["thank_you"] : null );

        update_post_meta( $id, "_wplf_fields", implode( ",", $fields ) );

        update_post_meta( $id, "_wplf_required", implode( ",", $required ) );
    }
}
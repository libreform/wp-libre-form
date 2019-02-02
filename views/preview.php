<?php

/**
 * @Author:             Timi Wahalahti, Digitoimisto Dude Oy (https://dude.fi)
 * @Date:               2019-02-02 17:14:05
 * @Last Modified by:   Timi Wahalahti
 * @Last Modified time: 2019-02-02 17:19:38
 *
 * @package content
 */

get_header();

echo do_shortcode( '[libre-form id="' . $_GET['wplf-form'] . '"]' );

get_footer();

<?php
/* Template Name: Ask Page */

$context = Timber::get_context();
$context['page'] = new TimberPost();
$context['lang'] = get_locale();
$templates = array( 'pages/ask.twig' );
Timber::render( $templates, $context);
<?php
/* Template Name: Ask Page */

$context = Timber::get_context();
$context['page'] = new TimberPost();

$templates = array( 'pages/ask.twig' );
Timber::render( $templates, $context);
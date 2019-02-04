<?php
/* Template Name: Contact Page */

$context = Timber::get_context();
$context['page'] = new TimberPost();
// $context['locale'] = get_locale();
$templates = array( 'pages/contact.twig' );
Timber::render( $templates, $context);
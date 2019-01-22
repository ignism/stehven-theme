
<?php
/* Template Name: Front Page */

$context = Timber::get_context();
$context['page'] = new TimberPost();
$context['lang'] = get_locale();
$templates = array( 'pages/front.twig' );
Timber::render( $templates, $context);
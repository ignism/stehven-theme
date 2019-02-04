<?php
/* Template Name: Portfolio Page */

$context = Timber::get_context();
$args = array(
'post_type' => 'event', // Get post type project
'posts_per_page' => -1, // Get all posts
'orderby' => array(
    'date' => 'DESC' // Order by post date
));

$context['events'] = Timber::get_posts($args);
$context['page'] = new TimberPost();

$templates = array( 'pages/portfolio.twig' );
Timber::render( $templates, $context);
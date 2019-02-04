<?php
/* Template Name: Meet Page */
$context = Timber::get_context();

$args = array(
    'post_type' => 'team-member',
    'posts_per_page' => -1, // Get all posts
    'orderby' => array(
        'date' => 'DESC' // Order by post date
    )
);
    
$context['members'] = Timber::get_posts($args);
$context['page'] = new TimberPost();

$templates = array( 'pages/meet.twig' );
Timber::render( $templates, $context);
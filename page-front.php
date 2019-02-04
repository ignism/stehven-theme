<?php
/* Template Name: Front Page */

$context = Timber::get_context();

$args = array(
    'post_type' => 'event', // Get post type project
    'posts_per_page' => -1, // Get all posts
    'orderby' => array(
        'date' => 'DESC' // Order by post date
));
$events = Timber::get_posts($args);

if (sizeof($events) > 0) {
    $context['event'] = $events[0];
}

$args = array(
    'post_type' => 'upcoming', // Get post type project
    'posts_per_page' => -1, // Get all posts
    'orderby' => array(
        'date' => 'DESC' // Order by post date
));
$upcoming = Timber::get_posts($args);

if (sizeof($upcoming) > 0) {
    $context['upcoming'] = $upcoming;
}

$context['page'] = new TimberPost();

$templates = array( 'pages/front.twig' );
Timber::render($templates, $context);

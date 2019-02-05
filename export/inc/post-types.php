<?php
// Register Custom Post Type Event
function create_event_cpt()
{
    $labels = array(
        'name' => _x('Events', 'Post Type General Name', 'textdomain'),
        'singular_name' => _x('Event', 'Post Type Singular Name', 'textdomain'),
        'menu_name' => _x('Events', 'Admin Menu text', 'textdomain'),
        'name_admin_bar' => _x('Event', 'Add New on Toolbar', 'textdomain'),
        'archives' => __('Event Archives', 'textdomain'),
        'attributes' => __('Event Attributes', 'textdomain'),
        'parent_item_colon' => __('Parent Event:', 'textdomain'),
        'all_items' => __('All Events', 'textdomain'),
        'add_new_item' => __('Add New Event', 'textdomain'),
        'add_new' => __('Add New', 'textdomain'),
        'new_item' => __('New Event', 'textdomain'),
        'edit_item' => __('Edit Event', 'textdomain'),
        'update_item' => __('Update Event', 'textdomain'),
        'view_item' => __('View Event', 'textdomain'),
        'view_items' => __('View Events', 'textdomain'),
        'search_items' => __('Search Event', 'textdomain'),
        'not_found' => __('Not found', 'textdomain'),
        'not_found_in_trash' => __('Not found in Trash', 'textdomain'),
        'featured_image' => __('Featured Image', 'textdomain'),
        'set_featured_image' => __('Set featured image', 'textdomain'),
        'remove_featured_image' => __('Remove featured image', 'textdomain'),
        'use_featured_image' => __('Use as featured image', 'textdomain'),
        'insert_into_item' => __('Insert into Event', 'textdomain'),
        'uploaded_to_this_item' => __('Uploaded to this Event', 'textdomain'),
        'items_list' => __('Events list', 'textdomain'),
        'items_list_navigation' => __('Events list navigation', 'textdomain'),
        'filter_items_list' => __('Filter Events list', 'textdomain'),
    );
    $args = array(
        'label' => __('Event', 'textdomain'),
        'description' => __('', 'textdomain'),
        'labels' => $labels,
        'menu_icon' => 'dashicons-admin-post',
        'supports' => array('title'),
        'taxonomies' => array(),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => false,
        'hierarchical' => false,
        'exclude_from_search' => false,
        'show_in_rest' => true,
        'publicly_queryable' => true,
        'capability_type' => 'post',
    );
    register_post_type('event', $args);
}
create_event_cpt();

// Register Custom Post Type Upcoming Date
function create_upcomingdate_cpt()
{
    $labels = array(
        'name' => _x('Upcoming Dates', 'Post Type General Name', 'textdomain'),
        'singular_name' => _x('Upcoming Date', 'Post Type Singular Name', 'textdomain'),
        'menu_name' => _x('Upcoming Dates', 'Admin Menu text', 'textdomain'),
        'name_admin_bar' => _x('Upcoming Date', 'Add New on Toolbar', 'textdomain'),
        'archives' => __('Upcoming Date Archives', 'textdomain'),
        'attributes' => __('Upcoming Date Attributes', 'textdomain'),
        'parent_item_colon' => __('Parent Upcoming Date:', 'textdomain'),
        'all_items' => __('All Upcoming Dates', 'textdomain'),
        'add_new_item' => __('Add New Upcoming Date', 'textdomain'),
        'add_new' => __('Add New', 'textdomain'),
        'new_item' => __('New Upcoming Date', 'textdomain'),
        'edit_item' => __('Edit Upcoming Date', 'textdomain'),
        'update_item' => __('Update Upcoming Date', 'textdomain'),
        'view_item' => __('View Upcoming Date', 'textdomain'),
        'view_items' => __('View Upcoming Dates', 'textdomain'),
        'search_items' => __('Search Upcoming Date', 'textdomain'),
        'not_found' => __('Not found', 'textdomain'),
        'not_found_in_trash' => __('Not found in Trash', 'textdomain'),
        'featured_image' => __('Featured Image', 'textdomain'),
        'set_featured_image' => __('Set featured image', 'textdomain'),
        'remove_featured_image' => __('Remove featured image', 'textdomain'),
        'use_featured_image' => __('Use as featured image', 'textdomain'),
        'insert_into_item' => __('Insert into Upcoming Date', 'textdomain'),
        'uploaded_to_this_item' => __('Uploaded to this Upcoming Date', 'textdomain'),
        'items_list' => __('Upcoming Dates list', 'textdomain'),
        'items_list_navigation' => __('Upcoming Dates list navigation', 'textdomain'),
        'filter_items_list' => __('Filter Upcoming Dates list', 'textdomain'),
    );
    $args = array(
        'label' => __('Upcoming Date', 'textdomain'),
        'description' => __('', 'textdomain'),
        'labels' => $labels,
        'menu_icon' => 'dashicons-calendar-alt',
        'supports' => array('title'),
        'taxonomies' => array(),
        'public' => true,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 5,
        'show_in_admin_bar' => true,
        'show_in_nav_menus' => true,
        'can_export' => true,
        'has_archive' => false,
        'hierarchical' => false,
        'exclude_from_search' => false,
        'show_in_rest' => true,
        'publicly_queryable' => true,
        'capability_type' => 'post',
    );
    register_post_type('upcoming', $args);
}
create_upcomingdate_cpt();

// Register Custom Post Type Team Member
function create_teammember_cpt() {

	$labels = array(
		'name' => _x( 'Team Stehven', 'Post Type General Name', 'textdomain' ),
		'singular_name' => _x( 'Team Member', 'Post Type Singular Name', 'textdomain' ),
		'menu_name' => _x( 'Team Stehven', 'Admin Menu text', 'textdomain' ),
		'name_admin_bar' => _x( 'Team Member', 'Add New on Toolbar', 'textdomain' ),
		'archives' => __( 'Team Member Archives', 'textdomain' ),
		'attributes' => __( 'Team Member Attributes', 'textdomain' ),
		'parent_item_colon' => __( 'Parent Team Member:', 'textdomain' ),
		'all_items' => __( 'All Team Stehven', 'textdomain' ),
		'add_new_item' => __( 'Add New Team Member', 'textdomain' ),
		'add_new' => __( 'Add New', 'textdomain' ),
		'new_item' => __( 'New Team Member', 'textdomain' ),
		'edit_item' => __( 'Edit Team Member', 'textdomain' ),
		'update_item' => __( 'Update Team Member', 'textdomain' ),
		'view_item' => __( 'View Team Member', 'textdomain' ),
		'view_items' => __( 'View Team Stehven', 'textdomain' ),
		'search_items' => __( 'Search Team Member', 'textdomain' ),
		'not_found' => __( 'Not found', 'textdomain' ),
		'not_found_in_trash' => __( 'Not found in Trash', 'textdomain' ),
		'featured_image' => __( 'Featured Image', 'textdomain' ),
		'set_featured_image' => __( 'Set featured image', 'textdomain' ),
		'remove_featured_image' => __( 'Remove featured image', 'textdomain' ),
		'use_featured_image' => __( 'Use as featured image', 'textdomain' ),
		'insert_into_item' => __( 'Insert into Team Member', 'textdomain' ),
		'uploaded_to_this_item' => __( 'Uploaded to this Team Member', 'textdomain' ),
		'items_list' => __( 'Team Stehven list', 'textdomain' ),
		'items_list_navigation' => __( 'Team Stehven list navigation', 'textdomain' ),
		'filter_items_list' => __( 'Filter Team Stehven list', 'textdomain' ),
	);
	$args = array(
		'label' => __( 'Team Member', 'textdomain' ),
		'description' => __( '', 'textdomain' ),
		'labels' => $labels,
		'menu_icon' => 'dashicons-id',
		'supports' => array('title'),
		'taxonomies' => array(),
		'public' => true,
		'show_ui' => true,
		'show_in_menu' => true,
		'menu_position' => 5,
		'show_in_admin_bar' => true,
		'show_in_nav_menus' => true,
		'can_export' => true,
		'has_archive' => false,
		'hierarchical' => false,
		'exclude_from_search' => false,
		'show_in_rest' => true,
		'publicly_queryable' => true,
		'capability_type' => 'post',
	);
	register_post_type( 'team-member', $args );

}

create_teammember_cpt();
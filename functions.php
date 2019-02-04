<?php
require_once(__DIR__ . '/vendor/autoload.php');

$timber = new Timber\Timber();

if (! class_exists('Timber')) {
    add_action('admin_notices', function () {
        echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url(admin_url('plugins.php#timber')) . '">' . esc_url(admin_url('plugins.php')) . '</a></p></div>';
    });
    add_filter('template_include', function ($template) {
        return "<h1>No Timber</h1>";
    });
    return;
}
/**
 * Sets the directories (inside your theme) to find .twig files
 */
Timber::$dirname = array( 'templates', 'views' );
/**
 * By default, Timber does NOT autoescape values. Want to enable Twig's autoescape?
 * No prob! Just set this value to true
 */
Timber::$autoescape = false;
/**
 * We're going to configure our theme inside of a subclass of Timber\Site
 * You can move this to its own file and include here via php's include("MySite.php")
 */
class StarterSite extends Timber\Site
{
    /** Add timber support. */
    public function __construct()
    {
        add_action('after_setup_theme', array( $this, 'theme_supports' ));
        add_filter('timber_context', array( $this, 'add_to_context' ));
        add_filter('get_twig', array( $this, 'add_to_twig' ));
        add_action('init', array( $this, 'register_post_types' ));
        add_action('init', array( $this, 'register_taxonomies' ));
        parent::__construct();
    }
    /** This is where you can register custom post types. */
    public function register_post_types()
    {
    }
    /** This is where you can register custom taxonomies. */
    public function register_taxonomies()
    {
    }
    /** This is where you add some context
     *
     * @param string $context context['this'] Being the Twig's {{ this }}.
     */
    public function add_to_context($context)
    {
        $context['locale'] = get_locale();
        $context['social'] = Timber::get_post(263);
        $context['menu'] = new Timber\Menu();
        $context['site'] = $this;
        return $context;
    }
    public function theme_supports()
    {
        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');
        /*
         * Let WordPress manage the document title.
         * By adding theme support, we declare that this theme does not use a
         * hard-coded <title> tag in the document head, and expect WordPress to
         * provide it for us.
         */
        add_theme_support('title-tag');
        /*
         * Enable support for Post Thumbnails on posts and pages.
         *
         * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
         */
        add_theme_support('post-thumbnails');
        /*
         * Switch default core markup for search form, comment form, and comments
         * to output valid HTML5.
         */
        add_theme_support(
            'html5',
            array(
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
            )
        );
        /*
         * Enable support for Post Formats.
         *
         * See: https://codex.wordpress.org/Post_Formats
         */
        add_theme_support(
            'post-formats',
            array(
                'aside',
                'image',
                'video',
                'quote',
                'link',
                'gallery',
                'audio',
            )
        );
        add_theme_support('menus');
    }
    /** This Would return 'foo bar!'.
     *
     * @param string $text being 'foo', then returned 'foo bar!'.
     */
    
    public function getLang($locale)
    {
        return substr($locale, 0, 2);
    }

    public function getDay($startDate)
    {
        $day = date('l', strtotime($startDate));

        return $day . '';
    }

    public function getDate($startDate)
    {
        $day = date('j', strtotime($startDate));
        $month = date('F', strtotime($startDate));
        $date = $day . ' ' . $month;

        return $date;
    }

    public function getDays($startDate, $endDate)
    {
        $startDay = date('D', strtotime($startDate));
        $endDay = date('D', strtotime($endDate));

        $days = $startDay . ' - ' . $endDay;

        return $days;
    }

    public function getDates($startDate, $endDate)
    {
        $startDay = date('j', strtotime($startDate));
        $startMonth = date('F', strtotime($startDate));

        $endDay = date('j', strtotime($endDate));
        $endMonth = date('F', strtotime($endDate));

        if ($startMonth === $endMonth) {
            $date = $startDay . ' - ' . $endDay . ' ' . $startMonth;
        } else {
            $date = $startDay . ' ' . $startMonth . ' - <br> ' . $endDay . ' ' . $endMonth;
        }

        return $date;
    }
    
    /** This is where you can add your own functions to twig.
     *
     * @param string $twig get extension.
     */
    public function add_to_twig($twig)
    {
        $twig->addExtension(new Twig_Extension_StringLoader());
        $twig->addFilter(new Twig_SimpleFilter('getLang', array($this, 'getLang')));
        $twig->addFunction(new Twig_Function('getDay', array($this, 'getDay')));
        $twig->addFunction(new Twig_Function('getDate', array($this, 'getDate')));
        $twig->addFunction(new Twig_Function('getDays', array($this, 'getDays')));
        $twig->addFunction(new Twig_Function('getDates', array($this, 'getDates')));
        return $twig;
    }
}
new StarterSite();


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
add_action('init', 'create_event_cpt', 0);

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
add_action('init', 'create_upcomingdate_cpt', 0);

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
add_action( 'init', 'create_teammember_cpt', 0 );

// hide menu items
function remove_menus()
{
    remove_menu_page('index.php');                  //Dashboard
    remove_menu_page('jetpack');                    //Jetpack*
    remove_menu_page('edit.php');                   //Posts
    // remove_menu_page( 'upload.php' );                 //Media
    // remove_menu_page( 'edit.php?post_type=page' );    //Pages
    remove_menu_page('edit-comments.php');          //Comments
    // remove_menu_page( 'themes.php' );                 //Appearance
    // remove_menu_page( 'plugins.php' );                //Plugins
    // remove_menu_page( 'users.php' );                  //Users
    // remove_menu_page( 'tools.php' );                  //Tools
    // remove_menu_page( 'options-general.php' );        //Settings
}
add_action('admin_menu', 'remove_menus');

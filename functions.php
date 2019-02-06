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
        add_action('init', array( $this, 'register_custom_fields' ));
        add_action('init', array( $this, 'register_taxonomies' ));
        parent::__construct();
    }
    /** This is where you can register custom post types. */
    public function register_post_types()
    {
        require get_template_directory() . '/inc/post-types.php';
    }

    /** This is where you can register custom post types. */
    public function register_custom_fields()
    {
        require get_template_directory() . '/inc/custom-fields.php';
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

add_image_size( 'screen', 2560, 1440 );
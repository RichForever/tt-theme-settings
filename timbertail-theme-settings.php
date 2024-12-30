<?php
/**
 * Plugin Name: TimberTail Theme Settings
 * Description: An example options page built with React.
 * Author: MM
 * Version: 1.0.0
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Autoload classes
spl_autoload_register( function ( $class ) {
	if ( strpos( $class, 'TT_' ) === false ) {
		return;
	}
	$class_name = strtolower( str_replace( '_', '-', $class ) );
	$base_dir = plugin_dir_path( __FILE__ );
	$directories = ['includes', 'includes/handlers', 'includes/settings', 'includes/api'];
	$prefix = 'class-';

	foreach ( $directories as $directory ) {
		$file_path = $base_dir . $directory . '/' . $prefix . $class_name . '.php';
		if ( file_exists( $file_path ) ) {
			include $file_path;
			break;
		}
	}
});

// Initialize the plugin
function tt_theme_settings_init() {
	TT_Theme_Settings::init();
}
add_action( 'plugins_loaded', 'tt_theme_settings_init' );

// Set default settings on plugin activation
function tt_theme_settings_activate() {
    $default_settings = [
        'commonSettings' => [
            'excerptLength' => 55,  // Default WordPress excerpt length as number
            'disableWordpressVersion' => false,
            'addSvgSupport' => false,
            'disableXmlRpc' => false,
            'disableAdminBar' => false,
            'disableFileEdit' => false
        ],
        'scriptsSettings' => [
            'head' => [
                'content' => '',
                'isActive' => false
            ],
            'body' => [
                'content' => '',
                'isActive' => false
            ],
            'footer' => [
                'content' => '',
                'isActive' => false
            ]
        ],
        'socialMediaSettings' => []
    ];

    // Only set default settings if they don't exist
    if (!get_option('tt_theme_settings')) {
        update_option('tt_theme_settings', $default_settings);
    }
}
register_activation_hook(__FILE__, 'tt_theme_settings_activate');
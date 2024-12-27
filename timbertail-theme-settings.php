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
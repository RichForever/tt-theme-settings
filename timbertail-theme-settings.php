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
	$file_path = plugin_dir_path( __FILE__ ) . 'includes/class-' . $class_name . '.php';

	if ( file_exists( $file_path ) ) {
		include $file_path;
	}
});

// Initialize the plugin
function tt_theme_settings_init() {
	TT_Theme_Settings::get_instance();
}
add_action( 'plugins_loaded', 'tt_theme_settings_init' );
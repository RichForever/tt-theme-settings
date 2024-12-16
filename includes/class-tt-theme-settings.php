<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TT_Theme_Settings {

	/**
	 * Holds the single instance of the class.
	 */
	private static $instance = null;

	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	private function __construct() {
		// Initialize subcomponents
		new TT_Admin_Page();
		new TT_Assets_Loader();
		new TT_Scripts_Handler();
		new TT_REST_API();
	}
}

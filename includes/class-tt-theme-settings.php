<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TT_Theme_Settings {
	public static function init() {
		// Initialize subcomponents
		new TT_Admin_Page();
		new TT_Assets_Loader();
		new TT_REST_API();
		new TT_Settings();
		new TT_Scripts_Settings_Handler();
		new TT_Common_Settings_Handler();
	}
}

<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TT_Assets_Loader {

	public function __construct() {
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	public function enqueue_scripts() {
		$screen = get_current_screen();
		if ( 'toplevel_page_tt-theme-settings' !== $screen->id ) {
			return;
		}

		$asset_file = include( plugin_dir_path( __FILE__ ) . '../build/app.asset.php' );

		wp_enqueue_script(
			'tt-theme-settings',
			plugins_url( '../build/app.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);

		wp_enqueue_style(
			'tt-theme-settings',
			plugins_url( '../build/app.css', __FILE__ ),
			[],
			$asset_file['version'],
			'all'
		);

		wp_enqueue_style( 'wp-components' );
	}
}

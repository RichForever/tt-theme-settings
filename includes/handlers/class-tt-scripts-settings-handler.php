<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TT_Scripts_Settings_Handler {

	public function __construct() {
		add_action( 'wp_head', [ $this, 'output_head_scripts' ] );
		add_action( 'wp_body_open', [ $this, 'output_body_scripts' ] );
		add_action( 'wp_footer', [ $this, 'output_footer_scripts' ] );
	}

	public function output_head_scripts() {
		$isActive = TT_Settings::get_setting('scriptsSettings.head.isActive', false);
		$setting = TT_Settings::get_setting('scriptsSettings.head.content', '');
		if ( !$isActive ) {
			return;
		}
		echo $setting;
	}

	public function output_body_scripts() {
		$isActive = TT_Settings::get_setting('scriptsSettings.body.isActive', false);
		$setting = TT_Settings::get_setting('scriptsSettings.body.content', '');
		if ( !$isActive ) {
			return;
		}
		echo $setting;
	}

	public function output_footer_scripts() {
		$isActive = TT_Settings::get_setting('scriptsSettings.footer.isActive', false);
		$setting = TT_Settings::get_setting('scriptsSettings.footer.content', '');
		if ( !$isActive ) {
			return;
		}
		echo $setting;
	}
}

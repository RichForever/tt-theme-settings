<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TT_Common_Settings_Handler {

	public function __construct() {
		add_filter( 'excerpt_length', [ $this, 'handle_excerpt_length' ], 999 );
		add_filter( 'the_generator', [ $this, 'handle_remove_wp_version' ] );
		add_filter( 'upload_mimes', [ $this, 'handle_add_svg_support' ] );
		add_filter( 'xmlrpc_enabled', [ $this, 'handle_disable_xml_rpc' ] );
		add_filter( 'show_admin_bar', [ $this, 'handle_admin_bar_visibility' ] );
		add_filter( 'init', [ $this, 'handle_disable_file_edit' ] );
	}

	public function handle_excerpt_length($length) {
		$setting = TT_Settings::get_setting('commonSettings.excerptLength', 55);
		return (int)$setting;
	}

	public function handle_remove_wp_version() {
		$setting = TT_Settings::get_setting('commonSettings.removeWordpressVersion', false);
		if($setting) {
			 return '';
		}
	}

	public function handle_disable_xml_rpc() {
		$setting = TT_Settings::get_setting('commonSettings.disableXmlRpc', false);
		return !$setting;
	}

	public function handle_add_svg_support($file_types) {
		$setting = TT_Settings::get_setting('commonSettings.addSvgSupport', false);
		if($setting) {
			$newFileTypes = [];
			$newFileTypes["svg"] = "image/svg+xml";
			$file_types = array_merge($file_types, $newFileTypes);
			return $file_types;
		}
		return $file_types;
	}

	public function handle_admin_bar_visibility( $show ) {
		$setting = TT_Settings::get_setting('commonSettings.disableAdminBar', false);
		return !$setting;
	}

	public function handle_disable_file_edit() {
		$setting = TT_Settings::get_setting('commonSettings.disableFileEdit', false);
		if($setting) {
			define( 'DISALLOW_FILE_EDIT', $setting );
		}
	}

}
<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TT_Scripts_Handler {

	public function __construct() {
		add_action( 'wp_head', [ $this, 'output_head_scripts' ] );
		add_action( 'wp_body_open', [ $this, 'output_body_scripts' ] );
		add_action( 'wp_footer', [ $this, 'output_footer_scripts' ] );
		add_action( 'admin_init', [ $this, 'register_settings' ] );
		add_action( 'rest_api_init', [ $this, 'register_settings' ] );
	}

	public function register_settings() {
		$default = [
			'scriptsSettings' => [
				'head'   => [ 'isActive' => false, 'content' => '' ],
				'body'   => [ 'isActive' => false, 'content' => '' ],
				'footer' => [ 'isActive' => false, 'content' => '' ],
			]
		];

//		$schema = [
//			'type'       => 'object',
//			'properties' => [
//				'scripts' => [
//					'type'       => 'object',
//					'properties' => [
//						'head'   => [ 'type' => 'object', 'properties' => [ 'isActive' => [ 'type' => 'boolean' ], 'content' => [ 'type' => 'string' ] ] ],
//						'body'   => [ 'type' => 'object', 'properties' => [ 'isActive' => [ 'type' => 'boolean' ], 'content' => [ 'type' => 'string' ] ] ],
//						'footer' => [ 'type' => 'object', 'properties' => [ 'isActive' => [ 'type' => 'boolean' ], 'content' => [ 'type' => 'string' ] ] ],
//					]
//				]
//			]
//		];

		register_setting(
'options',
'tt_theme_settings',
			[
			'type'              => 'object',
			'default'           => $default,
			'show_in_rest'      => true,
		] );
	}

	public function get_option() {
		return get_option( 'tt_theme_settings', [] );
	}

	public function output_head_scripts() {
		$options = $this->get_option();
		if ( ! $options['scriptsSettings']['head']['isActive'] ) {
			return;
		}
		echo $options['scriptsSettings']['head']['content'];
	}

	public function output_body_scripts() {
		$options = $this->get_option();
		if ( ! $options['scriptsSettings']['body']['isActive'] ) {
			return;
		}
		echo $options['scriptsSettings']['body']['content'];
	}

	public function output_footer_scripts() {
		$options = $this->get_option();
		if ( ! $options['scriptsSettings']['footer']['isActive'] ) {
			return;
		}
		echo $options['scriptsSettings']['footer']['content'];
	}
}

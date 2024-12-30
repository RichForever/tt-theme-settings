<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TT_REST_API {

	/**
	 * Option name for the settings.
	 */
	private $option_name = 'tt_theme_settings';

	/**
	 * Constructor to hook into rest_api_init.
	 */
	public function __construct() {
		add_action( 'rest_api_init', [ $this, 'register_routes' ] );
	}

	/**
	 * Registers custom REST API routes.
	 */
	public function register_routes() {
		register_rest_route( 'tt/v1', '/settings', [
			[
				'methods'  => 'GET',
				'callback' => [ $this, 'get_settings' ],
				'permission_callback' => [ $this, 'permissions_check' ],
			],
			[
				'methods'  => 'POST',
				'callback' => [ $this, 'update_settings' ],
				'permission_callback' => [ $this, 'permissions_check' ],
				'args'     => [
					'tt_theme_settings' => [
						'required' => true,
						'type'     => 'object',
					]
				]
			]
		] );
	}

	/**
	 * Handles the GET request to /wp-json/tt/v1/settings.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return WP_REST_Response
	 */
	public function get_settings( $request ) {
		$options = get_option( $this->option_name, [] );

		return new WP_REST_Response( $options, 200 );
	}

	/**
	 * Handles the POST request to /wp-json/tt/v1/settings.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return WP_REST_Response
	 */
	public function update_settings( $request ) {
		// Get the settings parameter from the request
		$new_settings = $request->get_param( 'tt_theme_settings' );

		// Save the merged settings to wp_options under 'tt_theme_settings'
		update_option( 'tt_theme_settings', $new_settings );

		return new WP_REST_Response( [
			'success'  => true,
			'message'  => 'Settings saved successfully.',
		], 200 );
	}

	/**
	 * Checks permissions for the route.
	 *
	 * @param WP_REST_Request $request The REST request.
	 *
	 * @return bool
	 */
	public function permissions_check( $request ) {
		// Example permission check (require the user to have 'manage_options')
		return current_user_can( 'manage_options' );
	}
}

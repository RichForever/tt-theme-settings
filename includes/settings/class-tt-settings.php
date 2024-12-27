<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TT_Settings {

	public function __construct() {
		add_action( 'admin_init', [ $this, 'register_settings' ] );
		add_action( 'rest_api_init', [ $this, 'register_settings' ] );
	}

	public function register_settings() {
		register_setting(
			'options',
			'tt_theme_settings',
			[
				'type'              => 'object',
				'show_in_rest'      => true,
			]
		);
	}

	public static function get_option() {
		return get_option( 'tt_theme_settings', [] );
	}

public static function get_setting($keyPath, $default = null) {
    $options = self::get_option();
    $keys = explode('.', $keyPath); // Split the key path into an array of keys

    // Traverse the options array using the keys
    foreach ($keys as $key) {
        if (isset($options[$key]) && !empty($options[$key])) {
            $options = $options[$key]; // Move deeper into the array
        } else {
            return $default; // Return default if key does not exist
        }
    }

    return $options ?? $default; // Return the found value or default
}
}
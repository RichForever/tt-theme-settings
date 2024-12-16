<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class TT_Admin_Page {

	public function __construct() {
		add_action( 'admin_menu', [ $this, 'add_admin_page' ] );
	}

	public function add_admin_page() {
		add_menu_page(
			__( 'Theme Settings', 'timbertail' ),
			__( 'Theme Settings', 'timbertail' ),
			'manage_options',
			'tt-theme-settings',
			[ $this, 'render_admin_page' ],
			'data:image/svg+xml;base64,ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3ZnIGNsYXNzPSJ3LTgiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHBvbHlnb24gY2xhc3M9ImIiIHBvaW50cz0iMjkuMTQ3IDI4LjE0OSAyNy40ODMgMjYuMDE2IDE3LjkxNSAyNi4wMTYgMTcuOTE1IDIzLjcyMyAyNS43MDIgMjMuNzIzIDI0LjA0OSAyMS41ODkgMTcuOTE1IDIxLjU4OSAxNy45MTUgMTkuMjk2IDI2LjAzMyAxOS4yOTYgMjQuNDk3IDE3LjE2MyAxNy45MTUgMTcuMTYzIDE3LjkxNSAxNC44NjkgMjIuODUzIDE0Ljg2OSAyMS4zMTggMTIuNzM2IDE3LjkxNSAxMi43MzYgMTcuOTE1IDEwLjQ0MyAyMi41ODcgMTAuNDQzIDIxLjA4MiA4LjMwOSAxNy45MTUgOC4zMDkgMTcuOTE1IDYuMDE2IDE5LjQ2MiA2LjAxNiAxNy45NTcgMy44ODMgMTcuOTE1IDMuODgzIDE3LjkxNSAwIDEwLjg5NyA5Ljc4MSAxNC44NDIgOS43OTIgNi44NzUgMjAuODk2IDEwLjk4MiAyMC44OTYgMi44NTQgMzIgMTcuOTE1IDMyIDE3LjkxNSAyOC4xNDkgMjkuMTQ3IDI4LjE0OSIgc3R5bGU9ImZpbGw6IHJnYig1NiwgMTg5LCAyNDgpOyI+PC9wb2x5Z29uPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3ZnPg=='
		);
	}

	public function render_admin_page() {
		echo '<div class="wrap"><div id="tt-theme-settings"></div></div>';
	}
}

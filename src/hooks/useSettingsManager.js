import { useEffect, useState } from '@wordpress/element';

import apiFetch from '@wordpress/api-fetch';

import { useNotice } from '@hooks/useNotice';
import { useSnackbar } from '@hooks/useSnackbar';

export const useSettingsManager = () => {
	const [settings, setSettings] = useState({}); // Use a single object to hold all settings
	const [isFetchingSettings, setIsFetchingSettings] = useState(true); // Track loading state

	const { notice, showNotice, dismissNotice } = useNotice();
	const { notices, showSnackbar, onRemove } = useSnackbar();

	useEffect(() => {
		(async () => {
			try {
				const response = await apiFetch({ path: 'tt/v1/settings' });
				setSettings(response);
			} catch (error) {
				showNotice(true, 'error', 'Error fetching settings.');
				// eslint-disable-next-line no-console
				console.error('Error fetching settings:', error);
			} finally {
				setIsFetchingSettings(false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const submitSettings = async (data) => {
		try {
			const response = await apiFetch({
				path: 'tt/v1/settings',
				method: 'POST',
				data: {
					tt_theme_settings: data,
				},
				parse: false,
			});

			const responseData = await response.json();

			if (response.ok) {
				showNotice(true, 'success', responseData.message);
				showSnackbar(responseData.message);
			} else {
				showNotice(true, 'warning', responseData.message);
				showSnackbar(responseData.message);
			}
		} catch (error) {
			showNotice(true, 'error', 'An unexpected error occurred.');
			showSnackbar(error.message);
		}
	};

	return {
		notice,
		dismissNotice,
		settings,
		submitSettings,
		isFetchingSettings,
		notices,
		showSnackbar,
		onRemove,
	};
};

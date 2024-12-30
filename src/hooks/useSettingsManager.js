import { useEffect, useState } from 'react';

import apiFetch from '@wordpress/api-fetch';

import { useNotice } from './useNotice';
import { useSnackbar } from './useSnackbar';

export const useSettingsManager = () => {
  const [settings, setSettings] = useState({}); // Use a single object to hold all settings
  const [isFetchingSettings, setIsFetchingSettings] = useState(true); // Track loading state

  const { notice, setNotice, showNotice, dismissNotice } = useNotice();
  const { snackbar, setSnackbar, showSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const response = await apiFetch({ path: 'tt/v1/settings' });
        setSettings(response);
      } catch (error) {
        showNotice(true, 'error', 'Error fetching settings.');
        console.error('Error fetching settings:', error);
      } finally {
        setIsFetchingSettings(false);
      }
    })();
  }, []);

  const submitSettings = async (data) => {
    try {
      const response = await apiFetch({
        path: 'tt/v1/settings',
        method: 'POST',
        data: {
          tt_theme_settings: data
        },
        parse: false
      });

      const responseData = await response.json();

      if (response.ok) {
        showNotice(true, 'success', responseData.message);
        showSnackbar(true, responseData.message);
      } else {
        showNotice(true, 'warning', responseData.message);
        showSnackbar(true, responseData.message);
      }
    } catch (error) {
      showNotice(true, 'error', 'An unexpected error occurred.');
      showSnackbar(true, error.message);
    }
  };

  return {
    notice,
    dismissNotice,
    settings,
    submitSettings,
    isFetchingSettings,
    snackbar
  };
};

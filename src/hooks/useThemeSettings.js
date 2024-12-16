import {useState, useEffect} from 'react';
import {useNotice} from "./useNotice";
import apiFetch from '@wordpress/api-fetch';

export const useThemeSettings = () => {

    const [scriptsSettings, setScriptsSettings] = useState({
        head: {isActive: false, content: ''},
        body: {isActive: false, content: ''},
        footer: {isActive: false, content: ''},
    });

    const [isButtonBusy, setIsButtonBusy] = useState(false)

    const {notice, updateNotice, dismissNotice} = useNotice();

    useEffect(() => {
        (async () => {
            try {
                const response = await apiFetch({path: 'tt/v1/settings'});

                setScriptsSettings(response.scriptsSettings);
            } catch (error) {
                updateNotice(true, 'error', 'Error fetching settings.');
                console.error('Error fetching settings:', error);
            }
        })();
    }, []);

    const updateScriptsSettings = (section, key, value) => {
        setScriptsSettings((prevSettings) => ({
            ...prevSettings,
            [section]: {
                ...prevSettings[section],
                [key]: value
            }
        }));
    };

    const saveSettings = async () => {

        setIsButtonBusy((prevState) => !prevState);

        try {
            const response = await apiFetch({
                path: 'tt/v1/settings',
                method: 'POST',
                data: {
                    tt_theme_settings: {
                        scriptsSettings,
                    }
                },
                parse: false
            })

            const data = await response.json();

            if (response.ok) {
                updateNotice(true, 'success', data.message)
            } else {
                updateNotice(true, 'warning', data.message)
            }
        } catch (error) {
            updateNotice(true, 'error', 'An unexpected error occurred.')
        } finally {
            setIsButtonBusy(false);
        }
    };

    return {
        dismissNotice,
        isButtonBusy,
        notice,
        saveSettings,
        scriptsSettings,
        updateNotice,
        updateScriptsSettings,
    };
};
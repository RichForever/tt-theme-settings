import { createRoot } from '@wordpress/element';
import ThemeSettingsPage from './ThemeSettingsPage';

import './app.scss';

const App = () => {
	return <ThemeSettingsPage />;
};

const rootElement = document.getElementById('tt-theme-settings');
if (rootElement) {
	createRoot(rootElement).render(<App />);
}

import {createRoot} from 'react-dom/client';
import ThemeSettingsPage from "./ThemeSettingsPage";

const App = () => {
    return <ThemeSettingsPage />
};

const rootElement = document.getElementById('tt-theme-settings');
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
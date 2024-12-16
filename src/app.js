import {createRoot} from 'react-dom/client';
import OptionsPage from "./OptionsPage";

const App = () => {
    return <OptionsPage/>
};

const rootElement = document.getElementById('tt-theme-settings');
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
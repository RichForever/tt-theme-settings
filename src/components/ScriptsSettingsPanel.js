import {__} from '@wordpress/i18n';
import ScriptInputSection from "./ScriptInputSection";
import { useFormContext } from 'react-hook-form';

const ScriptsSettingsPanel = () => {
    const { watch } = useFormContext();
    const formValues = watch();
    return (
        <>
            <ScriptInputSection
                namePrefix="head"
                label={__('Scripts in Header', 'timbertail')}
                helpText={__('These scripts will be printed in the <head> section', 'timbertail')}
            />
            <ScriptInputSection
                namePrefix="body"
                label={__('Scripts in Body', 'timbertail')}
                helpText={__('These scripts will be printed below the <body> tag', 'timbertail')}
            />
            <ScriptInputSection
                namePrefix="footer"
                label={__('Scripts in Footer', 'timbertail')}
                helpText={__('These scripts will be printed below the <footer> tag', 'timbertail')}
            />
        </>
    )
};

export default ScriptsSettingsPanel
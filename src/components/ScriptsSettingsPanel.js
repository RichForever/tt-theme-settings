import {__} from '@wordpress/i18n';
import ScriptFieldGroup from "./form/ScriptFieldGroup";
import { useFormContext } from 'react-hook-form';

const ScriptsSettingsPanel = () => {
    const { watch } = useFormContext();
    const formValues = watch();

    const sections = [
        { namePrefix: 'head', label: __('Scripts in Header', 'timbertail'), helpText: __('These scripts will be printed in the <head> section', 'timbertail') },
        { namePrefix: 'body', label: __('Scripts in Body', 'timbertail'), helpText: __('These scripts will be printed in the <body> section', 'timbertail') },
        { namePrefix: 'footer', label: __('Scripts in Footer', 'timbertail'), helpText: __('These scripts will be printed in the <footer> section', 'timbertail') },
    ]
    return (
        <>
            {sections.map(({ namePrefix, label, helpText }) => (
                <ScriptFieldGroup
                    key={namePrefix}
                    namePrefix={namePrefix}
                    label={label}
                    helpText={helpText}
                />
            ))}
        </>
    )
};

export default ScriptsSettingsPanel
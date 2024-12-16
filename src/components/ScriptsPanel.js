import {__} from '@wordpress/i18n';
import ScriptSection from "./ScriptSection";

const ScriptsPanel = ({scriptsSettings, updateScriptsSettings}) => {
    return (
        <>
            <ScriptSection
                label={__('Scripts in Header', 'timbertail')}
                helpText={__('These scripts will be printed in the <head> section', 'timbertail')}
                value={scriptsSettings.head.content}
                isActive={scriptsSettings.head.isActive}
                onContentChange={(value) => updateScriptsSettings('head', 'content', value)}
                onToggleChange={() => updateScriptsSettings('head', 'isActive', !scriptsSettings.head.isActive)}
            />
            <ScriptSection
                label={__('Scripts in Body', 'timbertail')}
                helpText={__('These scripts will be printed below the <body> tag', 'timbertail')}
                value={scriptsSettings.body.content}
                isActive={scriptsSettings.body.isActive}
                onContentChange={(value) => updateScriptsSettings('body', 'content', value)}
                onToggleChange={() => updateScriptsSettings('body', 'isActive', !scriptsSettings.body.isActive)}
            />
            <ScriptSection
                label={__('Scripts in Footer', 'timbertail')}
                helpText={__('These scripts will be printed below the <footer> tag', 'timbertail')}
                value={scriptsSettings.footer.content}
                isActive={scriptsSettings.footer.isActive}
                onContentChange={(value) => updateScriptsSettings('footer', 'content', value)}
                onToggleChange={() => updateScriptsSettings('footer', 'isActive', !scriptsSettings.footer.isActive)}
            />
        </>
    )
};

export default ScriptsPanel
import {__} from '@wordpress/i18n';
import {
    __experimentalVStack as VStack,
    __experimentalHeading as Heading,
    __experimentalText as Text,
    ToggleControl,
} from '@wordpress/components';
import CodeMirror from '@uiw/react-codemirror';
import {html} from '@codemirror/lang-html'

const ScriptSection = ({label, helpText, value, isActive, onContentChange, onToggleChange}) => {
    return (
        <VStack width="100%" spacing={4}>
            <div>
                <Heading level={4} weight="600">{label}</Heading>
                <Text color="#757575">{helpText}</Text>
            </div>
            <CodeMirror
                value={value}
                placeholder="Place your code here"
                height="300px"
                onChange={onContentChange}
                theme="light"
                options={{
                    keyMap: 'sublime',
                    mode: 'html',
                }}
                extensions={[html()]}
            />
            <ToggleControl
                label={__('Activate scripts', 'timbertail')}
                checked={isActive}
                onChange={onToggleChange}
                __nextHasNoMarginBottom
            />
        </VStack>
    )
};

export default ScriptSection
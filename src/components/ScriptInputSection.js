import {__} from '@wordpress/i18n';
import {Controller, useFormContext} from 'react-hook-form';
import {
    __experimentalVStack as VStack,
    __experimentalHeading as Heading,
    __experimentalText as Text,
    ToggleControl,
} from '@wordpress/components';
import CodeMirror from '@uiw/react-codemirror';
import {html} from '@codemirror/lang-html'

const ScriptInputSection = ({namePrefix, label, helpText}) => {
    const { control } = useFormContext();
    return (
        <VStack width="100%" spacing={4}>
            <div>
                <Heading level={4} weight="600">{label}</Heading>
                <Text color="#757575">{helpText}</Text>
            </div>
            <Controller
                name={`scriptsSettings.${namePrefix}.content`}
                control={control}
                render={({ field }) => (
                    <CodeMirror
                        {...field}
                        placeholder="Place your code here"
                        height="300px"
                        theme="light"
                        options={{
                            keyMap: 'sublime',
                            mode: 'html',
                        }}
                        extensions={[html()]}
                    />
                )}
            />
            <Controller
                name={`scriptsSettings.${namePrefix}.isActive`}
                control={control}
                render={({ field }) => (
                    <ToggleControl
                        label={__('Activate scripts', 'timbertail')}
                        checked={field.value}
                        onChange={field.onChange}
                        __nextHasNoMarginBottom
                    />
                )}
            />
        </VStack>
    )
};

export default ScriptInputSection
import { Controller, useFormContext } from 'react-hook-form';

import { __ } from '@wordpress/i18n';
import { html } from '@codemirror/lang-html'
import CodeMirror from '@uiw/react-codemirror';
import { ToggleControl, __experimentalVStack as VStack } from '@wordpress/components';

import FormSectionHeading from '../../common/FormSectionHeading';

const ScriptField = ({namePrefix, label, helpText}) => {
    const { control } = useFormContext();
    return (
        <VStack width="100%" spacing={4}>
            <FormSectionHeading label={label} helpText={helpText} />
            <Controller
                name={`scriptsSettings.${namePrefix}.content`}  // name is used as a key name in the data object; the "." means that's the object
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
                name={`scriptsSettings.${namePrefix}.isActive`} // name is used as a key name in the data object; the "." means that's the object
                control={control}
                render={({ field }) => (
                    <ToggleControl
                        {...field}
                        label={__('Activate scripts', 'timbertail')}
                        checked={field.value}
                        __nextHasNoMarginBottom
                    />
                )}
            />
        </VStack>
    )
};

export default ScriptField;
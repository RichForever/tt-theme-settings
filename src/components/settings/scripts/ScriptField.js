import { Controller, useFormContext } from 'react-hook-form';

import { __ } from '@wordpress/i18n';
import { html } from '@codemirror/lang-html';
import CodeMirror from '@uiw/react-codemirror';
import { ToggleControl, __experimentalVStack as VStack } from '@wordpress/components';

const ScriptField = ({ settingsGroup, fieldName }) => {
  const { control } = useFormContext();
  return (
    <VStack width="100%" spacing={4}>
      <Controller
        name={`${settingsGroup}.${fieldName}.content`} // name is used as a key name in the data object; the "." means that's the object
        control={control}
        render={({ field }) => (
          <CodeMirror
            {...field}
            placeholder={__('Place your code here', 'timbertail')}
            height="300px"
            theme="light"
            options={{
              keyMap: 'sublime',
              mode: 'html'
            }}
            extensions={[html()]}
          />
        )}
      />
      <Controller
        name={`${settingsGroup}.${fieldName}.isActive`} // name is used as a key name in the data object; the "." means that's the object
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
  );
};

export default ScriptField;

import { Controller, useFormContext } from 'react-hook-form';

import { __ } from '@wordpress/i18n';

import { ToggleControl } from '@wordpress/components';

const ToggleField = ({ settingsGroup, fieldName }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={`${settingsGroup}.${fieldName}`}
      control={control}
      render={({ field }) => (
        <ToggleControl
          {...field}
          label={__('Activate', 'timbertail')}
          checked={field.value}
          __nextHasNoMarginBottom
        />
      )}
    />
  );
};

export default ToggleField;

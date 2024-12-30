import { Controller, useFormContext } from 'react-hook-form';

import { __ } from '@wordpress/i18n';

import { FormTokenField } from '@wordpress/components';

const TokenField = ({ settingsGroup, fieldName }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={`${settingsGroup}.${fieldName}`}
      control={control}
      render={({ field }) => (
        <FormTokenField {...field} label="" __next40pxDefaultSize __nextHasNoMarginBottom />
      )}
    />
  );
};

export default TokenField;

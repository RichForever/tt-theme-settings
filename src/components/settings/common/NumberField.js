import { Controller, useFormContext } from 'react-hook-form';

import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

const NumberField = ({ settingsGroup, fieldName }) => {
	const { control } = useFormContext();
	return (
		<Controller
			name={`${settingsGroup}.${fieldName}`}
			control={control}
			render={({ field }) => (
				<NumberControl
					{...field}
					onChange={(value) =>
						field.onChange(parseInt(value, 10) || 0)
					}
					__next40pxDefaultSize
				/>
			)}
		/>
	);
};

export default NumberField;

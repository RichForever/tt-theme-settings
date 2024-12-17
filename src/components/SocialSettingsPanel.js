import {Controller, useFormContext} from 'react-hook-form';
import {
    TextControl
} from '@wordpress/components';

const SocialSettingsPanel = () => {
    const { control, watch } = useFormContext();
    const formValues = watch();

    return (
        <>
            <Controller
                name={`socialSettings.test`} // name is used as a key name in the data object; the "." means that's the object
                control={control}
                render={({ field }) => (
                    <TextControl
                        {...field}
                        label="Test label"
                        __next40pxDefaultSize
                        __nextHasNoMarginBottom
                    />
                )}
            />
        </>
    )
};

export default SocialSettingsPanel
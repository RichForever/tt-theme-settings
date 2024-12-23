import { Controller, useFormContext } from 'react-hook-form';

import { __ } from '@wordpress/i18n';
import { Button, Panel, PanelBody, TextControl, __experimentalVStack as VStack } from '@wordpress/components';

const SocialMediaItem = ({ index, name, handleRemove, isNew }) => {
    const { control, watch } = useFormContext();
    const platform = watch(`${name}.${index}.platform`);
    const title = platform || __('New Social Media', 'timbertail');

    return (
        <Panel>
            <PanelBody 
                title={title}
                initialOpen={isNew}
            >
                <VStack spacing={3}>
                    <Controller
                        name={`${name}.${index}.platform`}
                        control={control}
                        render={({ field }) => (
                            <TextControl
                                {...field}
                                label={__('Platform Name', 'timbertail')}
                                __next40pxDefaultSize
                            />
                        )}
                    />
                    <Controller
                        name={`${name}.${index}.url`}
                        control={control}
                        render={({ field }) => (
                            <TextControl
                                {...field}
                                label={__('URL', 'timbertail')}
                                __next40pxDefaultSize
                            />
                        )}
                    />
                    <Button
                        variant="secondary"
                        isDestructive
                        onClick={handleRemove}
                        style={{width: 'fit-content'}}
                    >
                        {__('Remove item', 'timbertail')}
                    </Button>
                </VStack>
            </PanelBody>
        </Panel>
    );
};

export default SocialMediaItem; 
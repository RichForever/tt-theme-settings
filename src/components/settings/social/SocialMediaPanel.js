import { useState } from 'react';

import { useFieldArray, useFormContext } from 'react-hook-form';

import { __ } from '@wordpress/i18n';
import { Button, __experimentalVStack as VStack } from '@wordpress/components';

import SocialMediaItem from './SocialMediaItem';
import FormSectionHeading from '../../common/FormSectionHeading';

const SocialMediaPanel = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'socialMediaSettings'
    });
    const [lastAddedIndex, setLastAddedIndex] = useState(null);

    const addNewSocialMedia = () => {
        append({ platform: '', url: '' });
        setLastAddedIndex(fields.length);
    };

    return (
        <VStack spacing={4}>
            <FormSectionHeading label={__('Social Media', 'timbertail')} helpText={__('Add your social media platforms', 'timbertail')} />
            {fields.length === 0 ? (
                <p>{__('No social media links added yet. Click the button below to add one.', 'timbertail')}</p>
            ) : (
                fields.map((field, index) => (
                    <SocialMediaItem 
                        key={field.id}
                        index={index}
                        name={'socialMediaSettings'}
                        handleRemove={() => remove(index)}
                        isNew={index === lastAddedIndex}
                    />
                ))
            )}
            
            <Button
                    variant="secondary"
                    onClick={addNewSocialMedia}
                    style={{width: 'fit-content'}}
                >
                    {__('Add item', 'timbertail')}
                </Button>
            
        </VStack>
    );
};

export default SocialMediaPanel;
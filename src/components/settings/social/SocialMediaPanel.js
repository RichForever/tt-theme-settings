import { useState } from '@wordpress/element';

import { useFieldArray, useFormContext } from 'react-hook-form';

import {
	Button,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalConfirmDialog as ConfirmDialog,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalHeading as Heading,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalHStack as HStack,
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import Section from '@components/layout/Section';
import { useConfirmDialog } from '@hooks/useConfirmDialog';
import SocialMediaItem from '@components/settings/social/SocialMediaItem';

const SocialMediaPanel = () => {
	const { control } = useFormContext();
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'socialMediaSettings',
	});
	const [lastAddedIndex, setLastAddedIndex] = useState(null);

	const handleAddNew = () => {
		append({ platform: '', url: '' });
		setLastAddedIndex(fields.length);
	};

	const handleRemoveItem = (index) => {
		remove(index);
	};

	const handleRemoveAllItems = () => {
		remove();
		setLastAddedIndex(null);
	};

	const { isOpen, handleShowDialog, handleConfirm, handleCancel } =
		useConfirmDialog(handleRemoveAllItems);

	return (
		<Section
			sectionTitle={__('Social Media', 'timbertail')}
			sectionDescription={__(
				'Add your social media platforms',
				'timbertail'
			)}
		>
			<VStack spacing={4}>
				{fields.length === 0 ? (
					<p>
						{__(
							'No social media links added yet. Click the button below to add one.',
							'timbertail'
						)}
					</p>
				) : (
					<div>
						{fields.map((field, index) => (
							<SocialMediaItem
								key={field.id}
								index={index}
								settingsGroup={'socialMediaSettings'}
								handleRemove={() => handleRemoveItem(index)}
								isNew={index === lastAddedIndex}
							/>
						))}
					</div>
				)}

				<ConfirmDialog
					isOpen={isOpen}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
					cancelButtonText={__('No, thanks', 'timbertail')}
					confirmButtonText={__('Yes, please!', 'timbertail')}
				>
					<Heading level={4}>{__('Confirm', 'timbertail')}</Heading>
					<p>
						{__(
							'Are you sure you want to remove all items?',
							'timbertail'
						)}
					</p>
				</ConfirmDialog>

				<HStack justify="flex-start">
					<Button
						variant="secondary"
						onClick={handleAddNew}
						style={{ width: 'fit-content' }}
					>
						{__('Add item', 'timbertail')}
					</Button>

					{fields.length > 0 && (
						<Button
							variant="secondary"
							isDestructive
							onClick={handleShowDialog}
							style={{ width: 'fit-content' }}
						>
							{__('Remove all items', 'timbertail')}
						</Button>
					)}
				</HStack>
			</VStack>
		</Section>
	);
};

export default SocialMediaPanel;

import { useState } from '@wordpress/element';

export const useConfirmDialog = (onConfirmCallback) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleShowDialog = () => {
		setIsOpen(true);
	};

	const handleConfirm = () => {
		onConfirmCallback();
		setIsOpen(false);
	};

	const handleCancel = () => {
		setIsOpen(false);
	};

	return {
		isOpen,
		handleShowDialog,
		handleConfirm,
		handleCancel,
	};
};

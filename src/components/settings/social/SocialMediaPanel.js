import { useState } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";

import { __ } from "@wordpress/i18n";
import {
  Button,
  __experimentalVStack as VStack,
  __experimentalHStack as HStack,
  __experimentalConfirmDialog as ConfirmDialog,
  SnackbarList,
  Snackbar,
} from "@wordpress/components";

import SocialMediaItem from "./SocialMediaItem";
import FormSectionHeading from "../../common/FormSectionHeading";

const SocialMediaPanel = () => {
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialMediaSettings",
  });
  const [lastAddedIndex, setLastAddedIndex] = useState(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [notices, setNotices] = useState([]);

  const handleAddNew = () => {
    append({ platform: "", url: "" });
    setLastAddedIndex(fields.length);
  };

  const handleRemoveAllItems = () => {
    remove();
    setLastAddedIndex(null);
    setIsConfirmDialogOpen(false);
  };

  const handleShowConfirmDialog = () => {
    setIsConfirmDialogOpen(true);
  };

  const handleRemoveItem = (index) => {
    const platform = watch(`socialMediaSettings.${index}.platform`);
    const noticeId = Date.now();

    remove(index);

    setNotices((prev) => [
      ...prev,
      {
        id: noticeId,
        content: platform
          ? __(`"${platform}" item removed successfully`, "timbertail")
          : __("Item removed successfully", "timbertail"),
      },
    ]);

    // setTimeout(() => {
    //     setNotices(prev => prev.filter(notice => notice.id !== noticeId));
    // }, 1500);
  };

  const handleConfirm = () => {
    handleRemoveAllItems();
  };

  const handleCancel = () => {
    setIsConfirmDialogOpen(false);
  };

  return (
    <VStack spacing={4}>
      <FormSectionHeading
        label={__("Social Media", "timbertail")}
        helpText={__("Add your social media platforms", "timbertail")}
      />
      {fields.length === 0 ? (
        <p>
          {__(
            "No social media links added yet. Click the button below to add one.",
            "timbertail",
          )}
        </p>
      ) : (
        fields.map((field, index) => (
          <SocialMediaItem
            key={field.id}
            index={index}
            name={"socialMediaSettings"}
            handleRemove={() => handleRemoveItem(index)}
            isNew={index === lastAddedIndex}
          />
        ))
      )}

      <SnackbarList notices={notices} />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        cancelButtonText={__("No, thanks", "timbertail")}
        confirmButtonText={__("Yes, please!", "timbertail")}
      >
        {__("Are you sure you want to remove all items?", "timbertail")}
      </ConfirmDialog>

      <HStack justify="flex-start">
        <Button
          variant="secondary"
          onClick={handleAddNew}
          style={{ width: "fit-content" }}
        >
          {__("Add item", "timbertail")}
        </Button>

        {fields.length > 0 && (
          <Button
            variant="secondary"
            isDestructive
            onClick={handleShowConfirmDialog}
            style={{ width: "fit-content" }}
          >
            {__("Remove all items", "timbertail")}
          </Button>
        )}
      </HStack>
    </VStack>
  );
};

export default SocialMediaPanel;

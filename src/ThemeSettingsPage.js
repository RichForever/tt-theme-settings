import { useEffect } from 'react';

import { FormProvider, useForm } from 'react-hook-form';

import { __ } from '@wordpress/i18n';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  __experimentalHeading as Heading,
  Notice,
  Snackbar,
  Spinner,
  TabPanel,
  __experimentalConfirmDialog as ConfirmDialog,
  __experimentalHStack as HStack
} from '@wordpress/components';

import { useSettingsManager } from 'hooks/useSettingsManager';
import { useConfirmDialog } from 'hooks/useConfirmDialog';
import ScriptsPanel from 'components/settings/scripts/ScriptsPanel';
import SocialMediaPanel from 'components/settings/social/SocialMediaPanel';
import CommonPanel from 'components/settings/common/CommonPanel';
import { defaultSettings } from 'config/defaultSettings';

const ThemeSettingsPage = () => {
  const { notice, dismissNotice, settings, submitSettings, isFetchingSettings, snackbar } =
    useSettingsManager();

  // Initialize React Hook Form
  const formMethods = useForm({
    defaultValues: settings
  });

  // Reset form values when the settings are loaded
  useEffect(() => {
    if (settings) {
      formMethods.reset(settings); // Update form values dynamically
    }
  }, [settings]);

  const handleSubmitForm = async (data) => {
    console.log(data);
    await submitSettings(data);
  };

  const handleResetSettings = () => {
    submitSettings(defaultSettings);
    formMethods.reset(defaultSettings);
  };

  const { isOpen, handleShowDialog, handleConfirm, handleCancel } =
    useConfirmDialog(handleResetSettings);

  const tabs = [
    {
      name: 'commonSettings',
      title: 'Common',
      className: 'tab',
      component: <CommonPanel />
    },
    {
      name: 'scriptsSettings',
      title: 'Scripts',
      className: 'tab',
      component: <ScriptsPanel />
    },
    {
      name: 'socialMediaSettings',
      title: 'Social Media',
      className: 'tab',
      component: <SocialMediaPanel />
    }
  ];

  return (
    <>
      {notice.isVisible && (
        <div style={{ marginBottom: '.75rem', marginTop: '.75rem' }}>
          <Notice status={notice.type} onDismiss={dismissNotice}>
            {notice.message}
          </Notice>
        </div>
      )}

      {snackbar.isVisible && <Snackbar>{snackbar.message}</Snackbar>}

      <ConfirmDialog
        isOpen={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        cancelButtonText={__('No, keep my settings', 'timbertail')}
        confirmButtonText={__('Yes, reset all', 'timbertail')}
      >
        {__('Are you sure you want to reset all settings to their default values?', 'timbertail')}
      </ConfirmDialog>

      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmitForm)}>
          <Card isRounded={false}>
            <CardHeader>
              <Heading level={1} style={{ fontWeight: 600 }}>
                {__('Theme Settings', 'timbertail')}
              </Heading>
            </CardHeader>
            <CardBody>
              {isFetchingSettings ? (
                <Spinner />
              ) : (
                <TabPanel tabs={tabs}>{(tab) => tab.component}</TabPanel>
              )}
            </CardBody>
            <CardFooter>
              <HStack spacing={4} justify="flex-start">
                <Button
                  type="submit"
                  variant="primary"
                  isBusy={formMethods.formState.isSubmitting}
                  disabled={formMethods.formState.isSubmitting}
                >
                  {formMethods.formState.isSubmitting
                    ? __('Saving...', 'timbertail')
                    : __('Save settings', 'timbertail')}
                </Button>
                <Button
                  variant="tertiary"
                  onClick={handleShowDialog}
                  disabled={formMethods.formState.isSubmitting}
                >
                  {__('Reset settings', 'timbertail')}
                </Button>
              </HStack>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </>
  );
};

export default ThemeSettingsPage;

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
  Spinner,
  TabPanel
} from '@wordpress/components';

import { useSettingsManager } from 'hooks/useSettingsManager';
import ScriptsPanel from 'components/settings/scripts/ScriptsPanel';
import SocialMediaPanel from 'components/settings/social/SocialMediaPanel';
import CommonPanel from 'components/settings/common/CommonPanel';

const ThemeSettingsPage = () => {
  const { dismissNotice, notice, submitSettings, settings, isFetchingSettings } =
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
              <Button
                type="submit"
                variant="primary"
                style={{ width: 'fit-content' }}
                isBusy={formMethods.formState.isSubmitting}
                disabled={formMethods.formState.isSubmitting}>
                {formMethods.formState.isSubmitting
                  ? __('Saving...', 'timbertail')
                  : __('Save settings', 'timbertail')}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </FormProvider>
    </>
  );
};

export default ThemeSettingsPage;

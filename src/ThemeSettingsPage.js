import {useEffect} from 'react';
import {__} from '@wordpress/i18n';
import {
    __experimentalHeading as Heading,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Notice,
    TabPanel,
} from '@wordpress/components';

import {FormProvider, useForm} from 'react-hook-form';
import {useSettingsManager } from "./hooks/useSettingsManager";
import ContentContainer from "./components/layout/ContentContainer";
import ScriptsSettingsPanel from "./components/ScriptsSettingsPanel";
import SocialSettingsPanel from "./components/SocialSettingsPanel";

const ThemeSettingsPage = () => {
    const {
        dismissNotice,
        notice,
        submitSettings,
        settings,
        isFetchingSettings,
    } = useSettingsManager();

    // Initialize React Hook Form
    const formMethods = useForm({
        defaultValues: settings, // Set default form values to settings state
    })

    // Reset form values when the settings are loaded
    useEffect(() => {
        if (settings) {
            formMethods.reset(settings); // Update form values dynamically
        }
    }, [settings]);

    const handleSubmitForm = async (data) => {
        console.log(data)
        await submitSettings(data);
    }

    if (isFetchingSettings) {
        return <p>{__('Loading...', 'timbertail')}</p>;
    }

    const tabs = [
        {
            name: 'scriptsSettings',
            title: 'Scripts',
            className: 'tab',
            component: <ScriptsSettingsPanel />,
        },
        {
            name: 'socialSettings',
            title: 'Social',
            className: 'tab',
            component: <SocialSettingsPanel />,
        }
    ]

    return (
        <>
            {notice.isVisible && (
                <div style={{marginBottom: ".75rem", marginTop: ".75rem"}}>
                    <Notice status={notice.type} onDismiss={dismissNotice}>
                        {notice.message}
                    </Notice>
                </div>
                )
            }

            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(handleSubmitForm)}>
                    <Card isRounded={false}>
                        <CardHeader>
                            <Heading level={1} style={{fontWeight: 600}}>{__('Theme Settings', 'timbertail')}</Heading>
                        </CardHeader>
                        <CardBody>
                            <TabPanel
                                tabs={tabs}
                            >
                                {(tab) => (
                                    <ContentContainer>
                                        {tab.component}
                                    </ContentContainer>
                                )}
                            </TabPanel>
                        </CardBody>
                        <CardFooter>
                            <Button
                                type="submit"
                                variant="primary"
                                style={{width: 'fit-content'}}
                                isBusy={formMethods.formState.isSubmitting}
                                disabled={formMethods.formState.isSubmitting}
                            >
                                {
                                    formMethods.formState.isSubmitting
                                        ? __('Saving...', 'timbertail')
                                        : __('Save settings', 'timbertail') }
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </FormProvider>
        </>
    );
};

export default ThemeSettingsPage;

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

import {useThemeSettings} from "./hooks/useThemeSettings";
import ScriptsPanel from "./components/ScriptsPanel";
import Container from "./components/Container";

const OptionsPage = () => {
    const {
        dismissNotice,
        isButtonBusy,
        notice,
        saveSettings,
        scriptsSettings,
        updateNotice,
        updateScriptsSettings
    } = useThemeSettings();

    return (
        <>
            {notice.isVisible && (
                <>
                    <Notice status={notice.type} onDismiss={dismissNotice}>
                        {notice.message}
                    </Notice>
                </>
            )
            }

            <Card isRounded={false}>
                <CardHeader>
                    <Heading level={1}>{__('Theme Settings', 'timbertail')}</Heading>
                </CardHeader>
                <CardBody>
                    <TabPanel
                        tabs={[
                            {
                                name: 'tab-scripts',
                                title: 'Scripts',
                                className: 'tab',
                                component: <ScriptsPanel scriptsSettings={scriptsSettings}
                                                         updateScriptsSettings={updateScriptsSettings}/>
                            },
                        ]}
                    >
                        {(tab) => (
                            <Container>
                                {tab.component}
                            </Container>
                        )}
                    </TabPanel>
                </CardBody>
                <CardFooter>
                    <Button variant="primary" onClick={saveSettings} style={{width: 'fit-content'}}
                            isBusy={isButtonBusy} disabled={isButtonBusy}>
                        {__('Save settings', 'timbertail')}
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
};

export default OptionsPage;

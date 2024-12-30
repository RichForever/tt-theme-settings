import { __ } from '@wordpress/i18n';

import Section from '@components/layout/Section';
import ScriptField from '@components/settings/scripts/ScriptField';

const ScriptsPanel = () => {
	const sections = [
		{
			fieldName: 'head',
			sectionTitle: __('Scripts in Header', 'timbertail'),
			sectionDescription: __(
				'These scripts will be printed in the <head> section',
				'timbertail'
			),
		},
		{
			fieldName: 'body',
			sectionTitle: __('Scripts in Body', 'timbertail'),
			sectionDescription: __(
				'These scripts will be printed in the <body> section',
				'timbertail'
			),
		},
		{
			fieldName: 'footer',
			sectionTitle: __('Scripts in Footer', 'timbertail'),
			sectionDescription: __(
				'These scripts will be printed in the <footer> section',
				'timbertail'
			),
		},
	];

	return (
		<>
			{sections.map(({ fieldName, sectionTitle, sectionDescription }) => (
				<Section
					key={fieldName}
					sectionTitle={sectionTitle}
					sectionDescription={sectionDescription}
				>
					<ScriptField
						settingsGroup="scriptsSettings"
						fieldName={fieldName}
					/>
				</Section>
			))}
		</>
	);
};

export default ScriptsPanel;

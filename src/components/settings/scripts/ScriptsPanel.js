import { __ } from '@wordpress/i18n';

import Section from 'components/layout/Section';
import ScriptField from './ScriptField';

const ScriptsPanel = () => {
  const sections = [
    {
      namePrefix: 'head',
      sectionTitle: __('Scripts in Header', 'timbertail'),
      sectionDescription: __('These scripts will be printed in the <head> section', 'timbertail')
    },
    {
      namePrefix: 'body',
      sectionTitle: __('Scripts in Body', 'timbertail'),
      sectionDescription: __('These scripts will be printed in the <body> section', 'timbertail')
    },
    {
      namePrefix: 'footer',
      sectionTitle: __('Scripts in Footer', 'timbertail'),
      sectionDescription: __('These scripts will be printed in the <footer> section', 'timbertail')
    }
  ];
  return (
    <>
      {sections.map(({ namePrefix, sectionTitle, sectionDescription }) => (
        <Section
          key={namePrefix}
          sectionTitle={sectionTitle}
          sectionDescription={sectionDescription}
        >
          <ScriptField key={namePrefix} namePrefix={namePrefix} />
        </Section>
      ))}
    </>
  );
};

export default ScriptsPanel;

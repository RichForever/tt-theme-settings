import { __ } from '@wordpress/i18n';

import Section from 'components/layout/Section';
import ToggleField from './ToggleField';
import NumberField from './NumberField';

const CommonPanel = () => {
  const sections = [
    {
      fieldName: 'excerptLength',
      sectionTitle: __('Excerpt length', 'timbertail'),
      sectionDescription: __(
        'Change the excerpt length. By default, WordPress excerpts show the first 55 words of a post.',
        'timbertail'
      ),
      component: NumberField
    },
    {
      fieldName: 'disableWordpressVersion',
      sectionTitle: __('WordPress version', 'timbertail'),
      sectionDescription: __(
        'To make it harder for malicious actors to detect which version of WordPress you are using, remove the WordPress version number from appearing anywhere in your site’s frontend code.',
        'timbertail'
      ),
      component: ToggleField
    },
    {
      fieldName: 'addSvgSupport',
      sectionTitle: __('SVG Support', 'timbertail'),
      sectionDescription: __('Enable SVG file type uploads.', 'timbertail'),
      component: ToggleField
    },
    {
      fieldName: 'disableXmlRpc',
      sectionTitle: __('XML-RPC Support', 'timbertail'),
      sectionDescription: __('Disable XML-RPC for security purposes.', 'timbertail'),
      component: ToggleField
    },
    {
      fieldName: 'disableAdminBar',
      sectionTitle: __('Admin Bar on Frontend', 'timbertail'),
      sectionDescription: __(
        'Disable the admin bar for all users except site administrators.',
        'timbertail'
      ),
      component: ToggleField
    },
    {
      fieldName: 'disableFileEdit',
      sectionTitle: __('Plugin and Theme Editor', 'timbertail'),
      sectionDescription: __('Disable the plugin/theme editor.', 'timbertail'),
      component: ToggleField
    }
  ];
  return (
    <>
      {sections.map(({ fieldName, sectionTitle, sectionDescription, component: Component }) => (
        <Section
          key={fieldName}
          sectionTitle={sectionTitle}
          sectionDescription={sectionDescription}>
          <Component settingsGroup="commonSettings" fieldName={fieldName} />
        </Section>
      ))}
    </>
  );
};

export default CommonPanel;

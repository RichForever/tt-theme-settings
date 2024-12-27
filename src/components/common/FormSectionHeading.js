import {
  __experimentalHeading as Heading,
  __experimentalText as Text
} from '@wordpress/components';

const FormSectionHeading = ({ title, description }) => {
  return (
    <div>
      <Heading level={5} weight="600">
        {title}
      </Heading>
      <Text color="#757575">{description}</Text>
    </div>
  );
};

export default FormSectionHeading;

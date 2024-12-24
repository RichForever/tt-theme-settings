import {
  __experimentalHeading as Heading,
  __experimentalText as Text,
} from "@wordpress/components";

const FormSectionHeading = ({ label, helpText }) => {
  return (
    <div>
      <Heading level={4} weight="600">
        {label}
      </Heading>
      <Text color="#757575">{helpText}</Text>
    </div>
  );
};

export default FormSectionHeading;

/* eslint-disable prettier/prettier */
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalVStack as VStack,
} from '@wordpress/components';

import FormSectionHeading from '@components/common/FormSectionHeading';

import styles from '@styles/Section.module.scss';

const Section = ({ sectionTitle, sectionDescription, children }) => {
	return (
		<div className={styles.section}>
			<VStack spacing={4}>
				<FormSectionHeading
					title={sectionTitle}
					description={sectionDescription}
				/>
				{children}
			</VStack>
		</div>
	);
};

export default Section;

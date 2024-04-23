import * as React from 'react';

import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
} from 'react-native';

import {type FormikHelpers} from 'formik';
/**
 * ? Local & Shared Imports
 */
import {FormContainer, FormField, SubmitButton} from '@shared-components/forms';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {NewDeckFormSchema} from '@services/schemas';
import {NewDeckFormType} from '@services/model';
import {iOS} from '@shared-constants/app-config';

interface NewDeckFormProps {
	onSubmit: (
		values: NewDeckFormType,
		actions: FormikHelpers<NewDeckFormType>
	) => Promise<void>;
}

export const NewDeckForm: React.FC<NewDeckFormProps> = ({onSubmit}) => {
	return (
		<KeyboardAvoidingView
			behavior={iOS ? 'padding' : 'height'}
			style={styles.root}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<FormContainer
					initialValues={{title: ''}}
					validationSchema={NewDeckFormSchema}
					onSubmit={onSubmit}
				>
					<View style={styles.container}>
						<View>
							<Text h3 center fontFamily='DMSansSemiBold' color='black'>
								What is the title of your new deck?
							</Text>
							<Separator height={16} />
							<FormField
								autoFocus={iOS ? true : false}
								field='title'
								placeholder='Deck Title'
							/>
						</View>
						<SubmitButton textLabel='Submit' />
					</View>
				</FormContainer>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'space-around',
	},
});

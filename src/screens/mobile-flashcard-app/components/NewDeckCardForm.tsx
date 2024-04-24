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

import {NewDeckCardFormSchema} from '@services/schemas';

import {iOS} from '@shared-constants/app-config';
import {DeckListQuestionType} from '@types';

interface NewDeckCardFormProps {
	onSubmit: (
		values: DeckListQuestionType,
		actions: FormikHelpers<DeckListQuestionType>
	) => Promise<void>;
	title: string;
}

export const NewDeckCardForm: React.FC<NewDeckCardFormProps> = ({
	onSubmit,
	title,
}) => {
	return (
		<KeyboardAvoidingView
			behavior={iOS ? 'padding' : 'height'}
			style={styles.root}
		>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<FormContainer
					initialValues={{
						question: '',
						answer: '',
					}}
					validationSchema={NewDeckCardFormSchema}
					onSubmit={onSubmit}
				>
					<View style={styles.container}>
						<View>
							<Text h3 center fontFamily='DMSansSemiBold' color='black'>
								{`Add question and answer to ${title} deck card`}
							</Text>
							<Separator height={25} />
							<FormField
								autoFocus={iOS ? true : false}
								field='question'
								placeholder='Question'
								returnKeyType='next'
							/>
							<Separator height={16} />
							<FormField
								autoFocus={iOS ? true : false}
								field='answer'
								placeholder='Answer'
								returnKeyType='done'
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

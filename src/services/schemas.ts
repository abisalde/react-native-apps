import * as Yup from 'yup';

/**
 * ? Local Imports
 */
import type {NewDeckFormType} from './model';
import type {DeckListQuestionType} from '@types';

export const NewDeckFormSchema: Yup.Schema<NewDeckFormType> =
	Yup.object().shape({
		title: Yup.string()
			.trim()
			.min(4, 'Title must be at least 4 characters')
			.max(16, 'Title must be at most 16 characters')
			.matches(
				/^[a-zA-Z]+$/,
				'Only alphabetic characters are allowed without space'
			)
			.required('Title is required')
			.label('Title'),
	});

export const NewDeckCardFormSchema: Yup.Schema<DeckListQuestionType> =
	Yup.object().shape({
		question: Yup.string()
			.trim()
			.min(4, 'Question must be at least 4 characters')
			.max(50, 'Question must not be more than 50 characters')
			.matches(/^[a-zA-Z0-9\s]+$/, 'Only alphanumeric characters are allowed')
			.required('Question is required')
			.label('Question'),

		answer: Yup.string()
			.trim()
			.min(2, 'Answer must be at least 2 characters')
			.max(50, 'Answer must not be more than 50 characters')
			.matches(/^[a-zA-Z0-9\s]+$/, 'Only alphanumeric characters are allowed')
			.required('Answer is required')
			.label('Answer'),
	});

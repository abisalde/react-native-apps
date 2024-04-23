import * as Yup from 'yup';

/**
 * ? Local Imports
 */
import type {NewDeckFormType} from './model';

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

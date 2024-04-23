import * as React from 'react';
import {FormikHelpers} from 'formik';

/**
 *
 * @returns @function NewDeck
 */
import {NewDeckForm, ScreensProvider} from '../components';

import {addDeckAsync, useAppDispatch} from '@lib/redux';

import {type NewDeckFormType} from '@services/model';
import {type MobileFlashCardEntryProps} from '@navigation/types';

export const NewDeck = ({navigation}: MobileFlashCardEntryProps) => {
	const dispatch = useAppDispatch();

	const handleSubmit = React.useCallback(
		async (
			values: NewDeckFormType,
			actions: FormikHelpers<NewDeckFormType>
		) => {
			const {title} = values;
			actions.setSubmitting(true);

			try {
				await dispatch(addDeckAsync(title));
			} catch (err) {
			} finally {
				actions.resetForm();
				actions.setSubmitting(false);
				navigation.reset({
					index: 0,
					routes: [{name: 'MOBILE_FLASHCARD_ENTRY'}],
				});
			}
		},
		[dispatch]
	);

	return (
		<ScreensProvider>
			<NewDeckForm onSubmit={handleSubmit} />
		</ScreensProvider>
	);
};

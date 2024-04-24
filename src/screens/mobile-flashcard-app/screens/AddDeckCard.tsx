import * as React from 'react';
import {type FormikHelpers} from 'formik';

/**
 * ? Local & Shared Imports
 */
import {NewDeckCardForm, ScreensProvider} from '../components';

import {addCardToDeckAsync, useAppDispatch} from '@lib/redux';

import type {DeckListQuestionType} from '@types';
import type {MobileFlashCardAddCardDeckProps} from '@navigation/types';

export const AddDeckCard = ({
	navigation,
	route,
}: MobileFlashCardAddCardDeckProps) => {
	const dispatch = useAppDispatch();
	const title = route.params?.title ?? '';

	const handleSubmit = React.useCallback(
		async (
			values: DeckListQuestionType,
			actions: FormikHelpers<DeckListQuestionType>
		) => {
			try {
				await dispatch(addCardToDeckAsync({title, card: values}));
			} catch (error) {
			} finally {
				actions.resetForm();
				actions.setSubmitting(false);
				navigation.goBack();
			}
		},
		[title]
	);

	const setTitle = React.useCallback(() => {
		const text = `Add Card to ${title}`;
		navigation.setOptions({title: text});
	}, [navigation, title]);

	React.useLayoutEffect(() => {
		setTitle();
	}, []);

	return (
		<ScreensProvider>
			<NewDeckCardForm title={title} onSubmit={handleSubmit} />
		</ScreensProvider>
	);
};

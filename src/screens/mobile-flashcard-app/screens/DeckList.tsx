import * as React from 'react';
import {ActivityIndicator, GestureResponderEvent} from 'react-native';

/**
 *
 * @returns @function DeckList
 */
import {DeckBox, ScreensProvider} from '../components';

import {allDecks, isLoading, useAppSelector} from '@lib/redux';
import {palette} from '@app-theme';

import {type MobileFlashCardEntryProps} from '@navigation/types';

export const DeckList = ({navigation}: MobileFlashCardEntryProps) => {
	const decksList = useAppSelector(allDecks);
	const loading = useAppSelector(isLoading);

	const navigateTo = React.useCallback(
		(e: GestureResponderEvent) => {
			e.stopPropagation();
			// navigation.navigate()
		},
		[navigation]
	);

	return (
		<ScreensProvider>
			{loading === 'loading' ? (
				<ActivityIndicator size='large' animating color={palette.purpleLight} />
			) : (
				Object.keys(decksList).map((deck, index) => {
					const questions = decksList[deck].questions;
					return (
						<DeckBox
							onPress={navigateTo}
							key={index.toString() + deck}
							id={deck}
							questions={questions}
						/>
					);
				})
			)}
		</ScreensProvider>
	);
};

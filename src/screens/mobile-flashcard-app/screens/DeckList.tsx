import * as React from 'react';
import {ActivityIndicator, GestureResponderEvent} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
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
		(e: GestureResponderEvent, title: string) => {
			e.persist();
			e.stopPropagation();
			navigation.navigate('MOBILE_FLASHCARD_SINGLE_DECK_SCREEN', {title});
		},
		[navigation]
	);

	return (
		<ScreensProvider>
			{loading === 'loading' ? (
				<ActivityIndicator size='large' animating color={palette.purpleLight} />
			) : (
				<ScrollView
					horizontal={false}
					showsVerticalScrollIndicator={false}
					style={{flex: 1}}
				>
					{Object.keys(decksList).map((deck, index) => {
						const questions = decksList[deck].questions;
						return (
							<DeckBox
								onPress={(e) => navigateTo(e, deck)}
								key={index.toString() + deck}
								id={deck}
								questions={questions}
							/>
						);
					})}
				</ScrollView>
			)}
		</ScreensProvider>
	);
};

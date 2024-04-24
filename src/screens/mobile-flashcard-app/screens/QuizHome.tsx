import * as React from 'react';
import {StyleSheet, View} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {ScreensProvider} from '../components';

import {Text} from '@shared-components/text-wrapper';

import {
	allDecks,
	deleteDeckAsync,
	deleteStatus,
	useAppDispatch,
	useAppSelector,
} from '@lib/redux';

import type {MobileFlashCardQuizHomeProps} from '@navigation/types';

export const QuizHome = ({navigation, route}: MobileFlashCardQuizHomeProps) => {
	const dispatch = useAppDispatch();
	const decks = useAppSelector(allDecks);
	const title = route.params?.title ?? '';

	const deck = React.useMemo(() => {
		const sortedDeck = decks[title];
		return {
			id: title,
			questions: sortedDeck?.questions ?? [],
		};
	}, [decks, title]);

	const setTitle = React.useCallback(() => {
		const text = `${title} Quiz`;
		navigation.setOptions({title: text});
	}, [navigation, title]);

	React.useLayoutEffect(() => {
		setTitle();
	}, []);

	return (
		<ScreensProvider>
			{deck.questions.length === 0 ? (
				<View style={styles.empty}>
					<Text center h2 fontFamily='DMSansSemiBold' color='black'>
						Sorry, you cannot take a quiz because there are no cards in deck
					</Text>
				</View>
			) : (
				<View>
					<Text>QuizHome</Text>
				</View>
			)}
		</ScreensProvider>
	);
};

const styles = StyleSheet.create({
	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

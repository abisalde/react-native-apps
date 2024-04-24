import * as React from 'react';
import {
	GestureResponderEvent,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {DeckBox, ScreensProvider} from '../components';

import {Button} from '@shared-components/button';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {
	allDecks,
	deleteDeckAsync,
	deleteStatus,
	useAppDispatch,
	useAppSelector,
} from '@lib/redux';

import type {MobileFlashCardDeckProps} from '@navigation/types';

export const Deck = ({navigation, route}: MobileFlashCardDeckProps) => {
	const dispatch = useAppDispatch();
	const decks = useAppSelector(allDecks);
	const isDeleting = useAppSelector(deleteStatus);
	const deckTitle = route.params?.title;

	if (typeof deckTitle === 'undefined')
		return navigation.reset({
			index: 0,
			routes: [{name: 'MOBILE_FLASHCARD_ENTRY'}],
		});

	const deck = React.useMemo(() => {
		const sortedDeck = decks[deckTitle];
		return {
			id: deckTitle,
			questions: sortedDeck?.questions ?? [],
		};
	}, [decks, deckTitle]);

	const setTitle = React.useCallback(() => {
		navigation.setOptions({title: deckTitle});
	}, [navigation, deckTitle]);

	React.useLayoutEffect(() => {
		setTitle();
	}, []);

	const handleDelete = React.useCallback(
		async (e: GestureResponderEvent) => {
			e.stopPropagation();
			const res = await dispatch(deleteDeckAsync(deckTitle));

			if (res.meta.requestStatus === 'fulfilled') {
				navigation.reset({
					index: 0,
					routes: [{name: 'MOBILE_FLASHCARD_ENTRY'}],
				});
			}
		},
		[dispatch, deckTitle, navigation]
	);

	const navigateTo = React.useCallback(
		(e: GestureResponderEvent, screen: 'add_card' | 'start_quiz') => {
			e.stopPropagation();
		},
		[]
	);
	return (
		<ScreensProvider style={styles.root}>
			<DeckBox id={deck.id} questions={deck.questions} style={styles.deckBox} />
			<View style={styles.buttonContainer}>
				<Button
					accessibilityRole='button'
					accessibilityLabel='add card to a deck'
					textLabel='Add Card'
					onPress={(e) => navigateTo(e, 'add_card')}
					loading={isDeleting === 'loading'}
				/>
				<Separator height={16} />
				<Button
					accessibilityRole='button'
					accessibilityLabel='start quiz on a deck'
					textLabel='Start Quiz'
					onPress={(e) => navigateTo(e, 'start_quiz')}
					loading={isDeleting === 'loading'}
				/>
			</View>
			<TouchableOpacity
				onPress={handleDelete}
				accessibilityRole='button'
				accessibilityLabel='delete a deck'
				activeOpacity={0.7}
			>
				<Text h3 center fontFamily='DMSansSemiBold' color='error'>
					Delete Deck
				</Text>
			</TouchableOpacity>
		</ScreensProvider>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	deckBox: {
		backgroundColor: 'transparent',
	},
	buttonContainer: {
		width: '100%',
	},
});

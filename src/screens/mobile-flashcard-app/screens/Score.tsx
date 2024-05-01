import * as React from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {ScreensProvider} from '../components';

import {Button} from '@shared-components/button';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {palette} from '@app-theme';

import type {MobileFlashCardScoreProps} from '@navigation/types';

export const Score = ({navigation, route}: MobileFlashCardScoreProps) => {
	const {id = '', correctAnswers = 0, totalQuestion = 0} = route.params;

	const setTitle = React.useCallback(() => {
		const text = `${id} Quiz Score`;
		navigation.setOptions({title: text});
	}, [navigation, id]);

	React.useLayoutEffect(() => {
		setTitle();
	}, []);

	const score = Math.round((correctAnswers / totalQuestion) * 100);

	const navigateTo = React.useCallback(
		(e: GestureResponderEvent, screen: 'deck' | 'quiz') => {
			e.stopPropagation();
			navigation.navigate(
				screen === 'deck'
					? 'MOBILE_FLASHCARD_SINGLE_DECK_SCREEN'
					: 'MOBILE_FLASHCARD_QUIZ_HOME_SCREEN',
				{title: id}
			);
		},
		[navigation, id]
	);

	return (
		<ScreensProvider style={styles.container}>
			<View>
				<Text center h2 color='black' fontFamily='DMSansSemiBold'>
					{id} Quiz Completed
				</Text>
				<Separator height={10} />
				<Text center h4 color='black' fontFamily='DMSansMedium'>
					You answered {correctAnswers} correctly out of {totalQuestion}{' '}
					{totalQuestion > 1 ? 'questions' : 'question'}
				</Text>
				<Separator height={20} />
			</View>
			<Text
				h1
				center
				color={score >= 65 ? 'success' : 'error'}
				fontFamily='DMSansBold'
			>
				{score} %
			</Text>
			<View style={styles.btnContainer}>
				<Button
					accessibilityLabel='Navigate back to restart quiz'
					textLabel='Restart Quiz'
					style={[styles.btn, styles.backBtn]}
					onPress={(e) => navigateTo(e, 'quiz')}
				/>
				<Button
					accessibilityLabel='Navigate back to deck home'
					textLabel='Back to Deck'
					style={styles.btn}
					onPress={(e) => navigateTo(e, 'deck')}
				/>
			</View>
		</ScreensProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
	},
	btnContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	btn: {
		width: '47%',
	},
	backBtn: {
		backgroundColor: palette.success,
	},
});

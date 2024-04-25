import * as React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Animated as RNAnimated,
	GestureResponderEvent,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from 'react-native-reanimated';
import {Swipeable} from 'react-native-gesture-handler';

/**
 * ? Local & Shared Imports
 */
import {ScreensProvider} from '../components';

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
import {useQuiz} from '@hooks';

import {palette} from '@app-theme';

import type {MobileFlashCardQuizHomeProps} from '@navigation/types';
import {Card} from '@shared-components/card';

export const QuizHome = ({navigation, route}: MobileFlashCardQuizHomeProps) => {
	const dispatch = useAppDispatch();
	const decks = useAppSelector(allDecks);
	const {state} = useQuiz();

	const rotation = useSharedValue(0);
	const [showAnswer, setShowAnswer] = React.useState(false);

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

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{perspective: 1000}, {rotateY: `${rotation.value}deg`}],
	}));

	// const flipCard = React.useCallback(
	// 	(e: GestureResponderEvent) => {
	// 		e.persist();
	// 		e.stopPropagation();
	// 		rotation.value = withSpring(rotation.value === 0 ? 180 : 0);
	// 		setShowAnswer((prev) => !prev);
	// 		console.log({rotation});
	// 	},
	// 	[rotation]
	// );
	const flipCard = () => {
		RNAnimated.timing(animatedValue, {
			toValue: showAnswer ? 0 : 1,
			duration: 500,
			useNativeDriver: true,
		}).start(() => setShowAnswer((prev) => !prev));
	};

	const animatedValue = React.useRef(new RNAnimated.Value(0)).current;

	const interpolateRotation = animatedValue.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '180deg'],
	});

	const frontAnimatedStyle = {
		transform: [{rotateY: interpolateRotation}],
	};

	const backAnimatedStyle = {
		transform: [
			{
				rotateY: interpolateRotation.interpolate({
					inputRange: [0, 1],
					outputRange: ['180deg', '360deg'],
				}),
			},
		],
	};

	return (
		<ScreensProvider>
			{deck.questions.length === 0 ? (
				<View style={styles.empty}>
					<Text center h2 fontFamily='DMSansSemiBold' color='black'>
						Sorry, you cannot take a quiz because there are no cards in deck
					</Text>
				</View>
			) : (
				<View style={styles.container}>
					<Text center h3 fontFamily='DMSansMedium' color='grey2'>
						{state.questionIndex + 1} of {deck.questions.length}{' '}
						{deck.questions.length > 1 ? 'questions' : 'question'}
					</Text>
					<Separator height={30} />
					<View style={styles.wrapper}>
						<View style={styles.flipContainer}>
							<RNAnimated.View style={[styles.cardFlip, frontAnimatedStyle]}>
								<Card style={styles.card}>
									<Text h2 center fontFamily='DMSansSemiBold' color='black'>
										{deck.questions[state.questionIndex]?.question}
									</Text>
									<TouchableOpacity
										accessibilityRole='button'
										accessibilityLabel='show answer to question'
										activeOpacity={0.75}
									>
										<Separator height={10} />
										<Text h3 center fontFamily='DMSansSemiBold' color='success'>
											Show Answer
										</Text>
									</TouchableOpacity>
								</Card>
							</RNAnimated.View>
							<RNAnimated.View
								style={[styles.cardFlip, styles.flipBack, backAnimatedStyle]}
							>
								<Card style={styles.card}>
									<Text h2 center fontFamily='DMSansSemiBold' color='black'>
										{deck.questions[state.questionIndex]?.answer}
									</Text>
									<TouchableOpacity
										accessibilityRole='button'
										accessibilityLabel='show question to answer'
										activeOpacity={0.75}
									>
										<Separator height={10} />
										<Text h3 center fontFamily='DMSansSemiBold' color='grey'>
											Show Question
										</Text>
									</TouchableOpacity>
								</Card>
							</RNAnimated.View>
						</View>
						<View>
							<View style={styles.btnContainer}>
								<Button
									disabled={state.disabledButtons}
									textLabel='Correct'
									style={[styles.btn, !state.disabledButtons && styles.correct]}
								/>
								<Button
									disabled={state.disabledButtons}
									textLabel='InCorrect'
									style={[
										styles.btn,
										!state.disabledButtons && styles.inCorrect,
									]}
								/>
							</View>
							<Separator height={20} />
							<Button textLabel='Next' />
						</View>
					</View>
				</View>
			)}
		</ScreensProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	empty: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	wrapper: {
		flex: 1,
		justifyContent: 'space-around',
	},
	flipContainer: {
		width: '100%',
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
	correct: {
		backgroundColor: palette.success,
	},
	inCorrect: {
		backgroundColor: palette.error,
	},
	card: {
		borderRadius: 8,
	},
	cardFlip: {
		borderRadius: 8,
		overflow: 'hidden',
		backfaceVisibility: 'hidden',
	},
	flipBack: {
		position: 'absolute',
		// top: 0,
		// left: 0,
		// right: 0,
		// bottom: 0,
	},
});

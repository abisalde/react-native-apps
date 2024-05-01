import * as React from 'react';
import {
	StyleSheet,
	TouchableOpacity,
	View,
	Animated,
	GestureResponderEvent,
} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {ScreensProvider} from '../components';

import {Button} from '@shared-components/button';
import {Card} from '@shared-components/card';
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {allDecks, useAppSelector} from '@lib/redux';
import {useQuiz} from '@hooks';

import {scaledPixel} from '@utils/normalize';
import {palette} from '@app-theme';

import type {MobileFlashCardQuizHomeProps} from '@navigation/types';

export const QuizHome = ({navigation, route}: MobileFlashCardQuizHomeProps) => {
	const decks = useAppSelector(allDecks);
	const {state, markQuestion, nextQuestion, reset} = useQuiz();

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

	const animatedValue = React.useRef(new Animated.Value(0)).current;
	let angleRef = React.useRef(0);

	const flipCard = React.useCallback(
		(e: GestureResponderEvent) => {
			e.stopPropagation();
			const toValue = angleRef.current >= 90 ? 0 : 180;
			Animated.spring(animatedValue, {
				toValue,
				friction: 8,
				tension: 10,
				useNativeDriver: true,
			}).start();
		},
		[angleRef, animatedValue]
	);

	React.useEffect(() => {
		const listener = animatedValue.addListener(({value}) => {
			angleRef.current = value;
		});

		return () => {
			animatedValue.removeListener(listener);
		};
	}, [angleRef, animatedValue]);

	React.useEffect(() => {
		const totalQuestion = deck.questions.length;

		if (state.count >= totalQuestion) {
			navigation.navigate('MOBILE_FLASHCARD_SCORE_SCREEN', {
				id: title,
				correctAnswers: state.correctAnswers,
				totalQuestion,
			});
			reset();
		}
	}, [state, navigation, title, reset]);

	const frontInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ['0deg', '180deg'],
	});
	const backInterpolate = animatedValue.interpolate({
		inputRange: [0, 180],
		outputRange: ['180deg', '360deg'],
	});

	const frontAnimatedStyle = {
		transform: [{rotateY: frontInterpolate}],
	};

	const backAnimatedStyle = {
		transform: [{rotateY: backInterpolate}],
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
							<Animated.View
								style={[styles.cardFlip, styles.flipBack, frontAnimatedStyle]}
							>
								<Card style={styles.card}>
									<Text h2 center fontFamily='DMSansSemiBold' color='black'>
										{deck.questions[state.questionIndex]?.question}
									</Text>
									<TouchableOpacity
										accessibilityRole='button'
										accessibilityLabel='show answer to question'
										activeOpacity={0.75}
										onPress={flipCard}
										style={styles.flipBtn}
										disabled={state.showAnswer}
									>
										<Separator height={10} />
										<Text h3 center fontFamily='DMSansSemiBold' color='success'>
											Show Answer
										</Text>
									</TouchableOpacity>
								</Card>
							</Animated.View>
							<Animated.View style={[styles.cardFlip, backAnimatedStyle]}>
								<Card style={styles.card}>
									<Text h2 center fontFamily='DMSansSemiBold' color='black'>
										{deck.questions[state.questionIndex]?.answer}
									</Text>
									<TouchableOpacity
										accessibilityRole='button'
										accessibilityLabel='show question to answer'
										activeOpacity={0.75}
										onPress={flipCard}
										disabled={state.showAnswer}
									>
										<Separator height={10} />
										<Text h3 center fontFamily='DMSansSemiBold' color='grey'>
											Show Question
										</Text>
									</TouchableOpacity>
								</Card>
							</Animated.View>
						</View>
						<View>
							<View style={styles.btnContainer}>
								<Button
									accessibilityLabel='Is the Question Correct'
									disabled={state.disabledButtons}
									textLabel='Correct'
									style={[styles.btn, !state.disabledButtons && styles.correct]}
									onPress={(e) => markQuestion(e, true)}
								/>
								<Button
									accessibilityLabel='Is the Question InCorrect'
									disabled={state.disabledButtons}
									textLabel='InCorrect'
									style={[
										styles.btn,
										!state.disabledButtons && styles.inCorrect,
									]}
									onPress={(e) => markQuestion(e, false)}
								/>
							</View>
							<Separator height={20} />
							<Button
								accessibilityLabel='Next question'
								disabled={state.nextQuestion}
								textLabel='Next'
								onPress={(e) => nextQuestion(e, deck.questions)}
							/>
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
		alignItems: 'center',
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
		backfaceVisibility: 'hidden',
		backgroundColor: 'white',
		width: '100%',
	},
	flipBack: {
		position: 'absolute',
		top: 0,
		transform: [{rotateY: '180deg'}],
	},
	flipBtn: {
		paddingVertical: scaledPixel(16),
	},
});

import {useCallback, useReducer} from 'react';
import {GestureResponderEvent} from 'react-native';
/**
 * ? Local & Shared Imports
 */
import type {DeckListQuestionType} from '@types';

enum ACTIONS {
	MARK_QUESTION = 'MARK_QUESTION',
	NEXT_QUESTION = ' NEXT_QUESTION',
	NAVIGATE_TO_SCORE = 'NAVIGATE_TO_SCORE',
}

type QuizState = {
	questionIndex: number;
	count: number;
	correctAnswers: number;
	disabledButtons: boolean;
	showAnswer: boolean;
	nextQuestion: boolean;
};

type QuizActions =
	| {
			type: ACTIONS.MARK_QUESTION;
			payload: {status: boolean};
	  }
	| {type: ACTIONS.NEXT_QUESTION; payload: {questions: DeckListQuestionType[]}}
	| {
			type: ACTIONS.NAVIGATE_TO_SCORE;
	  };

const initialState: QuizState = {
	questionIndex: 0,
	count: 0,
	correctAnswers: 0,
	disabledButtons: false,
	showAnswer: true,
	nextQuestion: true,
};

const quizReducer = (state: QuizState, action: QuizActions) => {
	switch (action.type) {
		case ACTIONS.MARK_QUESTION:
			return {
				...state,
				correctAnswers: action.payload.status
					? state.correctAnswers + 1
					: state.correctAnswers,
				disabledButtons: true,
				showAnswer: false,
				nextQuestion: false,
			};
		case ACTIONS.NEXT_QUESTION:
			return {
				...state,
				questionIndex:
					state.questionIndex >= action.payload.questions.length - 1
						? 0
						: state.questionIndex + 1,
				count: state.count + 1,
				showAnswer: true,
				disabledButtons: false,
				nextQuestion: true,
			};
		case ACTIONS.NAVIGATE_TO_SCORE:
			return initialState;
		default:
			return state;
	}
};

export const useQuiz = () => {
	const [state, dispatch] = useReducer(quizReducer, initialState);

	const markQuestion = useCallback(
		(e: GestureResponderEvent, status: boolean) => {
			e.stopPropagation();
			dispatch({type: ACTIONS.MARK_QUESTION, payload: {status}});
		},
		[dispatch]
	);

	const nextQuestion = useCallback(
		(e: GestureResponderEvent, questions: DeckListQuestionType[]) => {
			e.stopPropagation();
			dispatch({type: ACTIONS.NEXT_QUESTION, payload: {questions}});
		},
		[dispatch]
	);

	const reset = useCallback(() => {
		dispatch({type: ACTIONS.NAVIGATE_TO_SCORE});
	}, [dispatch]);

	return {
		state,
		dispatch,
		markQuestion,
		nextQuestion,
		reset,
	};
};

// case 'NAVIGATE_TO_SCORE':
// 	const totalQuestion = action.questions.length;
// 	if (state.count >= totalQuestion) {
// 	  action.navigation.navigate('Score', {
// 		id: action.id,
// 		correctAnswers: state.correctAnswers,
// 		totalQuestion
// 	  });
// 	  return initialState;
// 	}
// 	return state;

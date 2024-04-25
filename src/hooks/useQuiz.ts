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
			payload: {questions: DeckListQuestionType[]; id: string; navigation: any};
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
			const totalQuestion = action.payload.questions.length;
			if (state.count >= totalQuestion) {
				return initialState;
			}
			return state;
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

	return {
		state,
		dispatch,
		markQuestion,
	};
};

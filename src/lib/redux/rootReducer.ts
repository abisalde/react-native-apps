import {combineReducers, Reducer} from '@reduxjs/toolkit';

/**
 * ? Local & Shared Imports
 */
import {RootState} from './types';

const flashcardReducer = (state = {}, action) => {
	return state;
};

export const appReducers = combineReducers({
	flashcard: flashcardReducer,
});

const RESET_ALL_APP_STATE = 'RESET_APPS_STATE';

export const RESET_APP_STATE = {
	type: RESET_ALL_APP_STATE,
};

export const rootReducers: Reducer<RootState> = (state, action) => {
	if (action.type === RESET_ALL_APP_STATE) {
		return appReducers(undefined, action);
	}

	return appReducers(state, action);
};

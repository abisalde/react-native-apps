import {Action, combineReducers, Reducer} from '@reduxjs/toolkit';

/**
 * ? Local & Shared Imports
 */

import {flashcardDeckSlice} from './slices';
import {RootState} from './types';

export const appReducers = combineReducers({
	flashcard_deck: flashcardDeckSlice.reducer,
});

const RESET_ALL_APP_STATE = 'RESET_APPS_STATE';

export const RESET_APP_STATE: Action = {
	type: RESET_ALL_APP_STATE,
};

export const rootReducers: Reducer<RootState> = (state, action) => {
	if (action.type === RESET_ALL_APP_STATE) {
		return appReducers(undefined, action);
	}

	return appReducers(state, action);
};

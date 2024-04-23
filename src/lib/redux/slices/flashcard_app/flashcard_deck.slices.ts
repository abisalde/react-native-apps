import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

/**
 * ? Local & Shared Imports
 */
import {loadAllFlashcardDecksAsync} from './thunks';
import {type DeckListType} from '@types';

type DeckState = {
	last_updated: number;
	status: 'idle' | 'loading' | 'failed';
	decks: Record<string, DeckListType>;
};

const initialState: DeckState = {
	decks: {},
	status: 'idle',
	last_updated: Date.now(),
};

export const flashcardDeckSlice = createSlice({
	name: 'decks',
	initialState,
	reducers: {
		addDeck: (state, payload) => {},
		removeDeck: () => {},
		addCardToDeck: () => {},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadAllFlashcardDecksAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loadAllFlashcardDecksAsync.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(loadAllFlashcardDecksAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.decks = action.payload;
				state.last_updated = Date.now();
			});
	},
});

export const {addDeck, removeDeck, addCardToDeck} = flashcardDeckSlice.actions;

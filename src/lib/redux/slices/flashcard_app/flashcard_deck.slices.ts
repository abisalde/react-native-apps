import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

/**
 * ? Local & Shared Imports
 */
import {
	addCardToDeckAsync,
	addDeckAsync,
	deleteDeckAsync,
	loadAllFlashcardDecksAsync,
} from './thunks';
import type {DeckListQuestionType, DeckListType} from '@types';

type DeckState = {
	last_updated: number;
	status: 'idle' | 'loading' | 'failed';
	decks: Record<string, DeckListType>;
	deleteStatus: 'idle' | 'loading' | 'failed';
};

const initialState: DeckState = {
	decks: {},
	status: 'idle',
	last_updated: Date.now(),
	deleteStatus: 'idle',
};

export const flashcardDeckSlice = createSlice({
	name: 'decks',
	initialState,
	reducers: {},
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

		builder.addCase(
			addDeckAsync.fulfilled,
			(state, action: PayloadAction<{title: string}>) => {
				const {title = ''} = action.payload;
				state.decks[title] = {
					title,
					questions: [],
				};
			}
		);

		builder
			.addCase(deleteDeckAsync.pending, (state) => {
				state.deleteStatus = 'loading';
			})
			.addCase(deleteDeckAsync.rejected, (state) => {
				state.deleteStatus = 'failed';
			})
			.addCase(
				deleteDeckAsync.fulfilled,
				(state, action: PayloadAction<{id: string}>) => {
					state.deleteStatus = 'idle';
					const {id = ''} = action.payload;
					delete state.decks[id];
				}
			);

		builder.addCase(
			addCardToDeckAsync.fulfilled,
			(
				state,
				action: PayloadAction<{title: string; card: DeckListQuestionType}>
			) => {
				state.decks[action.payload.title].questions.push(action.payload.card);
			}
		);
	},
});

/**
 * ?? Local & Shared Imports
 */
import {createAppAsyncThunk} from '@lib/redux/createAppAsyncThunk';
import {storage} from '@local-storage';
import {FLASHCARD_DECK_STORAGE} from '@shared-constants/app-config';

import {flashcardDecks} from '@utils/flashcard_database';

import type {DeckListQuestionType} from '@types';

export const loadAllFlashcardDecksAsync = createAppAsyncThunk(
	'flashcardsApp/loadAllDecks',
	async (_, thunkAPI) => {
		let deckJSON = await storage.getItem(FLASHCARD_DECK_STORAGE);

		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			if (deckJSON === null || Object.keys(JSON.parse(deckJSON)).length === 0) {
				await storage.setItem(
					FLASHCARD_DECK_STORAGE,
					JSON.stringify(flashcardDecks)
				);
				return flashcardDecks;
			}

			return JSON.parse(deckJSON);
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to load flashcard decks');
		}
	}
);

export const addDeckAsync = createAppAsyncThunk(
	'flashcardsApp/addDecks',
	async (title: string, thunkAPI) => {
		try {
			const decks = {
				[title]: {
					title,
					questions: [],
				},
			};

			await storage.mergeItem(FLASHCARD_DECK_STORAGE, JSON.stringify(decks));

			return {title};
		} catch (error) {
			return thunkAPI.rejectWithValue('Cannot add deck, please try again!');
		}
	}
);

type AddCardToDeck = {
	title: string;
	card: DeckListQuestionType;
};

export const addCardToDeckAsync = createAppAsyncThunk(
	'flashcardsApp/addCardToDeck',
	async ({title, card}: AddCardToDeck, thunkAPI) => {
		try {
			const deckJSON = await storage.getItem(FLASHCARD_DECK_STORAGE);
			const singleDeskJSON = deckJSON ? JSON.parse(deckJSON)[title] : {};

			const deck = {
				[title]: {
					questions: [...singleDeskJSON.questions].concat(card),
				},
			};
			await storage.mergeItem(FLASHCARD_DECK_STORAGE, JSON.stringify(deck));
			return {title, card};
		} catch (error) {
			return thunkAPI.rejectWithValue(
				'Cannot add card to a deck, please try again'
			);
		}
	}
);

export const deleteDeckAsync = createAppAsyncThunk(
	'flashcardsApp/deleteDeck',
	async (id: string, thunkAPI) => {
		try {
			const deckJSON = await storage.getItem(FLASHCARD_DECK_STORAGE);
			const deckData = deckJSON ? JSON.parse(deckJSON) : {};

			deckData[id] = undefined;
			delete deckData[id];
			await new Promise((resolve) => setTimeout(resolve, 800));
			await storage.setItem(FLASHCARD_DECK_STORAGE, JSON.stringify(deckData));

			return {id};
		} catch (error) {
			return thunkAPI.rejectWithValue('Unable to be able to delete the deck');
		}
	}
);

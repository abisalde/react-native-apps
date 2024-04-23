/**
 * ?? Local & Shared Imports
 */
import {createAppAsyncThunk} from '@lib/redux/createAppAsyncThunk';
import {storage} from '@local-storage';
import {FLASHCARD_DECK_STORAGE} from '@shared-constants/app-config';
import {flashcardDecks} from '@utils/flashcard_database';

export const loadAllFlashcardDecksAsync = createAppAsyncThunk(
	'flashcardsApp/loadAllDecks',
	async (_, thunkAPI) => {
		let deckJSON = await storage.getItem(FLASHCARD_DECK_STORAGE);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			if (deckJSON === null) {
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

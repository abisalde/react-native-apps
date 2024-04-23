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
		const deckJSON = await storage.getItem(FLASHCARD_DECK_STORAGE);
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			return deckJSON ? JSON.parse(deckJSON) : flashcardDecks;
		} catch (error) {
			return thunkAPI.rejectWithValue('Failed to load flashcard decks');
		}
	}
);

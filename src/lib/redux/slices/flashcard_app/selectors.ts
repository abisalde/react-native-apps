/**
 * ? Local & Shared Imports
 */
import type {ReduxState} from '../../types';

export const allDecks = (state: ReduxState) => state.flashcard_deck.decks;
export const isLoading = (state: ReduxState) => state.flashcard_deck.status;
export const deleteStatus = (state: ReduxState) =>
	state.flashcard_deck.deleteStatus;

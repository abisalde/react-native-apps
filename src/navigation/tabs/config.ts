/**
 * @description  - Mobile Flashcard App Tab Configs
 * @param {Icon, Screens}
 */

import {DeckList, NewDeck} from '@screens/mobile-flashcard-app/screens';
import {ROUTES} from '../routes';

/**
 * ? SCREENS
 */
export const MobileFlashcardTabConfigs = {
	new_deck: {
		name: ROUTES.MF_NEW_DECK,
		component: NewDeck,
		options: {
			title: 'New Deck',
		},
	},
	deck_list: {
		name: ROUTES.MF_DECK_LIST,
		component: DeckList,
		options: {
			title: 'Decks',
		},
	},
};

import type {StackScreenProps} from '@react-navigation/stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {CompositeScreenProps} from '@react-navigation/native';

/**
 * ? Local & Shared Imports
 */
import {ROUTES} from './routes';
import type {
	MobileFlashCardTabList,
	MobileFlashCardTabsProps,
	ExtractScreenType,
} from './tabs/types';

/**
 * MOBILE_FLASHCARD_TYPES
 */
export type MobileFlashCardStackList = {
	[ROUTES.MOBILE_FLASHCARD_ENTRY]: undefined;
	[ROUTES.MF_SINGLE_DECK]: {title: string};
};

export type MobileFlashCardEntryProps = NativeStackScreenProps<
	MobileFlashCardStackList,
	keyof ExtractScreenType<MobileFlashCardTabsProps>
>;

export type MobileFlashCardDeckProps = NativeStackScreenProps<
	MobileFlashCardStackList,
	'MOBILE_FLASHCARD_SINGLE_DECK_SCREEN'
>;

/**
 * MOBILE_FLASHCARD_TYPES ENDS HERE
 */

export type FitnessAppStackList = {
	[ROUTES.FITNESS_ENTRY]: undefined;
};

export type FitnessAppEntryProps = NativeStackScreenProps<
	FitnessAppStackList,
	'FITNESS_ENTRY'
>;

export type APPEntryProps = NativeStackScreenProps<
	AppStackScreensList,
	'APP_ENTRY_SCREEN_EXAMPLES_APP'
>;

export type AppStackScreensList = {
	[ROUTES.APP_ENTRY_SCREEN]: undefined;
	[ROUTES.MOBILE_FLASHCARD_ENTRY_SCREEN]: MobileFlashCardStackList;
	[ROUTES.FITNESS_ENTRY_SCREEN]: undefined;
};

export interface RootStackParamList
	extends AppStackScreensList,
		MobileFlashCardStackList {}

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

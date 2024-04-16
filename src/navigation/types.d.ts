import type {StackScreenProps} from '@react-navigation/stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';

/**
 * ? Local & Shared Imports
 */
import {ROUTES} from './routes';

export type MobileFlashCardStackList = {
	[ROUTES.MOBILE_FLASHCARD_ENTRY]: undefined;
};

export type FitnessAppStackList = {
	[ROUTES.FITNESS_ENTRY]: undefined;
};

export type APPEntryProps = NativeStackScreenProps<
	AppStackScreensList,
	'APP_ENTRY_SCREEN_EXAMPLES_APP'
>;

export type MobileFlashCardEntryProps = NativeStackScreenProps<
	MobileFlashCardStackList,
	'MOBILE_FLASHCARD_ENTRY'
>;

export type FitnessAppEntryProps = NativeStackScreenProps<
	FitnessAppStackList,
	'FITNESS_ENTRY'
>;

export type AppStackScreensList = {
	[ROUTES.APP_ENTRY_SCREEN]: undefined;
	[ROUTES.MOBILE_FLASHCARD_ENTRY_SCREEN]: undefined;
	[ROUTES.FITNESS_ENTRY_SCREEN]: undefined;
};

export interface RootStackParamList extends AppStackScreensList {}

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

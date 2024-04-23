import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {MaterialTopTabScreenProps} from '@react-navigation/material-top-tabs';

import {ROUTES} from '../routes';

export type MobileFlashCardTabList = {
	[ROUTES.MF_DECK_LIST]: undefined;
	[ROUTES.MF_NEW_DECK]: undefined;
};

export type MobileFlashCardTabsProps =
	| BottomTabScreenProps<MobileFlashCardTabList>
	| MaterialTopTabScreenProps<MobileFlashCardTabList>;

export type ExtractScreenType<T> = T extends BottomTabScreenProps<infer S>
	? S
	: T extends MaterialTopTabScreenProps<infer S>
	? S
	: never;

export type FitnessAppTabList = {};

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

/**
 * ? Local & Shared Imports
 */
import {Android} from '@shared-constants/app-config';
import {type MobileFlashCardTabList} from './types';

const Tabs = Android
	? createMaterialTopTabNavigator<MobileFlashCardTabList>()
	: createBottomTabNavigator<MobileFlashCardTabList>();

export const MobileFlashCardTab = () => {};

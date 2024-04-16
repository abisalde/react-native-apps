import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
/**
 * ? SCREENS
 */
import MobileFlashCardEntry from '@screens/mobile-flashcard-app';

import {Android} from '@shared-constants/app-config';
import {ROUTES} from './routes';
import {type MobileFlashCardStackList} from './types';

const Stack = createNativeStackNavigator<MobileFlashCardStackList>();

const Tabs = Android
	? createMaterialTopTabNavigator()
	: createBottomTabNavigator();

export const MobileFlashCardStack = () => (
	<Stack.Navigator
		initialRouteName={ROUTES.MOBILE_FLASHCARD_ENTRY}
		screenOptions={{headerShown: false}}
	>
		<Stack.Screen
			name={ROUTES.MOBILE_FLASHCARD_ENTRY}
			component={MobileFlashCardEntry}
		/>
	</Stack.Navigator>
);

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
/**
 * ? SCREENS
 */
import {AppEntry} from '@screens/entry';
import {Android} from '@shared-constants/app-config';

const Stack = createNativeStackNavigator();

const Tabs = Android
	? createMaterialTopTabNavigator()
	: createBottomTabNavigator();

export const MobileFlashCardStack = () => (
	<Stack.Navigator
		initialRouteName='MOBILE_FLASHCARD_ENTRY'
		screenOptions={{headerShown: false}}
	>
		<Stack.Screen name='MOBILE_FLASHCARD_ENTRY' component={AppEntry} />
	</Stack.Navigator>
);

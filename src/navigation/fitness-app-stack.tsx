import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
/**
 * ? SCREENS
 */
import FitnessAppEntry from '@screens/fitness-app';

import {Android} from '@shared-constants/app-config';
import {ROUTES} from './routes';
import {type FitnessAppStackList} from './types';

const Stack = createNativeStackNavigator<FitnessAppStackList>();

const Tabs = Android
	? createMaterialTopTabNavigator()
	: createBottomTabNavigator();

export const FitnessAppStack = () => (
	<Stack.Navigator
		initialRouteName={ROUTES.FITNESS_ENTRY}
		screenOptions={{headerShown: false}}
	>
		<Stack.Screen name={ROUTES.FITNESS_ENTRY} component={FitnessAppEntry} />
	</Stack.Navigator>
);

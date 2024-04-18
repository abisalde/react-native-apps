import {createNativeStackNavigator} from '@react-navigation/native-stack';
/**
 * ? SCREENS
 */
import FitnessAppEntry from '@screens/fitness-app';

import {ROUTES} from './routes';
import {type FitnessAppStackList} from './types';

const Stack = createNativeStackNavigator<FitnessAppStackList>();

export const FitnessAppStack = () => (
	<Stack.Navigator
		initialRouteName={ROUTES.FITNESS_ENTRY}
		screenOptions={{headerShown: false}}
	>
		<Stack.Screen name={ROUTES.FITNESS_ENTRY} component={FitnessAppEntry} />
	</Stack.Navigator>
);

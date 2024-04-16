import {createNativeStackNavigator} from '@react-navigation/native-stack';

/**
 * ? SCREENS
 */
import {AppEntry} from '@screens/entry';

import {FitnessAppStack} from './fitness-app-stack';
import {MobileFlashCardStack} from './mobile-flashcard-app-stack';
import {ROUTES} from './routes';

/**
 * ? types
 */
import {AppStackScreensList} from './types';

const Stack = createNativeStackNavigator<AppStackScreensList>();

export const AppStack = () => (
	<Stack.Navigator
		initialRouteName={ROUTES.APP_ENTRY_SCREEN}
		screenOptions={{headerShown: false}}
	>
		<Stack.Screen name={ROUTES.APP_ENTRY_SCREEN} component={AppEntry} />
		<Stack.Screen
			name={ROUTES.MOBILE_FLASHCARD_ENTRY_SCREEN}
			component={MobileFlashCardStack}
		/>
		<Stack.Screen
			name={ROUTES.FITNESS_ENTRY_SCREEN}
			component={FitnessAppStack}
		/>
	</Stack.Navigator>
);

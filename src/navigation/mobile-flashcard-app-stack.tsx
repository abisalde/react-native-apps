import {createNativeStackNavigator} from '@react-navigation/native-stack';
/**
 * ? SCREENS
 */
import MobileFlashCardEntry from '@screens/mobile-flashcard-app';

import {ROUTES} from './routes';
import {type MobileFlashCardStackList} from './types';

const Stack = createNativeStackNavigator<MobileFlashCardStackList>();

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

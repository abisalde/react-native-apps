import {createNativeStackNavigator} from '@react-navigation/native-stack';

/**
 * ? SCREENS
 */
import {AppEntry} from '@screens/entry';

const Stack = createNativeStackNavigator();

export const AppStack = () => (
	<Stack.Navigator
		initialRouteName='APP_ENTRY_SCREEN'
		screenOptions={{headerShown: false}}
	>
		<Stack.Screen name='APP_ENTRY_SCREEN' component={AppEntry} />
	</Stack.Navigator>
);

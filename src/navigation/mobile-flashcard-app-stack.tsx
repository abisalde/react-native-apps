import {createStackNavigator} from '@react-navigation/stack';
import Constants from 'expo-constants';
import type {StackNavigationOptions} from '@react-navigation/stack/lib/typescript/src/types';
/**
 * ? SCREENS
 */
import {MobileFlashCardTab} from './tabs';

import {ROUTES} from './routes';
import {palette} from '@app-theme';
import {fontPixel} from '@utils/normalize';

import {type MobileFlashCardStackList} from './types';

const Stack = createStackNavigator<MobileFlashCardStackList>();

export const MobileFlashCardStack = () => (
	<Stack.Navigator
		initialRouteName={ROUTES.MOBILE_FLASHCARD_ENTRY}
		screenOptions={{
			headerMode: 'screen',
		}}
	>
		<Stack.Screen
			name={ROUTES.MOBILE_FLASHCARD_ENTRY}
			component={MobileFlashCardTab}
			options={commonOptions({title: 'Flashcard', hideBackButton: true})}
		/>
	</Stack.Navigator>
);

type CommonOptionsProps = {
	hideBackButton?: boolean;
} & Partial<StackNavigationOptions>;

const commonOptions = ({
	title,
	hideBackButton,
	...props
}: CommonOptionsProps): StackNavigationOptions => ({
	headerTintColor: palette.white,
	headerStyle: {
		backgroundColor: palette.purple,
		height: Constants.statusBarHeight + 40,
	},
	headerTitleStyle: {
		fontSize: fontPixel(23),
		textAlign: 'center',
	},
	title,
	headerTitleAlign: 'center',
	headerLeft: hideBackButton ? () => null : undefined,
	...props,
});

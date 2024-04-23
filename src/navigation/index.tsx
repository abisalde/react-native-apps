/** CORE **/
import * as React from 'react';
import {enableScreens} from 'react-native-screens';
import {StatusBar} from 'expo-status-bar';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
	createNavigationContainerRef,
	NavigationContainer,
} from '@react-navigation/native';
import {useReactNavigationDevTools} from '@dev-plugins/react-navigation';
/**
 *
 * ? Local & Shared Imports
 */

import {LightTheme} from '@app-theme';
import {ThemeProvider} from '@lib/providers';

import {RootStackParamList} from './types';
import {AppStack} from './AppStack';

enableScreens();

interface RefObject<T> {
	current: T | null;
}

const Navigation: React.FC = () => {
	const isReady: RefObject<boolean> = React.createRef<boolean>();
	const navigationRef = createNavigationContainerRef<RootStackParamList>();

	useReactNavigationDevTools(navigationRef);

	React.useEffect((): any => {
		return () => (isReady.current = false);
	}, [isReady]);

	return (
		<GestureHandlerRootView style={{flex: 1}}>
			<ThemeProvider>
				<NavigationContainer
					ref={navigationRef}
					onReady={() => {
						isReady.current = true;
					}}
					theme={LightTheme}
				>
					<AppStack />
					<StatusBar style='auto' />
				</NavigationContainer>
			</ThemeProvider>
		</GestureHandlerRootView>
	);
};

export default Navigation;

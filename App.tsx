import * as React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import {useFonts} from 'expo-font';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
/**
 * ? Local & Shared Imports
 */

import Navigation from '@app-navigation';
import fonts from '@fonts';
import {StoreProvider} from '@lib/providers';

const customFonts = Object.assign({}, fonts, FontAwesome.font, Feather.font);

export default function App() {
	const [loaded, error] = useFonts(customFonts);

	React.useEffect(() => {
		if (error) throw error;
	}, [error]);

	React.useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<StoreProvider>
			<Navigation />
		</StoreProvider>
	);
}

import * as React from 'react';
import {View} from 'react-native';

/**
 *
 * @returns @function NewDeck
 */
import {ScreensProvider} from '../components';
import {Text} from '@shared-components/text-wrapper';
import {palette} from '@app-theme';

export const NewDeck = () => {
	return (
		<ScreensProvider style={{backgroundColor: palette.lightGreen}}>
			<View>
				<Text>New Deck</Text>
			</View>
		</ScreensProvider>
	);
};

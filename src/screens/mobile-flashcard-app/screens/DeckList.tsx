import * as React from 'react';
import {View} from 'react-native';

/**
 *
 * @returns @function DeckList
 */
import {ScreensProvider} from '../components';
import {Text} from '@shared-components/text-wrapper';
import {palette} from '@app-theme';

export const DeckList = () => {
	return (
		<ScreensProvider style={{backgroundColor: palette.lightGreen}}>
			<View>
				<Text>Deck List</Text>
			</View>
		</ScreensProvider>
	);
};

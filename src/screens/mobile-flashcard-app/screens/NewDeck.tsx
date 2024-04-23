import * as React from 'react';
import {View} from 'react-native';

/**
 *
 * @returns @function NewDeck
 */
import {ScreensProvider} from '../components';
import {Text} from '@shared-components/text-wrapper';

import {type MobileFlashCardEntryProps} from '@navigation/types';

export const NewDeck = ({}: MobileFlashCardEntryProps) => {
	return (
		<ScreensProvider>
			<View>
				<Text>New Deck</Text>
			</View>
		</ScreensProvider>
	);
};

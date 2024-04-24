import * as React from 'react';
import {StyleSheet, View} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {ScreensProvider} from '../components';

import {Text} from '@shared-components/text-wrapper';

import type {MobileFlashCardScoreProps} from '@navigation/types';

export const Score = ({navigation, route}: MobileFlashCardScoreProps) => {
	return (
		<ScreensProvider>
			<View>
				<Text>Score</Text>
			</View>
		</ScreensProvider>
	);
};

const styles = StyleSheet.create({});

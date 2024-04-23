import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';

/**
 * ? Local & Shared Imports
 */

import {
	ScreenWrapper,
	type ScreenWrapperProps,
} from '@shared-components/screen-wrapper';

import {palette} from '@app-theme';

export const ScreensProvider: React.FC<ScreenWrapperProps> = (
	props: ScreenWrapperProps
) => (
	<>
		<ScreenWrapper {...props} style={[styles.root, props.style]} />
		<StatusBar translucent style='light' backgroundColor={palette.purple} />
	</>
);

const styles = StyleSheet.create({
	root: {
		backgroundColor: palette.lightGreen,
	},
});

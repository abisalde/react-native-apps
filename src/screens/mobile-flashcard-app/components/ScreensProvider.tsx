import * as React from 'react';
import {StatusBar} from 'expo-status-bar';

/**
 * ? Local & Shared Imports
 */

import {
	ScreenWrapper,
	type ScreenWrapperProps,
} from '@shared-components/screen-wrapper';

import {palette} from '@app-theme';
import {Android} from '@shared-constants/app-config';

export const ScreensProvider: React.FC<ScreenWrapperProps> = (
	props: ScreenWrapperProps
) => (
	<>
		<ScreenWrapper {...props} />
		<StatusBar
			translucent
			style={Android ? 'light' : 'dark'}
			backgroundColor={palette.purple}
		/>
	</>
);

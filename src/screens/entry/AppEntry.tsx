import * as React from 'react';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {ScreenWrapper} from '@shared-components/screen-wrapper';
import {Text} from '@shared-components/text-wrapper';
import {Button} from '@shared-components/button';
import {Separator} from '@shared-components/separator';

import {type APPEntryProps} from '@navigation/types';

export const AppEntry = ({navigation}: APPEntryProps) => {
	const navigateTo = React.useCallback(
		(app_name: 'flashcard' | 'fitness') => {
			navigation.navigate(
				app_name === 'fitness'
					? 'FITNESS_ENTRY_SCREEN'
					: 'MOBILE_FLASHCARD_ENTRY_SCREEN'
			);
		},
		[navigation]
	);

	return (
		<ScreenWrapper>
			<Separator height={20} />
			<Text center h2 fontFamily='DMSansSemiBold' color='black'>
				Select An App
			</Text>
			<Separator height={40} />
			<View style={styles.container}>
				<Button
					accessibilityLabel='Navigate to Mobile Flashcard App'
					accessibilityRole='button'
					textLabel='Mobile Flashcard App'
					onPress={(e: GestureResponderEvent) => {
						e.stopPropagation();
						navigateTo('flashcard');
					}}
				/>
				<Separator height={20} />
				<Button
					accessibilityLabel='Navigate to Fitness App'
					accessibilityRole='button'
					textLabel='Fitness App'
					onPress={(e: GestureResponderEvent) => {
						e.stopPropagation();
						navigateTo('fitness');
					}}
				/>
			</View>
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
	},
});

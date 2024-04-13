import * as React from 'react';
import {StyleSheet, View} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {ScreenWrapper} from '@shared-components/screen-wrapper';
import {Text} from '@shared-components/text-wrapper';
import {Button} from '@shared-components/button';
import {Separator} from '@shared-components/separator';

export const AppEntry = () => {
	return (
		<ScreenWrapper>
			<Separator height={20} />
			<Text center h2 fontFamily='DMSansSemiBold' color='black'>
				Select An App
			</Text>
			<Separator height={40} />
			<View style={styles.container}>
				<Button textLabel='Mobile Flashcard App' />
				<Separator height={20} />
				<Button textLabel='Fitness App' />
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

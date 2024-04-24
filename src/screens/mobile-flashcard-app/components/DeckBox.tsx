import * as React from 'react';
import {
	GestureResponderEvent,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';

/**
 * ? Local & Shared Imports
 */
import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';

import {palette} from '@app-theme';
import {scaledPixel} from '@utils/normalize';

import type {ViewStyleProp, DeckListQuestionType} from '@types';

interface DeckBoxProps {
	id: string | undefined;
	questions: DeckListQuestionType[];
	onPress?: (e: GestureResponderEvent) => void;
	style?: ViewStyleProp;
}

export const DeckBox: React.FC<DeckBoxProps> = ({
	id,
	questions,
	onPress = () => {},
	style,
}) => {
	if (!id)
		return (
			<View style={[styles.container, style]}>
				<Text center h3 fontFamily='DMSansSemiBold' color='black'>
					No deck on the list
				</Text>
			</View>
		);

	return (
		<>
			<View style={[styles.deckBoxContainer, style]}>
				<TouchableOpacity
					style={styles.wrapper}
					activeOpacity={0.75}
					accessibilityRole='button'
					accessibilityLabel='Navigate to deck'
					onPress={onPress}
				>
					<Text center h3 fontFamily='DMSansSemiBold' color='black'>
						{id}
					</Text>
					<Separator height={5} />
					<Text center h5 fontFamily='DMSansMedium' color='grey2'>
						{Array.isArray(questions) ? (
							<>
								{questions.length}
								{questions.length > 1 ? ' Cards' : ' Card'}
							</>
						) : null}
					</Text>
				</TouchableOpacity>
			</View>
			<Separator height={20} />
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	deckBoxContainer: {
		backgroundColor: palette.white,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		padding: scaledPixel(20),
		shadowRadius: 3,
		shadowOpacity: 0.8,
		shadowColor: palette.shadow,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		elevation: 9,
	},
	wrapper: {
		width: '100%',
	},
});

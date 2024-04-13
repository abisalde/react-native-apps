/** CORE */
import React from 'react';
import RNText, {IRNTextProps} from '@freakycoder/react-native-custom-text';

/**
 * ? Local Imports
 */
import {ColorKeys, FontKeys} from '@types';

type FontKeysType = keyof typeof FontKeys;
type ColorKeysType = keyof typeof ColorKeys;

interface ITextWrapperProps extends IRNTextProps {
	color?: ColorKeysType;
	fontFamily?: FontKeysType;
	children?: React.ReactNode;
}

export const Text: React.FC<ITextWrapperProps> = ({
	fontFamily = 'DMSansRegular',
	color = 'text',
	children,
	...rest
}) => {
	return (
		<RNText fontFamily={fontFamily} color={color} {...rest}>
			{children}
		</RNText>
	);
};

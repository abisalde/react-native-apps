import {StyleProp, TextStyle, ViewStyle} from 'react-native';

export enum FontKeys {
	DMSansBlack = 'DMSansBlack',
	DMSansBlackItalic = 'DMSansBlackItalic',
	DMSansBold = 'DMSansBold',
	DMSansBoldItalic = 'DMSansBoldItalic',
	DMSansExtraBold = 'DMSansExtraBold',
	DMSansExtraBoldItalic = 'DMSansExtraBoldItalic',
	DMSansLight = 'DMSansLight',
	DMSansMedium = 'DMSansMedium',
	DMSansMediumItalic = 'DMSansMediumItalic',
	DMSansRegular = 'DMSansRegular',
	DMSansSemiBold = 'DMSansSemiBold',
	DMSansSemiBoldItalic = 'DMSansSemiBoldItalic',
	DMSansThin = 'DMSansThin',
	DMSansThinItalic = 'DMSansThinItalic',
}

export enum ColorKeys {
	primary = 'primary',
	secondary = 'secondary',
	text = 'text',
	text2 = 'text2',
	white = 'white',
	transparent = 'transparent',
	black = 'black',
	black3 = 'black3',
	grey = 'grey',
	grey2 = 'grey2',
	grey3 = 'grey3',
	grey4 = 'grey4',
	grey5 = 'grey5',
	lightGray = 'lightGray',
	gradientOne = 'gradientOne',
	gradientTwo = 'gradientTwo',
	info = 'info',
	success = 'success',
	warning = 'warning',
	error = 'error',
	separator = 'separator',
	highlight = 'highlight',
	blackOverlay = 'blackOverlay',
	lightGreen = 'lightGreen',
	background = 'background',
	dynamicBackground = 'dynamicBackground',
	darkBg = 'darkBg',
	borderColor = 'borderColor',
	OTPBorderColor = 'OTPBorderColor',
	borderColorDark = 'borderColorDark',
	textPlaceholder = 'textPlaceholder',
	shadow = 'shadow',
	tabBgColor = 'tabBgColor',
	logoText = 'logoText',
	green = 'green',
	purple = 'purple',
	purpleLight = 'purpleLight',
	purpleD = 'purpleD',
	passwordIcon = 'passwordIcon',
	yellow = 'yellow',
}

export type ViewStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
export type TextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

export type DeckListType = {
	title: string;
	questions: DeckListQuestionType[];
};

export type DeckListQuestionType = {
	question: string;
	answer: string;
};

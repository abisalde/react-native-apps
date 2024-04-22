import {DefaultTheme, ExtendedTheme} from '@react-navigation/native';
import {Platform} from 'react-native';
import {configureFonts, MD3LightTheme as PaperTheme} from 'react-native-paper';

/**
 * ? Local & Shared Imports
 */
import {FontKeys} from '@types';
import {MD3Type} from 'react-native-paper/lib/typescript/types';

export const palette: PaletteColors = {
	primary: '#0B3463',
	secondary: '#64B5F5',
	text: '#0A0A0A',
	text2: '#1D2125',
	white: '#FFFFFF',
	transparent: 'transparent',
	black: '#141414',
	black3: '#282828',
	grey: '#333333',
	grey2: '#4F4F4F',
	grey3: '#757575',
	grey4: '#BDBDBD',
	grey5: '#E7E7E7',
	lightGray: '#828282',
	gradientOne: '#6BB8FF',
	gradientTwo: '#3AA1FF',
	info: '#2F80ED',
	success: '#27AE60',
	warning: '#E2893B',
	error: '#EB5757',
	separator: 'rgb(194, 194, 195)',
	highlight: 'rgb(199, 198, 203)',
	blackOverlay: 'rgba(0,0,0,0.6)',
	lightGreen: 'rgba(0, 191, 105, 0.1)',
	background: '#F5F7FB',
	dynamicBackground: '#fff',
	darkBg: '#00003D',
	borderColor: '#BDBDBD',
	OTPBorderColor: '#D4DDDF',
	borderColorDark: '#333942',
	textPlaceholder: '#BDBDBD',
	shadow: '#F5F5FF',
	green: '#00BF69',
	tabBgColor: '#F1F1F1',
	logoText: '#17395C',
	purple: '#242164',
	purpleLight: 'rgba(93, 59, 240, 0.2)',
	purpleD: '#928FFF',
	passwordIcon: '#CCD2E3',
	yellow: '#F4EB57',
};

export const LightTheme: ExtendedTheme = {
	dark: false,
	colors: {
		...DefaultTheme.colors,
		...palette,
	},
};

export interface PaletteColors {
	primary: string;
	secondary: string;
	text: string;
	text2: string;
	white: string;
	transparent: string;
	black: string;
	black3: string;
	grey: string;
	grey2: string;
	grey3: string;
	grey4: string;
	grey5: string;
	lightGray: string;
	gradientOne: string;
	gradientTwo: string;
	info: string;
	success: string;
	warning: string;
	error: string;
	separator: string;
	highlight: string;
	lightGreen: string;
	blackOverlay: string;
	background: string;
	dynamicBackground: string;
	darkBg: string;
	borderColor: string;
	OTPBorderColor: string;
	borderColorDark: string;
	textPlaceholder: string;
	shadow: string;
	tabBgColor: string;
	logoText: string;
	green: string;
	purple: string;
	purpleLight: string;
	purpleD: string;
	passwordIcon: string;
	yellow: string;
}

const fontConfig: Record<string, MD3Type> = {
	[FontKeys.DMSansMedium]: {
		fontFamily: Platform.select({
			ios: 'System',
			default: FontKeys.DMSansMedium,
		}),
		fontWeight: '400',
		letterSpacing: 0.5,
		lineHeight: 22,
		fontSize: 20,
	},
};

export const PaperLightTheme = {
	...PaperTheme,
	colors: {
		...PaperTheme.colors,
		...palette,
	},
	fonts: configureFonts({config: fontConfig}),
};

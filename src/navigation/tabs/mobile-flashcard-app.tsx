import * as React from 'react';
import {
	createBottomTabNavigator,
	type BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
	ColorValue,
	GestureResponderEvent,
	Pressable,
	StyleSheet,
	View,
} from 'react-native';
import {
	createMaterialTopTabNavigator,
	type MaterialTopTabBarProps,
} from '@react-navigation/material-top-tabs';
import {AntDesign, Ionicons} from '@expo/vector-icons';
/**
 * ? Local & Shared Imports
 */
import {MobileFlashcardTabConfigs} from './config';
import {ROUTES} from '../routes';

import {Separator} from '@shared-components/separator';
import {Text} from '@shared-components/text-wrapper';
import {fontPixel, pixelSizeVertical} from '@utils/normalize';

import {useAppDispatch, loadAllFlashcardDecksAsync} from '@lib/redux';
import {palette} from '@app-theme';
import {Android, iOS} from '@shared-constants/app-config';

import {type MobileFlashCardTabList} from './types';

const Tabs = Android
	? createMaterialTopTabNavigator<MobileFlashCardTabList>()
	: createBottomTabNavigator<MobileFlashCardTabList>();

export const MobileFlashCardTab = () => {
	const dispatch = useAppDispatch();

	React.useEffect(() => {
		dispatch(loadAllFlashcardDecksAsync());
	}, [dispatch]);

	return (
		<Tabs.Navigator
			initialRouteName={ROUTES.MF_DECK_LIST}
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: iOS ? palette.purple : palette.white,
				tabBarIndicatorStyle: {
					backgroundColor: palette.yellow,
					height: 4,
				},
			}}
			tabBar={(props) => <TabBar {...props} />}
		>
			<Tabs.Screen {...MobileFlashcardTabConfigs.deck_list} />
			<Tabs.Screen {...MobileFlashcardTabConfigs.new_deck} />
		</Tabs.Navigator>
	);
};

const TabBar: React.FC<BottomTabBarProps | MaterialTopTabBarProps> = ({
	state,
	descriptors,
	navigation,
}) => {
	return (
		<View style={styles.tabBar}>
			{state.routes.map((route, index) => {
				const {options} = descriptors[route.key];
				const name = route.name;
				const focused = state.index === index;

				const handleNavigation = (e: GestureResponderEvent) => {
					e.stopPropagation();
					navigation.navigate(route.name, route.params);
				};

				const onLongPress = (e: GestureResponderEvent) => {
					e.stopPropagation();
					// navigation.emit({
					// 	type: 'tabLongPress',
					// 	target: route.key,
					// });
				};

				return (
					<Pressable
						key={route.key + index.toString()}
						accessibilityRole='button'
						accessibilityLabel={options.title ?? route.name}
						accessibilityState={focused ? {selected: true} : {}}
						style={styles.tab}
						onPress={handleNavigation}
						onLongPress={onLongPress}
					>
						<Icon name={name} focused={focused} />
						<Separator height={5} />
						<Text
							center
							fontFamily='DMSansThin'
							style={styles.title}
							color={iOS ? 'purple' : 'white'}
						>
							{options.title}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
};

type TabItemProps = {
	focused: boolean;
	name: string;
};

type TabIconName = 'pluscircle' | 'pluscircleo';

const TabIcon = ({
	name,
	color,
}: {
	name: TabIconName;
	color?: string | ColorValue;
}) => <AntDesign name={name} color={color} size={25} />;

const Icon: React.FC<TabItemProps> = ({focused, name}) => {
	let IconComponent;

	switch (name) {
		case ROUTES.MF_DECK_LIST:
			IconComponent = focused ? (
				<Ionicons
					name='folder-sharp'
					size={25}
					color={iOS ? palette.purple : palette.white}
				/>
			) : (
				<Ionicons
					name='folder-outline'
					size={25}
					color={iOS ? palette.purple : palette.white}
				/>
			);
			break;
		case ROUTES.MF_NEW_DECK:
			IconComponent = focused ? (
				<TabIcon
					name='pluscircle'
					color={iOS ? palette.purple : palette.white}
				/>
			) : (
				<TabIcon
					name='pluscircleo'
					color={iOS ? palette.purple : palette.white}
				/>
			);
			break;
		default:
			break;
	}
	return IconComponent;
};

const styles = StyleSheet.create({
	tabBar: {
		height: 80,
		backgroundColor: iOS ? palette.white : palette.purple,
		shadowColor: palette.black3,
		shadowOffset: {
			height: 3,
			width: 0,
		},
		shadowRadius: 6,
		shadowOpacity: 1,
		elevation: 10,
		borderTopWidth: 0.1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		position: 'relative',
		marginTop: Android ? pixelSizeVertical(16) : undefined,
		paddingTop: Android ? pixelSizeVertical(35) : undefined,
		paddingBottom: Android ? pixelSizeVertical(12) : undefined,
	},
	tab: {
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
	},
	title: {
		fontSize: fontPixel(15),
		lineHeight: pixelSizeVertical(22),
		color: palette.grey3,
	},
});

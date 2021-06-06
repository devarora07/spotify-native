import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Library, Search } from '../screens';
import { APP_ROUTES } from './navigationConstant';
import HomeStack from './stackHome';
import CustomTabBar from '../components/CustomTabBar';
import SvgTabHome from '../components/icons/Svg.TabHome';
import SvgTabSearch from '../components/icons/Svg.TabSearch';
import SvgTabLibrary from '../components/icons/Svg.TabLibrary';
import { colors } from '../constants';

const Tab = createBottomTabNavigator();

type IconProps = {
    focused: boolean;
};

const HomeIcon = ({ focused }: IconProps) => <SvgTabHome active={focused} />;
const SearchIcon = ({ focused }: IconProps) => (
    <SvgTabSearch active={focused} />
);
const LibraryIcon = ({ focused }: IconProps) => (
    <SvgTabLibrary active={focused} />
);

export function BottomNavigation() {
    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            initialRouteName={APP_ROUTES.HOME}
            tabBarOptions={{
                activeTintColor: colors.white,
                inactiveTintColor: colors.greyInactive,
                style: {
                    backgroundColor: colors.grey,
                    borderTopWidth: 0
                }
            }}
        >
            <Tab.Screen
                name={APP_ROUTES.HOME}
                component={HomeStack}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: HomeIcon
                }}
            />
            <Tab.Screen
                name={APP_ROUTES.SEARCH}
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: SearchIcon
                }}
            />
            <Tab.Screen
                name={APP_ROUTES.LIBRARY}
                component={Library}
                options={{
                    tabBarLabel: 'Library',
                    tabBarIcon: LibraryIcon
                }}
            />
        </Tab.Navigator>
    );
}

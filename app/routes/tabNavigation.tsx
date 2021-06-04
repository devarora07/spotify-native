import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Home, Library, Search } from '../screens';
import { APP_ROUTES } from './navigationConstant';

const Tab = createBottomTabNavigator();

export function BottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName={APP_ROUTES.HOME}
            tabBarOptions={{
                activeTintColor: '#e91e63',
                showLabel: false,
                style: {
                    position: 'absolute',
                    bottom: 10,
                    left: 10,
                    right: 10,
                    // elevation: 0,
                    backgroundColor: 'white',
                    borderRadius: 15,
                    height: 60,
                    ...styles.shadow
                }
            }}
        >
            <Tab.Screen
                name={APP_ROUTES.HOME}
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.view}>
                            <MaterialIcons
                                name="home"
                                color={color}
                                size={size}
                            />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name={APP_ROUTES.SEARCH}
                component={Search}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name="search"
                            color={color}
                            size={size}
                        />
                    )
                }}
            />
            <Tab.Screen
                name={APP_ROUTES.LIBRARY}
                component={Library}
                options={{
                    tabBarLabel: 'Library',
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialIcons name="album" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#7F5DF0',
        shadowOffset: {
            width: 0,
            height: 10
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5
    },
    view: {
        alignItems: 'center',
        justifyContent: 'center',
        top: 0
    },
    text: {
        fontSize: 12
    }
});

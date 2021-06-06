import React from 'react';
import {
    NavigationContainer,
    NavigationContainerRef
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { APP_ROUTES } from './navigationConstant';
import { BottomNavigation } from './tabNavigation';
import { useSelector, RootStateOrAny } from 'react-redux';
import { ModalMusicPlayer, ModalMoreOptions } from '../screens';

const Stack = createStackNavigator();

export const navigationRef: React.RefObject<NavigationContainerRef> =
    React.createRef();

export function navigate(name: string, params: any) {
    navigationRef.current?.navigate(name, params);
}

const AppRoutes = () => {
    // const user = useSelector((state: RootStateOrAny) => state.user);

    return (
        <NavigationContainer ref={navigationRef}>
            {/* <BottomNavigation /> */}
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                    // headerStyle: {backgroundColor: '#111', height: 60},
                }}
            >
                <Stack.Screen name={'aa'} component={BottomNavigation} />
                <Stack.Screen name={'Player'} component={ModalMusicPlayer} />
                <Stack.Screen
                    name={'ModalMoreOptions'}
                    component={ModalMoreOptions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppRoutes;

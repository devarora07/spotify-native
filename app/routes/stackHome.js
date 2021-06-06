import * as React from 'react';
import PropTypes from 'prop-types';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Album } from '../screens';
import SvgTabHome from '../components/icons/Svg.TabHome';

const Icon = ({ focused }) => <SvgTabHome active={focused} />;

Icon.propTypes = {
    // required
    focused: PropTypes.bool.isRequired
};

const Stack = createStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName={'Home'} headerMode={'none'}>
            <Stack.Screen name={'Home'} component={Home} />
            <Stack.Screen name={'Album'} component={Album} />

            {/* {
        headerMode: 'none',
            initialRouteName: 'Home',
                navigationOptions: {
            tabBarLabel: 'Home',
                tabBarIcon: Icon
        }
    } */}
        </Stack.Navigator>
    );
};

export default HomeStack;

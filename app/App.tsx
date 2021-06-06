import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import AppRoutes from './routes/appRoutes';
import { Provider } from 'react-redux';
import store from './redux/store';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <React.Fragment>
                    <StatusBar barStyle="light-content" />
                    <AppRoutes />
                </React.Fragment>
            </Provider>
        );
    }
}

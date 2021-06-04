import React, { Component } from 'react';

import AppRoutes from './routes/appRoutes';
import { Provider } from 'react-redux';
import store from './redux/store';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <AppRoutes />
            </Provider>
        );
    }
}

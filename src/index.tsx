import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { name as appName } from '../app.json';
import { ThemeProvider } from './res/theme';
import RootStack from './routes';
import configureStore from './utils/configureStore';

// configuration
LogBox.ignoreAllLogs(true);

// optimize screen navigation
enableScreens();

// create store
const { store, persistor } = configureStore();

const AppContainer = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider>
                    <RootStack />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => AppContainer);

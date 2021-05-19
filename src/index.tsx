import React from 'react';
import { AppRegistry, LogBox } from 'react-native';
import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { name as appName } from '../app.json';
import { ThemeProvider } from './res/theme';
import RootStack from './routes';

// configuration
LogBox.ignoreAllLogs(true);

// optimize screen navigation
enableScreens();

const AppContainer = () => {
    return (
        <ThemeProvider>
            <RootStack />
        </ThemeProvider>
    );
};

AppRegistry.registerComponent(appName, () => AppContainer);

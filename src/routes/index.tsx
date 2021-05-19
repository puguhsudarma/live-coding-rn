import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from '../modules/HomeScreen/HomeScreen';

export type StackParamList = {
    HomeScreen: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="HomeScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;

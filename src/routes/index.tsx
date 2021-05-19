import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import PokemonList from '../screens/PokemonList';

export type StackParamList = {
    PokemonList: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" initialRouteName="PokemonList">
                <Stack.Screen name="PokemonList" component={PokemonList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootStack;

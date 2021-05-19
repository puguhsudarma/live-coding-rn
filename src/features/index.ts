import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import account from './account/slice';

const accountPersistedReducer = persistReducer(
    {
        key: 'account',
        storage: AsyncStorage,
        throttle: 1000,
        blacklist: ['profile'],
    },
    account,
);

export default combineReducers({
    account: accountPersistedReducer,
});

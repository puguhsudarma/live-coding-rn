import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import rootReducers from '../features';

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage: AsyncStorage,
        throttle: 1000,
        whitelist: ['account'],
    },
    rootReducers,
);

export default () => {
    const store = configureStore({
        reducer: persistedReducer,
        devTools: __DEV__,
        middleware: (getDefaultMiddleware) => {
            // if (__DEV__) {
            //   return getDefaultMiddleware().concat(logger);
            // }

            return getDefaultMiddleware();
        },
    });

    const persistor = persistStore(store);

    return { store, persistor };
};

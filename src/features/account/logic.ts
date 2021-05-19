import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../../utils/storeHooks';
import { loginSuccess } from './slice';

export const login = createAsyncThunk<
    { token: string },
    { email: string; password: string },
    { dispatch: AppDispatch; state: AppState }
>('account/login', async (props, thunkAPI) => {
    try {
        // axios call
        const token = 'tokenxxx';

        // store response
        thunkAPI.dispatch(loginSuccess({ token }));

        return { token };
    } catch (error) {
        throw error;
    }
});

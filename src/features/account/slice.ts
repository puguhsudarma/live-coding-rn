import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountState } from './model';

const initialState: AccountState = {
    access_token: null,
    expired_at: null,
    profile: null,
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ token: string }>) {
            state.access_token = action.payload.token;
        },
    },
});

export const { loginSuccess } = accountSlice.actions;

export default accountSlice.reducer;

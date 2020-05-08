import { createSlice } from '@reduxjs/toolkit';
import AccountService from '@Services/AccountService';

// Create the slice.
const slice = createSlice({
    name: "login",
    initialState: {
        isFetching: false,
        isLoginSuccess: false
    },
    reducers: {
        setFetching: (state, action) => {
            state.isFetching = action.payload;
        },
        setSuccess: (state, action) => {
            state.isLoginSuccess = action.payload;
        }
    }
});

// Export reducer from the slice.
export const { reducer } = slice;

// Define action creators.
export const actionCreators = {
    login: (model) => async (dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new AccountService();

        const result = await service.login(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));
    }
};
import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import { ILoginModel } from '@Models/ILoginModel';
import AccountService from '@Services/AccountService';

// Declare an interface of the store's state.
export interface ILoginStoreState {
    isFetching: boolean;
    isLoginSuccess: boolean;
}

// Create the slice.
const slice = createSlice({
    name: "login",
    initialState: {
        isFetching: false,
        isLoginSuccess: false
    } as ILoginStoreState,
    reducers: {
        setFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload;
        },
        setSuccess: (state, action: PayloadAction<boolean>) => {
            state.isLoginSuccess = action.payload;
        }
    }
});

// Export reducer from the slice.
export const { reducer } = slice;

// Define action creators.
export const actionCreators = {
    login: (model: ILoginModel) => async (dispatch: Dispatch) => {
        dispatch(slice.actions.setFetching(true));

        const service = new AccountService();

        const result = await service.login(model);

        if (!result.hasErrors) {
            dispatch(slice.actions.setSuccess(true));
        }

        dispatch(slice.actions.setFetching(false));
    }
};

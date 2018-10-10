import { ILoginModel } from "@Models/ILoginModel";
import { IServiceUser } from "@Models/IServiceUser";
import { clone } from "@Utils";
import { Action, Reducer } from "redux";
import AccountService from "@Services/AccountService";
import { AppThunkAction } from "./index";

export module LoginStore {

    export interface IState {
        indicators: {
            operationLoading: boolean;
            loginSuccess: boolean;
        };
    }

    export enum Actions {
        /**
         * You need to have the initial state to
         * reset the indicators (e.g. loginSuccess)
         * that call redirect or any other actions.
         * It must be called in method 'componentDidMount'
         * of a component.
         */
        Init = "LOGIN_INIT",
        Request = "LOGIN_REQUEST",
        Success = "LOGIN_SUCCESS",
        Failure = "LOGIN_FAILURE"
    }

    interface IInit {
        type: Actions.Init;
    }

    interface IRequest {
        type: Actions.Request;
    }

    interface ISuccess {
        type: Actions.Success;
        payload: IServiceUser;
    }

    interface IFailure {
        type: Actions.Failure;
    }

    type KnownAction = IInit | IRequest | ISuccess | IFailure;

    export const actionCreators = {
        init: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {
            dispatch({ type: Actions.Init });
            return;
        },
        loginRequest: (model: ILoginModel): AppThunkAction<KnownAction> => async (dispatch, getState) => {

            dispatch({ type: Actions.Request });

            var result = await AccountService.login(model);
            if (result.hasErrors) {
                dispatch({ type: Actions.Failure });
                return;
            }

            dispatch({ type: Actions.Success, payload: result.value });
            return;
        }
    }

    const initialState: IState = {
        indicators: {
            operationLoading: false,
            loginSuccess: false
        }
    };

    export const reducer: Reducer<IState> = (currentState: IState, incomingAction: Action) => {
        const action = incomingAction as KnownAction;

        var cloneIndicators = () => clone(currentState.indicators);

        switch (action.type) {
            case Actions.Init:
                return initialState;
            case Actions.Request:
                var indicators = cloneIndicators();
                indicators.operationLoading = true;
                return { ...currentState, indicators };
            case Actions.Success:
                var indicators = cloneIndicators();
                indicators.operationLoading = false;
                indicators.loginSuccess = true;
                return { ...currentState, indicators };
            case Actions.Failure:
                var indicators = cloneIndicators();
                indicators.operationLoading = false;
                return { ...currentState, indicators };
            default:
                // The following line guarantees that every action in the KnownAction union has been covered by a case above
                const exhaustiveCheck: never = action;
        }

        return currentState || initialState;
    }
}
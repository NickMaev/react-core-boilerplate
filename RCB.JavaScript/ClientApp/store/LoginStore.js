import { clone } from "@Utils";
import AccountService from "@Services/AccountService";

const Actions = {
    /**
     * You need to have the initial state to
     * reset the indicators (e.g. loginSuccess)
     * that call redirect or any other actions.
     * It must be called in method 'componentDidMount'
     * of a component.
     */
    Init: "LOGIN_INIT",
    Request: "LOGIN_REQUEST",
    Success: "LOGIN_SUCCESS",
    Failure: "LOGIN_FAILURE"
};

export const actionCreators = {
    init: () => async (dispatch, getState) => {
        dispatch({ type: Actions.Init });
        return;
    },
    loginRequest: (model) => async (dispatch, getState) => {

        dispatch({ type: Actions.Request });

        var result = await AccountService.login(model);
        if (result.hasErrors) {
            dispatch({ type: Actions.Failure });
            return;
        }

        dispatch({ type: Actions.Success, payload: result.value });
        return;
    }
};

const initialState = {
    indicators: {
        operationLoading: false,
        loginSuccess: false
    }
};

export const reducer = (currentState, incomingAction) => {

    const action = incomingAction;

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
            return currentState || initialState;
    }
};
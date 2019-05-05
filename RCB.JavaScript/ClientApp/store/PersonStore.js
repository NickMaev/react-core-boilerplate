import { clone } from "@Utils";
import PersonService from "@Services/PersonService";
import { wait } from "domain-wait";

const Actions = {
    FailureResponse: "PERSON_FAILURE_RESPONSE",
    SearchRequest: "PERSON_SEARCH_REQUEST",
    SearchResponse: "PERSON_SEARCH_RESPONSE",
    AddRequest: "PERSON_ADD_REQUEST",
    AddResponse: "PERSON_ADD_RESPONSE",
    UpdateRequest: "PERSON_UPDATE_REQUEST",
    UpdateResponse: "PERSON_UPDATE_RESPONSE",
    DeleteRequest: "PERSON_DELETE_REQUEST",
    DeleteResponse: "PERSON_DELETE_RESPONSE"
};

export const actionCreators = {
    searchRequest: (term) => async (dispatch, getState) => {

        await wait(async (transformUrl) => {

            // Wait for server prerendering.
            dispatch({ type: Actions.SearchRequest });

            var result = await PersonService.search(term);

            if (!result.hasErrors) {
                dispatch({ type: Actions.SearchResponse, payload: result.value });
            } else {
                dispatch({ type: Actions.FailureResponse });
            }
        });
    },
    addRequest: (model) => async (dispatch, getState) => {

        dispatch({ type: Actions.AddRequest });

        var result = await PersonService.add(model);

        if (!result.hasErrors) {
            model.id = result.value;
            dispatch({ type: Actions.AddResponse, payload: model });
        } else {
            dispatch({ type: Actions.FailureResponse });
        }

        return result;
    },
    updateRequest: (model) => async (dispatch, getState) => {

        dispatch({ type: Actions.UpdateRequest });

        var result = await PersonService.update(model);

        if (!result.hasErrors) {
            dispatch({ type: Actions.UpdateResponse, payload: model });
        } else {
            dispatch({ type: Actions.FailureResponse });
        }

        return result;
    },
    deleteRequest: (id) => async (dispatch, getState) => {

        dispatch({ type: Actions.DeleteRequest });

        var result = await PersonService.delete(id);

        if (!result.hasErrors) {
            dispatch({ type: Actions.DeleteResponse, id });
        } else {
            dispatch({ type: Actions.FailureResponse });
        }
    }
};

const initialState = {
    people: [],
    indicators: {
        operationLoading: false
    }
};

export const reducer = (currentState, incomingAction) => {

    const action = incomingAction;

    var cloneIndicators = () => clone(currentState.indicators);

    switch (action.type) {
        case Actions.FailureResponse:
            var indicators = cloneIndicators();
            indicators.operationLoading = false;
            return { ...currentState, indicators };
        case Actions.SearchRequest:
            var indicators = cloneIndicators();
            indicators.operationLoading = true;
            return { ...currentState, indicators };
        case Actions.SearchResponse:
            var indicators = cloneIndicators();
            indicators.operationLoading = false;
            return { ...currentState, indicators, people: action.payload };
        case Actions.UpdateRequest:
            var indicators = cloneIndicators();
            indicators.operationLoading = true;
            return { ...currentState, indicators };
        case Actions.UpdateResponse:
            var indicators = cloneIndicators();
            indicators.operationLoading = false;
            var data = clone(currentState.people);
            var itemToUpdate = data.filter(x => x.id === action.payload.id)[0];
            itemToUpdate.firstName = action.payload.firstName;
            itemToUpdate.lastName = action.payload.lastName;
            return { ...currentState, indicators, people: data };
        case Actions.AddRequest:
            var indicators = cloneIndicators();
            indicators.operationLoading = true;
            return { ...currentState, indicators };
        case Actions.AddResponse:
            var indicators = cloneIndicators();
            indicators.operationLoading = false;
            var data = clone(currentState.people);
            data.push(action.payload);
            return { ...currentState, indicators, people: data };
        case Actions.DeleteRequest:
            var indicators = cloneIndicators();
            indicators.operationLoading = true;
            return { ...currentState, indicators };
        case Actions.DeleteResponse:
            var indicators = cloneIndicators();
            indicators.operationLoading = false;
            var data = clone(currentState.people).filter(x => x.id !== action.id);
            return { ...currentState, indicators, people: data };
        default:
            return currentState || initialState;
    }
};
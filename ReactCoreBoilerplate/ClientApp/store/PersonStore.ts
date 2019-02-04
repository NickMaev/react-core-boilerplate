import { clone } from "@Utils";
import { Action, Reducer } from "redux";
import { AppThunkAction, AppThunkActionAsync } from "./index";
import PersonService from "@Services/PersonService";
import { IPersonModel } from "@Models/IPersonModel";
import { wait } from "domain-wait";
import Result from "@Models/Result";

export module PersonStore {

    export interface IState {
        people: IPersonModel[],
        indicators: {
            operationLoading: boolean;
        };
    }

    export enum Actions {
        FailureResponse = "PERSON_FAILURE_RESPONSE",
        SearchRequest = "PERSON_SEARCH_REQUEST",
        SearchResponse = "PERSON_SEARCH_RESPONSE",
        AddRequest = "PERSON_ADD_REQUEST",
        AddResponse = "PERSON_ADD_RESPONSE",
        UpdateRequest = "PERSON_UPDATE_REQUEST",
        UpdateResponse = "PERSON_UPDATE_RESPONSE",
        DeleteRequest = "PERSON_DELETE_REQUEST",
        DeleteResponse = "PERSON_DELETE_RESPONSE"
    }

    interface IFailureResponse {
        type: Actions.FailureResponse;
    }

    interface IGetAllRequest {
        type: Actions.SearchRequest;
    }

    interface IGetAllResponse {
        type: Actions.SearchResponse;
        payload: IPersonModel[];
    }

    interface IAddRequest {
        type: Actions.AddRequest;
    }

    interface IAddResponse {
        type: Actions.AddResponse;
        payload: IPersonModel;
    }

    interface IUpdateRequest {
        type: Actions.UpdateRequest;
    }

    interface IUpdateResponse {
        type: Actions.UpdateResponse;
        payload: IPersonModel;
    }

    interface IDeleteRequest {
        type: Actions.DeleteRequest;
    }

    interface IDeleteResponse {
        type: Actions.DeleteResponse;
        id: number;
    }

    type KnownAction =
        IFailureResponse |
        IGetAllRequest | IGetAllResponse |
        IAddRequest | IAddResponse |
        IUpdateRequest | IUpdateResponse |
        IDeleteRequest | IDeleteResponse;

    export const actionCreators = {
        searchRequest: (term?: string): AppThunkAction<KnownAction> => async (dispatch, getState) => {
            
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
        addRequest: (model: IPersonModel): AppThunkActionAsync<KnownAction, Result<number>> => async (dispatch, getState) => {

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
        updateRequest: (model: IPersonModel): AppThunkActionAsync<KnownAction, Result<{}>> => async (dispatch, getState) => {

            dispatch({ type: Actions.UpdateRequest });

            var result = await PersonService.update(model);

            if (!result.hasErrors) {
                dispatch({ type: Actions.UpdateResponse, payload: model });
            } else {
                dispatch({ type: Actions.FailureResponse });
            }

            return result;
        },
        deleteRequest: (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {

            dispatch({ type: Actions.DeleteRequest });

            var result = await PersonService.delete(id);

            if (!result.hasErrors) {
                dispatch({ type: Actions.DeleteResponse, id });
            } else {
                dispatch({ type: Actions.FailureResponse });
            }
        }
    }

    const initialState: IState = {
        people: [],
        indicators: {
            operationLoading: false
        }
    };

    export const reducer: Reducer<IState> = (currentState: IState, incomingAction: Action) => {
        const action = incomingAction as KnownAction;

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
                // The following line guarantees that every action in the KnownAction union has been covered by a case above
                const exhaustiveCheck: never = action;
        }

        return currentState || initialState;
    }
}
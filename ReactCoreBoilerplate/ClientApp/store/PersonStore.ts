import { ILoginModel } from "@Models/ILoginModel";
import { IServiceUser } from "@Models/IServiceUser";
import { clone } from "@Utils";
import { Action, Reducer } from "redux";
import AccountService from "@Services/AccountService";
import { AppThunkAction } from "./index";
import PersonService from "@Services/PersonService";
import { IPersonModel } from "@Models/IPersonModel";
import { wait } from "domain-wait";

export module PersonStore {

    export interface IState {
        people: IPersonModel[],
        indicators: {
            operationLoading: boolean;
        };
    }

    export enum Actions {
        GetAllRequest = "PERSON_GET_ALL_REQUEST",
        GetAllResponse = "PERSON_GET_ALL_RESPONSE",
        AddRequest = "PERSON_ADD_REQUEST",
        AddResponse = "PERSON_ADD_RESPONSE",
        UpdateRequest = "PERSON_UPDATE_REQUEST",
        UpdateResponse = "PERSON_UPDATE_RESPONSE",
        DeleteRequest = "PERSON_DELETE_REQUEST",
        DeleteResponse = "PERSON_DELETE_RESPONSE"
    }

    interface IGetAllRequest {
        type: Actions.GetAllRequest;
    }

    interface IGetAllResponse {
        type: Actions.GetAllResponse;
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
        IGetAllRequest | IGetAllResponse |
        IAddRequest | IAddResponse |
        IUpdateRequest | IUpdateResponse |
        IDeleteRequest | IDeleteResponse;

    export const actionCreators = {
        getAllRequest: (): AppThunkAction<KnownAction> => async (dispatch, getState) => {

            dispatch({ type: Actions.GetAllRequest });

            await wait(async (transformUrl) => {
                var result = await PersonService.getAll();
                if (!result.hasErrors) {
                    dispatch({ type: Actions.GetAllResponse, payload: result.value });
                }
            });
        },
        addRequest: (model: IPersonModel): AppThunkAction<KnownAction> => async (dispatch, getState) => {

            dispatch({ type: Actions.AddRequest });

            await wait(async (transformUrl) => {
                var result = await PersonService.add(model);
                if (!result.hasErrors) {
                    model.id = result.value;
                    dispatch({ type: Actions.AddResponse, payload: model });
                }
            });
        },
        updateRequest: (model: IPersonModel): AppThunkAction<KnownAction> => async (dispatch, getState) => {

            dispatch({ type: Actions.UpdateRequest });

            await wait(async (transformUrl) => {
                var result = await PersonService.update(model);
                if (!result.hasErrors) {
                    dispatch({ type: Actions.UpdateResponse, payload: model });
                }
            });
        },
        deleteRequest: (id: number): AppThunkAction<KnownAction> => async (dispatch, getState) => {

            dispatch({ type: Actions.DeleteRequest });

            await wait(async (transformUrl) => {
                var result = await PersonService.delete(id);
                if (!result.hasErrors) {
                    dispatch({ type: Actions.DeleteResponse, id });
                }
            });
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
            case Actions.GetAllRequest:
                var indicators = cloneIndicators();
                indicators.operationLoading = true;
                return { ...currentState, indicators };
            case Actions.GetAllResponse:
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
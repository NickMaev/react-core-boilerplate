import { LoginStore } from "@Store/LoginStore";
import { PersonStore } from "@Store/PersonStore";

// The top-level state object
export interface ApplicationState {
    login: LoginStore.IState;
    person: PersonStore.IState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    login: LoginStore.reducer,
    person: PersonStore.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

export interface AppThunkActionAsync<TAction, TResult> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState) : Promise<TResult>
}
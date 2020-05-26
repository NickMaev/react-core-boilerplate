import * as LoginStore from "@Store/LoginStore";
import * as PersonStore from "@Store/PersonStore";
import { connect } from "react-redux";

// The top-level state object.
export interface IApplicationState {
    login: LoginStore.ILoginStoreState;
    person: PersonStore.IPersonStoreState;
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
export interface IAppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}

export interface IAppThunkActionAsync<TAction, TResult> {
    (dispatch: (action: TAction) => void, getState: () => IApplicationState) : Promise<TResult>
}

export function withStore<TStoreState, TActionCreators, TComponent extends React.ComponentType<TStoreState & TActionCreators & any>>(
    component: TComponent,
    stateSelector: (state: IApplicationState) => TStoreState,
    actionCreators: TActionCreators
): TComponent {
    return <TComponent> <unknown>connect(stateSelector, actionCreators)(component);
}
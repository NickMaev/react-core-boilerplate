import "@babel/polyfill";
import "custom-event-polyfill";

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './configureStore';
import { ApplicationState }  from './store';
import * as RoutesModule from './routes';
let routes = RoutesModule.routes;

import "@Styles/main.scss";
import 'react-toastify/dist/ReactToastify.css';
import Globals from "@Globals";
import { isNode } from '@Utils';
import { IPublicSession } from "@Models/IPublicSession";
import { IPrivateSession } from "@Models/IPrivateSession";
import { NSerializeJson } from "nserializejson";

function setupSession() {
    if (!isNode()) {
        Globals.reset();
        Globals.init({ public: window["publicSession"] as IPublicSession, private: {} as IPrivateSession });
    }
};

function setupGlobalPlugins() {
    // Use dot notation in the name attributes of the form inputs.
    NSerializeJson.options.useDotSeparatorInPath = true;
};

function setupEvents() {
    document.addEventListener('DOMContentLoaded', () => {
        var preloader = document.getElementById("preloader");
        preloader.classList.add("hidden");
    });
};

// Create browser history to use in the Redux store.
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href')!;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as ApplicationState;
const store = configureStore(history, initialState);

function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing configuration
    // and injects the app into a DOM element.
    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={ store }>
                <ConnectedRouter history={ history } children={ routes } />
            </Provider>
        </AppContainer>,
        document.getElementById('react-app')
    );
}

setupSession();

setupGlobalPlugins();

setupEvents();

renderApp();

// Allow Hot Module Replacement.
if (module.hot) {
    module.hot.accept('./routes', () => {
        routes = require<typeof RoutesModule>('./routes').routes;
        renderApp();
    });
}
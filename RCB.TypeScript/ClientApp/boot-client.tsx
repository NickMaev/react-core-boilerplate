// Import polyfills.
import "core-js/stable";
import "custom-event-polyfill";
import "event-source-polyfill";

// Import global styles.
import "bootstrap/dist/css/bootstrap.min.css";
import "@Styles/main.scss";
import "@Styles/loaders/queryLoader.scss";
import "react-toastify/dist/ReactToastify.css";

// Other imports.
import * as React from "react";
import * as ReactDOM from "react-dom";
import configureStore from "@Store/configureStore";
import SessionManager, { IIsomorphicSessionData, ISsrSessionData } from "@Core/session";
import { AppContainer } from "react-hot-loader";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { isNode, showApplicationLoader, hideApplicationLoader } from "@Utils";
import * as RoutesModule from "./routes";
import { IApplicationState } from "@Store/index";
let routes = RoutesModule.routes;

function setupSession() {
    if (!isNode()) {
        SessionManager.resetSession();
        SessionManager.initSession({
            isomorphic: window["session"] as IIsomorphicSessionData,
            ssr: {} as ISsrSessionData
        });
    }
};

function setupGlobalPlugins() {
    // Use this function to configure plugins on the client side.
};

function setupEvents() {

    showApplicationLoader();

    document.addEventListener("DOMContentLoaded", () => {
        hideApplicationLoader();
    });
};

// Create browser history to use in the Redux store.
const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href")!;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const initialState = (window as any).initialReduxState as IApplicationState;
const store = configureStore(history, initialState);

function renderApp() {
    // This code starts up the React app when it runs in a browser. 
    // It sets up the routing configuration and injects the app into a DOM element.
    ReactDOM.hydrate(
        <AppContainer>
            <Provider store={ store }>
                <ConnectedRouter history={ history } children={ routes } />
            </Provider>
        </AppContainer>,
        document.getElementById("react-app")
    );
}

// Setup the application and render it.
setupSession();
setupGlobalPlugins();
setupEvents();
renderApp();

// Allow Hot Module Replacement.
if (module.hot) {
    module.hot.accept("./routes", () => {
        routes = require<typeof RoutesModule>("./routes").routes;
        renderApp();
    });
}
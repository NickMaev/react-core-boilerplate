import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { replace } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { createServerRenderer } from 'aspnet-prerendering';
import { routes } from './routes';
import configureStore from './configureStore';
import { Helmet } from 'react-helmet';
import Globals from "@Globals";
import { connect, getCompletedTasks } from "domain-wait";

const renderHelmet = () => {
    var helmetData = Helmet.renderStatic();
    var helmetStrings = "";
    for (var key in helmetData) {
        if (helmetData.hasOwnProperty(key)) {
            helmetStrings += helmetData[key].toString();
        }
    }
    return helmetStrings;
};

const createGlobals = (nodeSession, initialReduxState, helmetStrings) => {

    var globals = {
        completedTasks: getCompletedTasks(),
        nodeSession,
        initialReduxState,
        helmetStrings
    };

    return globals;
};

export default createServerRenderer((params) => {
    
    Globals.reset();
    Globals.init(params.data);

    return new Promise((resolve, reject) => {

        // Prepare Redux store with in-memory history, and dispatch a navigation event.
        // corresponding to the incoming URL.
        const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash.
        const urlAfterBasename = params.url.substring(basename.length);
        const store = configureStore(createMemoryHistory());
        store.dispatch(replace(urlAfterBasename));

        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin.
        const routerContext = {};
        const app = <Provider store={store}>
            <StaticRouter basename={basename} context={routerContext} location={params.location.path} children={routes} />
        </Provider>;

        const renderApp = () => {
            return renderToString(app);
        };

        // Connect 'domain-wait' library with params of the NodeServices.
        connect(params);

        // Call render app method to initiate of starting tasks.
        renderApp();

        // If there's a redirection, just send this information back to the host application.
        if (routerContext.url) {
            resolve({
                redirectUrl: routerContext.url,
                globals: createGlobals(params.data, store.getState(), renderHelmet())
            });
            return;
        }

        // Once async tasks are done, we can perform the final render.
        // We also send the redux store state, so the client can continue execution where the server left off.
        params.domainTasks.then(() => {

            var html = renderApp();

            var globals = createGlobals(params.data, store.getState(), renderHelmet());

            resolve({
                html: html,
                globals
            });

        }, reject); // Also propagate any errors back into the host application.

    });
});

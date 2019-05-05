import * as React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { replace } from 'connected-react-router';
import { createMemoryHistory } from 'history';
import { createServerRenderer, RenderResult } from 'aspnet-prerendering';
import { routes } from './routes';
import configureStore from './configureStore';
import { Helmet } from 'react-helmet';
import Globals from "@Globals";
import { INodeSession } from "@Models/INodeSession";
import { connect, getCompletedTasks } from "domain-wait";

var renderHelmet = (): string => {
    var helmetData = Helmet.renderStatic();
    var helmetStrings = "";
    for (var key in helmetData) {
        if (helmetData.hasOwnProperty(key)) {
            helmetStrings += helmetData[key].toString();
        }
    }
    return helmetStrings;
};

var createGlobals = (nodeSession, initialReduxState, helmetStrings) => {
    return {
        completedTasks: getCompletedTasks(),
        nodeSession,
        initialReduxState,
        helmetStrings
    };
};

export default createServerRenderer((params) => {
    
    Globals.reset();
    Globals.init(params.data as INodeSession);

    return new Promise<RenderResult>((resolve, reject) => {

        // Prepare Redux store with in-memory history, and dispatch a navigation event.
        // corresponding to the incoming URL.
        const basename = params.baseUrl.substring(0, params.baseUrl.length - 1); // Remove trailing slash.
        const urlAfterBasename = params.url.substring(basename.length);
        const store = configureStore(createMemoryHistory());
        store.dispatch(replace(urlAfterBasename));

        // Prepare an instance of the application and perform an inital render that will
        // cause any async tasks (e.g., data access) to begin.
        const routerContext: any = {};
        const app = (
            <Provider store={store}>
                <StaticRouter basename={basename} context={routerContext} location={params.location.path} children={routes} />
            </Provider>
        );

        const renderApp = (): string => {
            return renderToString(app);
        };

        connect(params);

        renderApp();

        // If there's a redirection, just send this information back to the host application.
        if (routerContext.url) {
            resolve({
                redirectUrl: routerContext.url,
                globals: createGlobals(params.data, store.getState(), renderHelmet())
            });
            return;
        }

        // Once any async tasks are done, we can perform the final render.
        // We also send the redux store state, so the client can continue execution where the server left off.
        params.domainTasks.then(() => {

            resolve({
                html: renderApp(),
                globals: createGlobals(params.data, store.getState(), renderHelmet())
            });

        }, reject); // Also propagate any errors back into the host application.
    });
});

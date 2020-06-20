import * as React from "react";
import SessionManager, { IWebSessionContext } from "@Core/session";
import configureStore from "@Store/configureStore";
import { createServerRenderer, RenderResult } from "aspnet-prerendering";
import { replace } from "connected-react-router";
import { addDomainWait, getCompletedTasks } from "domain-wait";
import { createMemoryHistory } from "history";
import { renderToString } from "react-dom/server";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import serializeJavascript from "serialize-javascript";
import { routes } from "./routes";
import responseContext from "@Core/responseContext";

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

var createGlobals = (session: IWebSessionContext, initialReduxState: object, helmetStrings: string) => {
    return {
        completedTasks: getCompletedTasks(),
        session,

        // Serialize Redux State with "serialize-javascript" library 
        // prevents XSS atack in the path of React Router via browser.
        initialReduxState: serializeJavascript(initialReduxState, { isJSON: true }),
        helmetStrings
    };
};

/**
 * Represents NodeJS params.
 * */
interface INodeParams {
    /**
     * Origin url.
     * */
    origin: string;
    baseUrl: string;
    url: string;
    location: { path: string };
    data: any;
    domainTasks: Promise<void>;
}

export default createServerRenderer((params: INodeParams) => {

    SessionManager.resetSession();
    SessionManager.initSession(params.data as IWebSessionContext);

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

        addDomainWait(params);

        renderApp();

        // If there's a redirection, just send this information back to the host application.
        if (routerContext.url) {
            resolve({
                redirectUrl: routerContext.url,
                globals: createGlobals(params.data as IWebSessionContext, store.getState(), renderHelmet()),
                statusCode: responseContext.statusCode
            });
            return;
        }

        // Once any async tasks are done, we can perform the final render.
        // We also send the redux store state, so the client can continue execution where the server left off.
        params.domainTasks.then(() => {

            resolve({
                html: renderApp(),
                globals: createGlobals(params.data, store.getState(), renderHelmet()),
                statusCode: responseContext.statusCode
            });

        }, reject); // Also propagate any errors back into the host application.
    });
});
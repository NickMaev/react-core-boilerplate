export interface IServiceUser {
    login: string;
}

/**
 * Session data which is used only for prerenderer.
 * */
export interface ISsrSessionData {
    cookie: string;
}

/**
 * Isomorphic session data.
 */
export interface IIsomorphicSessionData {
    serviceUser?: IServiceUser;
}

/**
 * Represents the session context.
 */
export interface IWebSessionContext {
    /**
     * Public data which is also used by browser.
     * */
    isomorphic?: IIsomorphicSessionData;
    /**
     * Data for server side rendering.
     * */
    ssr?: ISsrSessionData;
}
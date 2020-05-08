/**
 * User's session context manager.
 */
export default class SessionManager {

    static _isInitialized = false;

    static _context = {};

    static resetSession() {
        this._isInitialized = false;
        this._context = {};
    }

    static initSession(sessionContext) {
        if (this._isInitialized) {
            throw Error("SessionManager: already initialized.");
        }

        this._context = (sessionContext || {
            isomorphic: {},
            ssr: {}
        });

        this._isInitialized = true;
    }

    static throwIfNotInitialized() {
        if (!this._isInitialized) {
            throw Error("SessionManager: you have to call 'SessionManager.initSession' for initialization.");
        }
    }

    static getSessionContext() {
        this.throwIfNotInitialized();
        return this._context;
    }

    static getServiceUser() {
        let context = this.getSessionContext();
        if (context) {
            const isomorphicData = context.isomorphic;
            if (isomorphicData) {
                return isomorphicData.serviceUser;
            } else {
                throw Error("SessionManager: isomorphic session was not initialized.")
            }
        }
        throw Error("SessionManager: current session was not initialized.")
    }

    static setServiceUser(serviceUser) {
        let context = this.getSessionContext();
        context.isomorphic.serviceUser = serviceUser;
    }

    static get isAuthenticated() {
        return this.getServiceUser() != null;
    }
}
import { IWebSessionContext, IServiceUser } from "./models";

/**
 * User's session context manager.
 */
class SessionManager {

    private static _isInitialized: boolean = false;

    private static _context: IWebSessionContext = {};

    public static resetSession(): void {
        this._isInitialized = false;
        this._context = {};
    }

    public static initSession(sessionContext: IWebSessionContext): void {
        if (this._isInitialized) {
            throw Error("SessionManager: already initialized.");
        }

        this._context = (sessionContext || {
            isomorphic: {},
            ssr: {}
        }) as IWebSessionContext;

        this._isInitialized = true;
    }

    private static throwIfNotInitialized() {
        if (!this._isInitialized) {
            throw Error("SessionManager: you have to call 'SessionManager.initSession' for initialization.");
        }
    }

    public static getSessionContext(): IWebSessionContext {
        this.throwIfNotInitialized();
        return this._context;
    }

    public static getServiceUser(): IServiceUser {
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

    public static setServiceUser(serviceUser: IServiceUser) {
        let context = this.getSessionContext();
        context.isomorphic.serviceUser = serviceUser;
    }

    public static get isAuthenticated(): boolean {
        return this.getServiceUser() != null;
    }
}

export default SessionManager;
export * from "./models";
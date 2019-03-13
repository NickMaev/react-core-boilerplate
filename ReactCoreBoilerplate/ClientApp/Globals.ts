import { IServiceUser } from "@Models/IServiceUser";
import { NSerializeJson } from "nserializejson";
import { INodeSession } from "@Models/INodeSession";

/**
 * Contains global isomorphic session.
 */
export default class Globals {

    private static isInitialized: boolean = false;

    private static session: INodeSession = {};

    public static reset(): void {
        this.isInitialized = false;
        this.session = {};
    }

    public static init(session: INodeSession): void {
        if (this.isInitialized) {
            throw Error("Globals is already initialized.");
        }

        this.session = (session || {
            public: {}, private: {}
        }) as INodeSession;

        this.isInitialized = true;
    }

    private static throwIfNotInitialized() {
        if (!this.isInitialized) {
            throw Error("'Globals' is not initialized. You have to call 'Globals.init' before.");
        }
    }

    public static getSession(): INodeSession {
        this.throwIfNotInitialized();
        return this.session;
    }

    public static setSession(session: INodeSession) {
        this.throwIfNotInitialized();
        // Update session object by the new data.
        this.session = { ...this.session, ...session };
    }

    public static get serviceUser(): IServiceUser {
        let currentSession = this.getSession();
        if (currentSession) {
            let publicSession = currentSession.public;
            if (publicSession) {
                return publicSession.serviceUser;
            } else {
                throw Error("Globals: public session was not initialized.")
            }
        }
        throw Error("Globals: current session was not initialized.")
    }

    public static set serviceUser(serviceUser: IServiceUser) {
        this.setSession({ public: { serviceUser } });
    }

    public static get isAuthenticated(): boolean {
        return this.serviceUser != null;
    }
}
import { IServiceUser } from "@Models/IServiceUser";
import { NSerializeJson } from "nserializejson";
import { INodeSession } from "@Models/INodeSession";

/**
 * Contains global isomorphic session.
 */
export default class Globals {

    private static isInitialized: boolean = false;

    private static data: INodeSession = {};

    public static reset(): void {
        this.isInitialized = false;
        this.data = {};
    }

    public static init(data: INodeSession): void {
        if (this.isInitialized) {
            throw Error("Globals is already initialized.");
        }
        this.data = (data || {
            public: {}, private: {}
        }) as INodeSession;
        this.isInitialized = true;

        // Use dot notation in name of the form inputs.
        NSerializeJson.options.useDotSeparatorInPath = true;
    }

    private static throwIfNotInitialized() {
        if (!this.isInitialized)
            throw Error("Globals is not initialized. You have to call Session.init before.");
    }

    public static getData(): INodeSession {
        this.throwIfNotInitialized();
        return this.data;
    }

    public static setData(data: INodeSession) {
        this.throwIfNotInitialized();
        var oldData = this.data;
        this.data = { ...oldData, ...data };
    }

    public static get serviceUser(): IServiceUser {
        return this.getData().public.serviceUser;
    }

    public static set serviceUser(serviceUser: IServiceUser) {
        this.setData({ public: { serviceUser } });
    }

    public static get isAuthenticated(): boolean {
        return this.serviceUser != null;
    }
}
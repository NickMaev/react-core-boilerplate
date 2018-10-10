import { IServiceUser } from "@Models/IServiceUser";
import { ISessionData } from "@Models/ISessionData";
import { NSerializeJson } from "NSerializeJson";

/**
 * Contains global isomorphic session.
 */
export default class Globals {

    private static isInitialized : boolean = false;
    
    private static data: ISessionData = {};

    public static reset(): void {
        this.isInitialized = false;
        this.data = {};
    }

    public static init(data: ISessionData): void {
        if (this.isInitialized) {
            throw Error("Globals is already initialized.");
        }
        this.data = data || {};
        this.isInitialized = true;

        // Use dot notation in name of the form inputs.
        NSerializeJson.options.useDotSeparatorInPath = true;
    }

    private static throwIfNotInitialized() {
        if (!this.isInitialized)
            throw Error("Globals is not initialized. You have to call Session.init before.");
    }

    public static getData(): ISessionData {
        this.throwIfNotInitialized();
        return this.data;
    }

    public static setData(data: ISessionData) {
        this.throwIfNotInitialized();
        var oldData = this.data;
        this.data = { ...oldData, ...data };
    }

    public static get serviceUser(): IServiceUser {
        return this.getData().serviceUser;
    }

    public static set serviceUser(serviceUser: IServiceUser) {
        this.setData({ serviceUser });
    }

    public static get isAuthenticated(): boolean {
        return this.serviceUser != null;
    }
}
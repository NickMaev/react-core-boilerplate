import { IServiceUser } from "@Models/IServiceUser";

/**
 * Isomorphic application session data.
 */
export interface ISessionData {
    serviceUser?: IServiceUser;
}
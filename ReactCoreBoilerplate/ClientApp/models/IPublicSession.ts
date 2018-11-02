import { IServiceUser } from "@Models/IServiceUser";

/**
 * Isomorphic application session data.
 */
export interface IPublicSession {
    serviceUser?: IServiceUser;
}
import { IPublicSession } from "@Models/IPublicSession";
import { IPrivateSession } from "@Models/IPrivateSession";

/**
 * Represents the isomorphic session.
 */
export interface INodeSession {
    public?: IPublicSession;
    private?: IPrivateSession;
}
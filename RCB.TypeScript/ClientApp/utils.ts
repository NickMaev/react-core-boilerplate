import { IAppThunkActionAsync } from "@Store/index";
import { Dispatch } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// NodeJs process.
declare var process: any;

/**
 * Is server prerendering by NodeJs.
 * There can't be any DOM elements such as: window, document, etc.
 */
export function isNode(): boolean {
    return typeof process === 'object' && process.versions && !!process.versions.node;
}

/**
 * Get NodeJs process.
 * */
export function getNodeProcess(): any {
    if (isNode()) {
        return process;
    }
    return null;
}

/**
 * Show error messages on page.
 * @param messages
 */
export function showErrors(...messages: string[]): void {

    messages.forEach(x => {
        if (!Array.isArray(x)) {
            toast.error(x);
        }
        else {
            (x as any).forEach((y: string) => toast.error(y));
        }
    });
}

/**
 * Show information message on page.
 * @param message
 */
export function showInfo(message: string): void {
    toast.info(message);
}

const getApplicationLoader = (): HTMLElement => {
    if (isNode()) {
        return null;
    }
    return document.getElementById("applicationLoader");
};

const getQueryLoader = (): HTMLElement => {
    if (isNode()) {
        return null;
    }
    return document.getElementById("queryLoader");
};

/**
 * Show main application loader.
 * */
export function showApplicationLoader(): void {
    let loader = getApplicationLoader();
    if (loader) {
        loader.className = "";
    }
}

/**
 * Hide main application loader.
 * */
export function hideApplicationLoader() {
    let loader = getApplicationLoader();
    if (loader) {
        loader.className = "hidden";
    }
}

/**
 * Show query loader.
 * */
export function showQueryLoader() {
    let loader = getQueryLoader();
    if (loader) {
        loader.className = "";
    }
}

/**
 * Hide query loader.
 * */
export function hideQueryLoader() {
    let loader = getQueryLoader();
    if (loader) {
        loader.className = "hidden";
    }
}

/**
 * Clone object.
 * @param object input object.
 */
export function clone<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
}

/**
 * Get promise from the store's action creator async function.
 * Use this to intercept the results of your requests.
 * @param asyncActionCreator
 */
export function getPromiseFromAction<T, V>(asyncActionCreator: IAppThunkActionAsync<T, V>): Promise<V> {
    return (asyncActionCreator as any) as Promise<V>;
}

/**
 * Get promise from the store's action creator async function.
 * Use this to intercept the results of your requests.
 * @param asyncActionCreator
 */
export function getPromiseFromActionCreator<V>(asyncActionCreator: (dispatch: Dispatch) => Promise<V>): Promise<V> {
    return (asyncActionCreator as any) as Promise<V>;
}

export function isObjectEmpty(obj): boolean {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * Paginate an array for the client side.
 * @param array input array.
 * @param pageNumber page number.
 * @param limitPerPage entries per page.
 */
export function paginate<T>(array: T[], pageNumber: number, limitPerPage: number): T[] {
    let rowOffset = Math.ceil((pageNumber - 1) * limitPerPage);
    return array.slice(rowOffset, rowOffset + limitPerPage);
}
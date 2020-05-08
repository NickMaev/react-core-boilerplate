import { toast } from "react-toastify";

/**
 * Is server prerendering by NodeJs.
 * There can't be any DOM elements such as: window, document, etc.
 */
export function isNode() {
    return typeof process === 'object' && process.versions && !!process.versions.node;
}

/**
 * Get NodeJs process.
 * */
export function getNodeProcess() {
    if (isNode()) {
        return process;
    }
    return null;
}

/**
 * Show error messages on page.
 * @param messages
 */
export function showErrors(...messages) {

    messages.forEach(x => {
        if (!Array.isArray(x)) {
            toast.error(x);
        }
        else {
            x.forEach((y) => toast.error(y));
        }
    });
}

/**
 * Show information message on page.
 * @param message
 */
export function showInfo(message) {
    toast.info(message);
}

const getApplicationLoader = () => {
    if (isNode()) {
        return null;
    }
    return document.getElementById("applicationLoader");
};

const getQueryLoader = () => {
    if (isNode()) {
        return null;
    }
    return document.getElementById("queryLoader");
};

/**
 * Show main application loader.
 * */
export function showApplicationLoader() {
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
export function clone(object) {
    return JSON.parse(JSON.stringify(object));
}

export function isObjectEmpty(obj) {
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
export function paginate(array, pageNumber, limitPerPage) {
    let rowOffset = Math.ceil((pageNumber - 1) * limitPerPage);
    return array.slice(rowOffset, rowOffset + limitPerPage);
}
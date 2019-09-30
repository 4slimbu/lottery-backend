import * as _ from "lodash";
import {find, findIndex, indexOf} from "lodash";
import {MESSAGES} from "../../constants/messages";
import Cookies from 'universal-cookie';

/*
==========================================================================
App Helper Functions
==========================================================================
 */
/**
 * This is a wrapper function to get the env variable without using the
 * prefix REACT_APP_
 *
 * @param key
 * @return {string}
 */
export function getEnv(key) {
    return process.env['REACT_APP_' + key];
}

/**
 * Transform 'slug_string' or 'camelCaseString' or 'any type of string' to 'Capitalized Words'
 *
 * @param string
 * @returns {string}
 */
export function toCapitalizedWords(string) {
    const newString = string.replace(/([A-Z])/g, ' $1')
        .replace(/([_])/g, ' ');

    return firstOfEachWordToUppercase(newString);
}

/**
 * Capitalize first letter of each words in a string
 *
 * @param str
 * @returns {string}
 */
export function firstOfEachWordToUppercase(str) {
    let array = str.split(' ');
    let newArray = [];

    for (let x = 0; x < array.length; x++) {
        newArray.push(array[x].charAt(0).toUpperCase() + array[x].slice(1));
    }

    return newArray.join(' ');
}

/**
 * Format Date to user friendly string
 *
 * @param dateString
 * @returns {string}
 */
export function formatDate(dateString) {
    let options = {day: 'numeric', month: 'long', year: 'numeric'};
    let date = new Date(dateString.replace(' ', 'T'));

    // return dateString;
    return date.toLocaleString("en-US", options);
}

/*
==========================================================================
Data Handling Helper Functions
==========================================================================
 */
/**
 * Use error code to get error message
 *
 * @param errorCode
 * @return {string}
 */
export function getCodeMessage(errorCode) {
    return MESSAGES[errorCode] ? MESSAGES[errorCode] : MESSAGES.ERR_UNKNOWN;
}

export function getStatus(statusCollection, id) {
    let statusObject = find(statusCollection, {id: id});
    return statusObject ? statusObject : {};
}

export function getIndexOf(array, value) {
    return indexOf(array, value);
}

export function getByKey(collection, key, value) {
    let statusObject = find(collection, {[key]: value});
    return statusObject ? statusObject : {};
}

export function getById(collection, id) {
    let statusObject = find(collection, {id: id});
    return statusObject ? statusObject : null;
}

export function getBySlug(collection, slug) {
    let statusObject = find(collection, {slug: slug});
    return statusObject ? statusObject : {};
}

export function filterFirstInCollection(collection = [], filterObject = {}) {
    filterObject = find(collection, filterObject);
    return filterObject ? filterObject : {};
}

export function getByEventType(collection, type) {
    let eventObject = find(collection, {type: type});
    return eventObject ? eventObject : {};
}

export function getFirst(collection) {
    let item = isItemLoaded(collection) && collection[0];
    return item ? item : null;
}

export function getLast(collection) {
    let item = isItemLoaded(collection) && collection[collection.length - 1];
    return item ? item : null;
}

export function getPrevious(collection, id) {
    let index = findIndex(collection, function (item) {
        return item.id === id;
    });
    return collection[index - 1] ? collection[index - 1] : null;
}

export function getNext(collection, id) {
    let index = findIndex(collection, function (item) {
        return item.id === id;
    });
    return collection[index + 1] ? collection[index + 1] : null;
}

export function isItemLoaded(item) {
    if (typeof item === 'undefined' || item === null) {
        return false;
    }

    return !!(Object.keys(item).length > 0);
}

/*
==========================================================================
ROUTE Helper Functions
==========================================================================
 */
/**
 * Return url relative to the PUBLIC_URL set in package.json "homepage" key
 *
 * @return {string}
 */
export function publicUrl(url = null) {
    if (url) {
        return process.env.PUBLIC_URL + url;
    }
    return process.env.PUBLIC_URL;
}

/**
 * Return url relative to the API_BASE_URL
 *
 * @return {string}
 */
export function apiBaseUrl(url = null) {
    if (url) {
        return process.env.REACT_APP_API_BASE_URL + url;
    }
    return process.env.REACT_APP_API_BASE_URL;
}

/*
==========================================================================
Extra Helper Functions
==========================================================================
 */

export function getCookie(name, options = {}) {
    const cookies = new Cookies();
    return cookies.get(name, options);
}

export function setCookie(name, value, options = {}) {
    const cookies = new Cookies();
    cookies.set(name, value, options);
}


/*
==========================================================================
Currency Functions
==========================================================================
 */


export function inAppCoin(coins, withUnit = true) {
    let amountInCurrency = parseFloat(coins) + " coins";

    if (! coins) {
        return "";
    }

    return amountInCurrency;

}

export function inCurrency(coins, withUnit = true) {
    let amountInCurrency = coins + " coins";

    if (! coins) {
        return "";
    }

    try {
        const currencies = JSON.parse(localStorage.getItem("currencies"));
        const settings = JSON.parse(localStorage.getItem("settings"));
        const appCurrency = _.find(settings, function(o) { return o.key === "app_currency"; });
        const appCurrencyDetail = _.find(currencies, {currency: appCurrency.value});

        amountInCurrency =  parseFloat((coins / appCurrencyDetail.value_in_bits).toFixed(6));
        if (withUnit) {
            amountInCurrency += " " + appCurrency.value;
        }
    } catch (err) {
        // console.log('currency conversion error', err);
    }


    return amountInCurrency;

}

export function inCoin(currency, withUnit = true) {
    let amountInCoin = 0;

    if (! currency) {
        return "";
    }

    try {
        const currencies = JSON.parse(localStorage.getItem("currencies"));
        const settings = JSON.parse(localStorage.getItem("settings"));
        const appCurrency = _.find(settings, function(o) { return o.key === "app_currency"; });
        const appCurrencyDetail = _.find(currencies, {currency: appCurrency.value});

        amountInCoin = (currency * appCurrencyDetail.value_in_bits);

        if (withUnit) {
            amountInCoin += " coins";
        }
    } catch (err) {
        // console.log('currency conversion error', err);
    }


    return amountInCoin;

}
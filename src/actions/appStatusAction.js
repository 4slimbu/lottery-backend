import {SET_CURRENCIES, SET_SETTINGS,} from "../constants/actionTypes";

export function setCurrencies(currencies) {
    return {
        type: SET_CURRENCIES,
        currencies
    }
}

export function setSettings(settings) {
    return {
        type: SET_SETTINGS,
        settings
    }
}
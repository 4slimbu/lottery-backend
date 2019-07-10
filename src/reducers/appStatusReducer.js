import {SET_CURRENCIES, SET_SETTINGS,} from "../constants/actionTypes";
import {DEFAULT_APP_STATUS} from "../data/default";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
    switch (action.type) {
        case `${SET_CURRENCIES}` :
            localStorage.setItem("currencies", JSON.stringify(action.currencies));
            return {
                ...state,
                currencies: action.currencies
            };
        case `${SET_SETTINGS}` :
            localStorage.setItem("settings", JSON.stringify(action.settings));
            return {
                ...state,
                settings: action.settings
            };
        default:
            return state;
    }
}
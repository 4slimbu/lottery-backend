import {SET_APP_SETTINGS,} from "../constants/actionTypes";
import {DEFAULT_APP_STATUS} from "../data/default";

export default (state = DEFAULT_APP_STATUS, action = {}) => {
    switch (action.type) {
        case SET_APP_SETTINGS :
            return {
                ...state,
                appSettings: action.settings
            };
        default:
            return state;
    }
}
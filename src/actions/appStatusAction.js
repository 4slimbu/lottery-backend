import {
    SET_APP_SETTINGS,
} from "../constants/actionTypes";

export function setAppSettings(settings) {
    return {
        type: SET_APP_SETTINGS,
        settings
    }
}
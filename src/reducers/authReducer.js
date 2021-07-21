import {SET_AUTH, SET_USER} from "../constants/actionTypes";
import {isEmpty} from "lodash";

const initialState = {
    isAuthenticated: false,
    user: {}
};

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_AUTH:
            const user = action.payload && action.payload.user ? action.payload.user : {};
            const scope = action.payload && action.payload.scope ? action.payload.scope : {};
            const isVerified = user.verified ? user.verified : 0;
            return {
                isAuthenticated: !isEmpty(user),
                isVerified: !!isVerified,
                scope: scope
            };
        case SET_USER:
            localStorage.setItem("user", JSON.stringify(action.user));
            return {
                ...state,
                user: action.user,
            };
        default:
            return state;
    }
}
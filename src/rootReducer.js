import {combineReducers} from "redux";
import authReducer from "./reducers/authReducer";
import appStatusReducer from "./reducers/appStatusReducer";
import ThemeOptions from "./reducers/ThemeOptions";

export default combineReducers({
    authReducer,
    appStatusReducer,
    ThemeOptions
});
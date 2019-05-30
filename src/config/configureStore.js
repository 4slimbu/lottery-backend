import {applyMiddleware, compose, createStore} from 'redux';
import thunk from "redux-thunk";
import rootReducer from "../rootReducer";

export default function configureStore() {
  return createStore(
    rootReducer,
      compose(
          applyMiddleware(thunk),
          window.devToolsExtension ? window.devToolsExtension() : f => f
      ),
  );
}
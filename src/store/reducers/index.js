import { combineReducers } from "redux";
import authentication from "./AuthReducer";
import appState from "./AppReducer";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  appState,
  authentication,
  form: formReducer
});

export default reducers;

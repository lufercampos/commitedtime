import thunkMiddleware from "redux-thunk";
import { applyMiddleware, createStore, compose } from "redux";
import reducers from "./reducers";

const middlewareEnhancer = applyMiddleware(thunkMiddleware);

const composedEnhancers = compose(middlewareEnhancer);

let store = null;
if (process.env.NODE_ENV !== "production")
  store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    composedEnhancers
  );
else store = createStore(reducers, undefined, composedEnhancers);

export default store;

import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import reducer from "./Reducer/reducer";

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

//store which holds entire state of application
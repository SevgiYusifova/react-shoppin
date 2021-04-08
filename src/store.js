import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import { productReducer } from "./reducers/productreducers";

const initialState = {};
// other middleware, redux devtools for chrome,if first exist, we use that, else we use default compose
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //by having this line of code I can send all info about redux store to chrome,redux devtools

//second parameter of createstore is initialstate
//then the parameter(third) is middlewares, (we use redux thunk middlewares)
// we are using redux thunk because we use async request inside action, thunk is for handle this type of actions
// compose function compose all middlewares together
const store = createStore(
  combineReducers({
    products: productReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;

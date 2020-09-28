import { createStore, combineReducers } from "redux";
import dishReducer from "./reducers/dishReducer";

rootReducer = () => {
  combineReducers({
    dish: dishReducer
  })
}

const store = createStore(rootReducer);

export default store;
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from 'redux-thunk' 

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import burgerReducer from "./store/reducers/burgerBuilder";
import orderReducer from './store/reducers/order'
// import burgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import { apply } from "file-loader";

const rootReducer = combineReducers({
  burgerBuilder: burgerReducer,
  order: orderReducer
})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// const logger = store => {
//   return next => {
//     return action => {
//       console.log("from middleware dispatching action", action)
//       const result = next(action)
//       console.log('middleware nextState', store.getState())
//       return result;

//     }
//   }
// }
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();

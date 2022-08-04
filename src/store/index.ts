import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "redux-logger";

import rootReducer from "./rootReducer";
import { rootSaga } from "./rootSaga";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

let middleware;

middleware =
  process.env.NODE_ENV === "development"
    ? new MiddlewareArray().concat(sagaMiddleware, logger)
    : new MiddlewareArray().concat(sagaMiddleware);

// Mount it on the Store
const store = configureStore({
  reducer: rootReducer,
  middleware: middleware,
  devTools: false, // Disable Redux dev tools
});

// Run the saga
sagaMiddleware.run(rootSaga);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = {
  auth: AuthState;
};
export type AppDispatch = typeof store.dispatch;

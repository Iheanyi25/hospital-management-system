import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers/rootReducer";
import { persistStore } from "redux-persist";
import { createLogger } from "redux-logger";

const logger = createLogger();

const middlewares = [thunk];
if (process.env.NODE_ENV === "development") middlewares.push(logger);
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

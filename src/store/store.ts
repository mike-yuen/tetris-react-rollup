import { combineReducers, configureStore } from "@reduxjs/toolkit";

import appReducer from "./slice";

const reducer = combineReducers({
  app: appReducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, thunk: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";

// const persistedReducer = persistReducer(persistConfig, rootRender);

export const store = configureStore({
  reducer: { user: userReducer },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
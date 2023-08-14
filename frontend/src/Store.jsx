import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loginslice from "./slice/loginslice";
import Cartslice from "./slice/Cartslice";

const persistConfig = {
  key: "root",
  storage,
};

const reducer = combineReducers({
  login: loginslice,
  cart: Cartslice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

let presistor = persistStore(store);

export default presistor;

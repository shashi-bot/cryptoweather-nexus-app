import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import weatherReducer from './slices/weatherSlice';
import cryptoReducer from './slices/cryptoSlice';
import newsReducer from './slices/newsSlice';
import favoriteReducer from './slices/favoriteSlice';
import notificationReducer from './slices/notificationSlice';

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favorites"], // Persist only the favorites slice
};

const rootReducer = combineReducers({
  weather: weatherReducer,
  crypto: cryptoReducer,
  notifications: notificationReducer,
  news:newsReducer,
  favorites: favoriteReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
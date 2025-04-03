import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Use localStorage


const initialState = {
  cities: [],  // Stores favorite cities
  cryptos: []  // Stores favorite cryptos
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavoriteCity: (state, action) => {
      if (!state.cities.includes(action.payload)) {
        state.cities.push(action.payload);
      }
    },
    removeFavoriteCity: (state, action) => {
      state.cities = state.cities.filter(city => city !== action.payload);
    },
    addFavoriteCrypto: (state, action) => {
      if (!state.cryptos.includes(action.payload)) {
        state.cryptos.push(action.payload);
      }
    },
    removeFavoriteCrypto: (state, action) => {
      state.cryptos = state.cryptos.filter(crypto => crypto !== action.payload);
    }
  }
});
const persistConfig = {
    key: "favorites",
    storage,
  };



export const {
    addFavoriteCity,
    removeFavoriteCity,
    addFavoriteCrypto,
    removeFavoriteCrypto
  } = favoriteSlice.actions;


export default persistReducer(persistConfig, favoriteSlice.reducer);
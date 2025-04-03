import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async () => {
  const response = await fetch("/api/weather");
  if (!response.ok) throw new Error("Failed to fetch weather");
  return await response.json();
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState: { data: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchWeather.rejected, (state) => { state.status = 'failed'; });
  }
});

export default weatherSlice.reducer;

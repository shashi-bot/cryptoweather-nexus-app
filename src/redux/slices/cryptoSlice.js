import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCrypto = createAsyncThunk('crypto/fetchCrypto', async () => {
  const response = await axios.get('/api/crypto');
  return response.data;
});

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: { data: [], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCrypto.rejected, (state) => { state.status = 'failed'; });
  }
});

export default cryptoSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { APOD } from '../../domain/entities/APOD';
import { APODRepositoryImpl } from '../../data/repositories/APODRepositoryImpl';
import { GetTodayPictureUseCase } from '../../domain/usecases/GetTodayPictureUseCase';

interface APODState {
  [x: string]: any;
  data: APOD | null;
  loading: boolean;
  error: string | null;
}

const initialState: APODState = {
  data: null,
  loading: false,
  error: null,
};

const useCase = new GetTodayPictureUseCase(new APODRepositoryImpl());

export const fetchApod = createAsyncThunk('apod/fetch', async () => {
  return await useCase.execute();
});

const apodSlice = createSlice({
  name: 'apod',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchApod.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApod.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchApod.rejected, (state, action) => {
        state.error = action.error.message || 'Error fetching APOD';
        state.loading = false;
      });
  },
});

export default apodSlice.reducer;

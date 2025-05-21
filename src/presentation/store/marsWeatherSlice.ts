import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetMarsWeatherUseCase } from '../../domain/usecases/GetMarsWeatherUseCase';
import { MarsWeather } from '../../domain/entities/MarsWeather';
import { MarsWeatherRepositoryImpl } from '../../data/repositories/MarsWeatherRepositoryImpl';

interface MarsWeatherState {
  data: MarsWeather | null;
  loading: boolean;
  error: string | null;
}

const initialState: MarsWeatherState = {
  data: null,
  loading: false,
  error: null,
};

const useCase = new GetMarsWeatherUseCase(new MarsWeatherRepositoryImpl());

export const fetchMarsWeather = createAsyncThunk('weather/fetch', async () => {
  return await useCase.execute();
});

const marsWeatherSlice = createSlice({
  name: 'marsWeather',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMarsWeather.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarsWeather.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMarsWeather.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error';
        state.loading = false;
      });
  },
});

export default marsWeatherSlice.reducer;

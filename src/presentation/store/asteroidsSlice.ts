import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Asteroid } from '../../domain/entities/Asteroid';
import { GetAsteroidsByDateUseCase } from '../../domain/usecases/GetAsteroidsByDateUseCase';
import { AsteroidRepositoryImpl } from '../../data/repositories/AsteroidRepositoryImpl.ts';

interface AsteroidState {
  data: Asteroid[];
  loading: boolean;
  error: string | null;
}

const initialState: AsteroidState = {
  data: [],
  loading: false,
  error: null,
};

const useCase = new GetAsteroidsByDateUseCase(new AsteroidRepositoryImpl());

export const fetchAsteroids = createAsyncThunk(
  'asteroids/fetch',
  async ({ start, end }: { start: string; end: string }) => {
    return await useCase.execute(start, end);
  }
);

const asteroidSlice = createSlice({
  name: 'asteroids',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAsteroids.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAsteroids.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchAsteroids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error al cargar';
      });
  },
});

export default asteroidSlice.reducer;

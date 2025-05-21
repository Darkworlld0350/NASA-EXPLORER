import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { MarsPhoto } from '../../domain/entities/MarsPhoto';
import { GetMarsPhotosUseCase } from '../../domain/usecases/GetMarsPhotosUseCase';
import { MarsPhotoRepositoryImpl } from '../../data/repositories/MarsPhotoRepositoryImpl';

interface MarsPhotosState {
  data: MarsPhoto[];
  loading: boolean;
  error: string | null;
}

const initialState: MarsPhotosState = {
  data: [],
  loading: false,
  error: null,
};

const useCase = new GetMarsPhotosUseCase(new MarsPhotoRepositoryImpl());

export const fetchMarsPhotos = createAsyncThunk(
  'marsPhotos/fetch',
  async (sol: number) => {
    return await useCase.execute(sol);
  }
);

const marsPhotosSlice = createSlice({
  name: 'marsPhotos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMarsPhotos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMarsPhotos.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchMarsPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error cargando fotos';
      });
  },
});

export default marsPhotosSlice.reducer;

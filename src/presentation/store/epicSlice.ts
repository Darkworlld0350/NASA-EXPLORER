import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { EpicImage } from '../../domain/entities/EpicImage';
import { GetEpicImagesUseCase } from '../../domain/usecases/GetEpicImagesUseCase';
import { EpicImageRepositoryImpl } from '../../data/repositories/EpicImageRepositoryImpl';

interface EpicState {
  data: EpicImage[];
  loading: boolean;
  error: string | null;
}

const initialState: EpicState = {
  data: [],
  loading: false,
  error: null,
};

const useCase = new GetEpicImagesUseCase(new EpicImageRepositoryImpl());

export const fetchEpicImages = createAsyncThunk('epic/fetch', async () => {
  return await useCase.execute();
});

const epicSlice = createSlice({
  name: 'epic',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEpicImages.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEpicImages.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchEpicImages.rejected, (state, action) => {
        state.error = action.error.message ?? 'Error';
        state.loading = false;
      });
  },
});

export default epicSlice.reducer;

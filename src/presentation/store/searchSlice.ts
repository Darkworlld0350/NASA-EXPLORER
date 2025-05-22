import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SearchNasaMediaUseCase } from '../../domain/usecases/SearchNasaMediaUseCase';
import { NasaMediaItem } from '../../domain/entities/NasaMedia';

const useCase = new SearchNasaMediaUseCase();

export const searchNasaMedia = createAsyncThunk(
  'search/fetch',
  async (query: string) => {
    return await useCase.execute(query);
  }
);

interface SearchState {
  data: NasaMediaItem[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  data: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchNasaMedia.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchNasaMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(searchNasaMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error buscando';
      });
  },
});

export default searchSlice.reducer;

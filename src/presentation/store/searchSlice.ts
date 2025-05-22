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

export const fetchSearchPage = createAsyncThunk(
  'search/fetchPage',
  async ({ query, page }: { query: string; page: number }) => {
    return await useCase.execute(query, page);
  }
);

interface SearchState {
  query: string;
  data: NasaMediaItem[];
  page: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}

const initialState: SearchState = {
    data: [],
    loading: false,
    error: null,
    query: '',
    page: 0,
    loadingMore: false
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
      })
      .addCase(fetchSearchPage.pending, state => {
        state.loadingMore = true;
        })
        .addCase(fetchSearchPage.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload];
        state.page += 1;
        state.loadingMore = false;
        })
        .addCase(fetchSearchPage.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.error.message ?? 'Error cargando más';
        });

  },
});

export default searchSlice.reducer;

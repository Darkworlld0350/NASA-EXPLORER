import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { fetchSearchPage, searchNasaMedia } from "../../store/searchSlice";
import { useCallback } from "react";


export const useSearchViewModel = () => {
  const { query, data, loading, loadingMore, page, error } = useSelector(
    (state: RootState) => state.search
  );
  const dispatch = useDispatch<AppDispatch>();
  const loadMore = useCallback(() => {
    if (!loadingMore && query) {
      dispatch(fetchSearchPage({ query, page }));
    }
  }, [dispatch, loadingMore, query, page]);
  const searchState = useSelector((state: RootState) => state.search);

  const onSearch = useCallback(
    (query: string) => {
      dispatch(searchNasaMedia(query));
    },
    [dispatch]
  );

  return {
    ...searchState,
    onSearch,
    query,
    data,
    loading,
    error,
    loadMore,
    loadingMore,
  };
};

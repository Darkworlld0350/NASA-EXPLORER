import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { searchNasaMedia } from "../../store/searchSlice";
import { useCallback } from "react";


export const useSearchViewModel = () => {
  const dispatch = useDispatch<AppDispatch>();
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
  };
};

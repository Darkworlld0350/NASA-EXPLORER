import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApod } from '../../../presentation/store/apodSlice';
import { RootState, AppDispatch } from '../../../presentation/store/store';

export const useHomeViewModel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const apodState = useSelector((state: RootState) => state.apod);

  useEffect(() => {
    dispatch(fetchApod());
  }, [dispatch]);

  return {
    ...apodState
  };
};

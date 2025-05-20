import { configureStore } from '@reduxjs/toolkit';
import apodReducer from './apodSlice';
import asteroidReducer from './asteroidsSlice';


export const store = configureStore({
  reducer: {
    apod: apodReducer,
    asteroids: asteroidReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

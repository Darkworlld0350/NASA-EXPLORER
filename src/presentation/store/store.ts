import { configureStore } from '@reduxjs/toolkit';
import apodReducer from './apodSlice';
import asteroidReducer from './asteroidsSlice';
import marsPhotosReducer from './marsPhotosSlice';
import marsWeatherReducer from './marsWeatherSlice';
import epicReducer from './epicSlice';
import searchReducer from './searchSlice';


export const store = configureStore({
  reducer: {
    apod: apodReducer,
    asteroids: asteroidReducer,
    marsPhotos: marsPhotosReducer,
    marsWeather: marsWeatherReducer,
    epic: epicReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

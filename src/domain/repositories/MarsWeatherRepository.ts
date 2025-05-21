import { MarsWeather } from '../entities/MarsWeather';

export interface MarsWeatherRepository {
  getLatestWeather(): Promise<MarsWeather>;
}

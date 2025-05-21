import { MarsWeatherRepository } from '../repositories/MarsWeatherRepository';
import { MarsWeather } from '../entities/MarsWeather';
import { StorageService } from '../../core/storage/StorageService';

const CACHE_KEY = 'MARS_WEATHER_CACHE';

export class GetMarsWeatherUseCase {
  constructor(private repo: MarsWeatherRepository) {}

  async execute(): Promise<MarsWeather> {
    try {
      const weather = await this.repo.getLatestWeather();
      await StorageService.save(CACHE_KEY, weather);
      return weather;
    } catch (e) {
      console.warn('Error de red — recuperando clima de caché local...');
      const cached = await StorageService.load<MarsWeather>(CACHE_KEY);
      if (cached) return cached;
      throw new Error('No hay clima guardado ni conexión disponible.');
    }
  }
}
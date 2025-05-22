import { MarsWeatherRepository } from '../repositories/MarsWeatherRepository';
import { MarsWeather } from '../entities/MarsWeather';
import { StorageService } from '../../core/storage/StorageService';
import { RepositoryFactory } from '../../data/factories/RepositoryFactory';

const CACHE_KEY = 'MARS_WEATHER_CACHE';

export class GetMarsWeatherUseCase {
  private repo: MarsWeatherRepository;

  constructor() {
    this.repo = RepositoryFactory.createMarsWeatherRepository();
  }

  async execute(): Promise<MarsWeather> {
    try {
      const weather = await this.repo.getLatestWeather();
      await StorageService.save(CACHE_KEY, weather);
      return weather;
    } catch (e) {
      console.warn('[Fallback] Error de red — recuperando clima de caché local...');
      const cached = await StorageService.load<MarsWeather>(CACHE_KEY);
      if (cached) {
        console.log('[DEBUG] Datos recuperados desde caché:', cached);
        return cached;
      }
      throw new Error('No hay clima guardado ni conexión disponible.');
    }
  }
}

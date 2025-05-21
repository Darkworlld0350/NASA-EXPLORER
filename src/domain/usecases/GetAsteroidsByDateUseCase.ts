import { AsteroidRepository } from '../repositories/AsteroidRepository.ts';
import { Asteroid } from '../entities/Asteroid';
import { StorageService } from '../../core/storage/StorageService';

const CACHE_KEY = 'ASTEROIDS_CACHE';

export class GetAsteroidsByDateUseCase {
  constructor(private repo: AsteroidRepository) {}

  async execute(startDate: string, endDate: string): Promise<Asteroid[]> {
    try {
      const data = await this.repo.getAsteroidsByDate(startDate, endDate);
      await StorageService.save(CACHE_KEY, data);
      return data;
    } catch (e) {
      console.warn('Red no disponible — recuperando asteroides desde caché...');
      const cached = await StorageService.load<Asteroid[]>(CACHE_KEY);
      if (cached && Array.isArray(cached) && cached.length > 0) {
        return cached;
      }
      throw new Error('No hay asteroides guardados ni conexión disponible.');
    }
  }
}
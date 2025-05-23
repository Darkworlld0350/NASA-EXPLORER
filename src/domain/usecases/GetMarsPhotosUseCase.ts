import { MarsPhotoRepository } from '../repositories/MarsPhotoRepository';
import { MarsPhoto } from '../entities/MarsPhoto';
import { StorageService } from '../../core/storage/StorageService';

const CACHE_KEY = 'MARS_PHOTOS_CACHE';

export class GetMarsPhotosUseCase {
  constructor(private repo: MarsPhotoRepository) {}

  async execute(sol: number): Promise<MarsPhoto[]> {
    try {
      const photos = await this.repo.getPhotosBySol(sol);
      await StorageService.save(CACHE_KEY, photos);
      return photos;
    } catch (e) {
      console.warn('"Error" red no disponible, cargando desde cache local...');
      const cached = await StorageService.load<MarsPhoto[]>(CACHE_KEY);
      if (cached && Array.isArray(cached) && cached.length > 0) {
        return cached;
      }
      throw new Error("No hay fotos guardadas en caché y no hay conexión.");
    }
  }
}

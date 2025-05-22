import { EpicImageRepository } from '../repositories/EpicImageRepository';
import { EpicImage } from '../entities/EpicImage';
import { StorageService } from '../../core/storage/StorageService';

const CACHE_KEY = 'EPIC_IMAGES_CACHE';

export class GetEpicImagesUseCase {
  private repo: EpicImageRepository;

  // ✅ Aceptamos el repo como parámetro
  constructor(repo: EpicImageRepository) {
    this.repo = repo;
  }

  async execute(): Promise<EpicImage[]> {
    try {
      const images = await this.repo.getTodayImages();
      await StorageService.save(CACHE_KEY, images);
      return images;
    } catch (e) {
      console.warn('Red no disponible — cargando imágenes EPIC desde caché...');
      const cached = await StorageService.load<EpicImage[]>(CACHE_KEY);
      if (cached && Array.isArray(cached) && cached.length > 0) {
        return cached;
      }
      throw new Error('No hay imágenes de EPIC guardadas ni conexión disponible.');
    }
  }
}

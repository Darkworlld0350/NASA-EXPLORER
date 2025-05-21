import { APODRepository } from "../repositories/APODRepository";
import { APOD } from "../entities/APOD";
import { StorageService } from "../../core/storage/StorageService";

const CACHE_KEY = 'APOD_CACHE';

export class GetTodayPictureUseCase {
  constructor(private repo: APODRepository) {}

  async execute(): Promise<APOD> {
    try {
      const data = await this.repo.getTodayPicture();
      console.log('[DEBUG] Resultado desde API:', data);
      await StorageService.save<APOD>(CACHE_KEY, data); // 👈 aseguras tipo explícito aquí
      return data;
    } catch (e) {
      console.warn('Fallo en red, usando caché local');
      const cached = await StorageService.load<APOD>(CACHE_KEY); // 👈 aquí también el tipo es correcto
      if (cached) return cached;

      throw new Error('No hay datos disponibles ni conexión');
    }
  }
}


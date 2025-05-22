import { APODRepositoryImpl } from '../repositories/APODRepositoryImpl';
import { MarsPhotoRepositoryImpl } from '../repositories/MarsPhotoRepositoryImpl';
import { MarsWeatherRepository } from '../../domain/repositories/MarsWeatherRepository';
import { MarsWeatherRepositoryImpl } from '../repositories/MarsWeatherRepositoryImpl';
import { AsteroidRepositoryImpl } from '../repositories/AsteroidRepositoryImpl';
import { AsteroidRepository } from '../../domain/repositories/AsteroidRepository';
import { NasaMediaRepository } from '../../domain/repositories/NasaMediaRepository';
import { NasaMediaRepositoryImpl } from '../repositories/NasaMediaRepositoryImpl';
import { EpicImageRepository } from '../../domain/repositories/EpicImageRepository';
import { EpicImageRepositoryImpl } from '../repositories/EpicImageRepositoryImpl';

export class RepositoryFactory {
  static createNasaMediaRepository(): NasaMediaRepository {
    return new NasaMediaRepositoryImpl();
  }
  static createMarsWeatherRepository(): MarsWeatherRepository {
    return new MarsWeatherRepositoryImpl();
  }
  static createEpicImageRepository(): EpicImageRepository {
    return new EpicImageRepositoryImpl();
  }

  static createAPODRepository() {
    return new APODRepositoryImpl();
  }

  static createMarsPhotoRepository() {
    return new MarsPhotoRepositoryImpl();
  }

  static createAsteroidRepository(): AsteroidRepository {
    return new AsteroidRepositoryImpl();
  }

  // Agrega aquí más factories si lo deseas
}

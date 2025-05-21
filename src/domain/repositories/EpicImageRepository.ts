import { EpicImage } from '../entities/EpicImage';

export interface EpicImageRepository {
  getTodayImages(): Promise<EpicImage[]>;
}

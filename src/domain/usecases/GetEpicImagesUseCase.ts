import { EpicImageRepository } from '../repositories/EpicImageRepository';
import { EpicImage } from '../entities/EpicImage';

export class GetEpicImagesUseCase {
  constructor(private repo: EpicImageRepository) {}

  async execute(): Promise<EpicImage[]> {
    return this.repo.getTodayImages();
  }
}

import { APODRepository } from '../repositories/APODRepository';
import { APOD } from '../entities/APOD';

export class GetTodayPictureUseCase {
  constructor(private repository: APODRepository) {}

  async execute(): Promise<APOD> {
    return await this.repository.getTodayPicture();
  }
}

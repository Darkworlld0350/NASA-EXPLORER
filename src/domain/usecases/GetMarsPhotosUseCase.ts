import { MarsPhotoRepository } from '../repositories/MarsPhotoRepository';
import { MarsPhoto } from '../entities/MarsPhoto';

export class GetMarsPhotosUseCase {
  constructor(private repo: MarsPhotoRepository) {}

  async execute(sol: number): Promise<MarsPhoto[]> {
    return this.repo.getPhotosBySol(sol);
  }
}

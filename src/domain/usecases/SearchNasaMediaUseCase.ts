import { NasaMediaRepository } from '../repositories/NasaMediaRepository';
import { NasaMediaItem } from '../entities/NasaMedia';
import { NasaMediaRepositoryImpl } from '../../data/repositories/NasaMediaRepositoryImpl';

export class SearchNasaMediaUseCase {
  private repo: NasaMediaRepository = new NasaMediaRepositoryImpl();

  async execute(query: string): Promise<NasaMediaItem[]> {
    return await this.repo.search(query);
  }
}

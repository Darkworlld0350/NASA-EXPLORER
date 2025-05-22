import { NasaMediaRepository } from '../repositories/NasaMediaRepository';
import { NasaMediaItem } from '../entities/NasaMedia';
import { NasaMediaRepositoryImpl } from '../../data/repositories/NasaMediaRepositoryImpl';

export class SearchNasaMediaUseCase {
  private repo: NasaMediaRepository = new NasaMediaRepositoryImpl();

  async execute(query: string, page = 1): Promise<NasaMediaItem[]> {
  return this.repo.search(query, page);
}

}

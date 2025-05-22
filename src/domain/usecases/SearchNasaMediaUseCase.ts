import { NasaMediaRepository } from '../repositories/NasaMediaRepository';
import { NasaMediaItem } from '../entities/NasaMedia';
import { RepositoryFactory } from '../../data/factories/RepositoryFactory';

export class SearchNasaMediaUseCase {
  private repo: NasaMediaRepository;

  constructor() {
    this.repo = RepositoryFactory.createNasaMediaRepository();
  }

  async execute(query: string, page = 1): Promise<NasaMediaItem[]> {
    return this.repo.search(query, page);
  }
}

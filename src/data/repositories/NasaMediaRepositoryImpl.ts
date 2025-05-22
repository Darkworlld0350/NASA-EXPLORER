import { NasaMediaRepository } from '../../domain/repositories/NasaMediaRepository';
import { getNasaMediaByQuery } from '../datasources/NasaMediaRemoteDataSource';
import { NasaMediaItem } from '../../domain/entities/NasaMedia';

export class NasaMediaRepositoryImpl implements NasaMediaRepository {
  async search(query: string): Promise<NasaMediaItem[]> {
    return await getNasaMediaByQuery(query);
  }
}

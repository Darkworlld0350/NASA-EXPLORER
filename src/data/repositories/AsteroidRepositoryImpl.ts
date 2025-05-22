import { AsteroidRepository } from '../../domain/repositories/AsteroidRepository.ts';
import { getAsteroidsByDate } from '../datasources/NeoWsRemoteDataSource.ts';
import { mapNeoDtoToEntity } from '../mappers/NearEarthObjectMapper.ts';
import { Asteroid } from '../../domain/entities/Asteroid';

export class AsteroidRepositoryImpl implements AsteroidRepository {
  async getAsteroidsByDate(start: string, end: string): Promise<Asteroid[]> {
    const dtos = await getAsteroidsByDate(start, end);
    return dtos.map(mapNeoDtoToEntity);
  }
}

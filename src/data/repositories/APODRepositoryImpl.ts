import { APODRepository } from '../../domain/repositories/APODRepository';
import { getApodRemoteData } from '../datasources/APODRemoteDataSource';
import { mapApodDtoToEntity } from '../mappers/APODMapper';
import { APOD } from '../../domain/entities/APOD';

export class APODRepositoryImpl implements APODRepository {
  async getTodayPicture(): Promise<APOD> {
    const dto = await getApodRemoteData();
    return mapApodDtoToEntity(dto);
  }
}

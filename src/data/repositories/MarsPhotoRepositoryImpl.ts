import { MarsPhotoRepository } from '../../domain/repositories/MarsPhotoRepository';
import { getMarsPhotos } from '../datasources/MarsRoverRemoteDataSource';
import { mapMarsPhotoDtoToEntity } from '../mappers/MarsPhotoMapper';
import { MarsPhoto } from '../../domain/entities/MarsPhoto';

export class MarsPhotoRepositoryImpl implements MarsPhotoRepository {
  async getPhotosBySol(sol: number): Promise<MarsPhoto[]> {
    const dtos = await getMarsPhotos(sol);
    return dtos.map(mapMarsPhotoDtoToEntity);
  }
}

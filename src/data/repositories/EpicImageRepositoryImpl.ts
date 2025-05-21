import { EpicImageRepository } from '../../domain/repositories/EpicImageRepository';
import { getEpicImages } from '../datasources/EpicRemoteDataSource';
import { mapEpicDtoToEntity } from '../mappers/EpicImageMapper';
import { EpicImage } from '../../domain/entities/EpicImage';

export class EpicImageRepositoryImpl implements EpicImageRepository {
  async getTodayImages(): Promise<EpicImage[]> {
    const dtos = await getEpicImages();
    return dtos.map(mapEpicDtoToEntity);
  }
}

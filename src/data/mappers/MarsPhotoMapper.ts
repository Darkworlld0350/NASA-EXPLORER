import { MarsPhotoDto } from '../models/MarsPhotoDto';
import { MarsPhoto } from '../../domain/entities/MarsPhoto';

export const mapMarsPhotoDtoToEntity = (dto: MarsPhotoDto): MarsPhoto => ({
  id: dto.id,
  imageUrl: dto.img_src,
  earthDate: dto.earth_date,
  cameraName: dto.camera.full_name,
  roverName: dto.rover.name,
});

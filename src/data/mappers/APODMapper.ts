import { APODDto } from '../models/APODDto';
import { APOD } from '../../domain/entities/APOD';

export const mapApodDtoToEntity = (dto: APODDto): APOD => ({
  title: dto.title,
  description: dto.explanation,
  imageUrl: dto.url,
  date: dto.date,
  mediaType: dto.media_type,
});

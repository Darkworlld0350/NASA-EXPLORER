import { EpicImageDto } from '../models/EpicImageDto';
import { EpicImage } from '../../domain/entities/EpicImage';

export const mapEpicDtoToEntity = (dto: EpicImageDto): EpicImage => {
  const [year, month, day] = dto.date.split(' ')[0].split('-');
  const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${dto.image}.png`;

  return {
    id: dto.identifier,
    caption: dto.caption,
    imageUrl,
    date: dto.date,
  };
};

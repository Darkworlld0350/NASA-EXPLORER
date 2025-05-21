import { nasaApi } from '../../core/api/nasaApi';
import { MarsPhotoDto, MarsPhotosResponseDto } from '../models/MarsPhotoDto';

export const getMarsPhotos = async (sol: number): Promise<MarsPhotoDto[]> => {
  const res = await nasaApi.get<MarsPhotosResponseDto>(
    '/mars-photos/api/v1/rovers/curiosity/photos',
    {
      params: { sol },
    }
  );

  return res.data.photos;
};

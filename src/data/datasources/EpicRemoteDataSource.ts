import { nasaApi } from '../../core/api/nasaApi';
import { EpicImageDto } from '../models/EpicImageDto';

export const getEpicImages = async (): Promise<EpicImageDto[]> => {
  const res = await nasaApi.get('/EPIC/api/natural/images');
  return res.data;
};

import { nasaApi } from '../../core/api/nasaApi';
import { APODDto } from '../models/APODDto';

export const getApodRemoteData = async (): Promise<APODDto> => {
  const response = await nasaApi.get<APODDto>('planetary/apod');
  return response.data;
};

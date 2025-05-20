import { APOD } from '../entities/APOD';

export interface APODRepository {
  getTodayPicture(): Promise<APOD>;
}

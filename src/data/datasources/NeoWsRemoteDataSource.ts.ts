import { nasaApi } from '../../core/api/nasaApi';
import { NearEarthObjectDto } from '../models/NearEarthObjectDto.ts';
import { NeoWsResponseDto } from '../models/NeoWsResponseDto'; // <- Asegúrate de tener este DTO creado

export const getAsteroidsByDate = async (
  startDate: string,
  endDate: string
): Promise<NearEarthObjectDto[]> => {
  const res = await nasaApi.get<NeoWsResponseDto>('neo/rest/v1/feed', {
    params: {
      start_date: startDate,
      end_date: endDate,
    },
  });

  const allAsteroids: NearEarthObjectDto[] = [];

  Object.values(res.data.near_earth_objects).forEach((day) => {
    allAsteroids.push(...day);
  });

  return allAsteroids;
};

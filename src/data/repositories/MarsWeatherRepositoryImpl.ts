import { MarsWeatherRepository } from '../../domain/repositories/MarsWeatherRepository';
import { MarsWeather } from '../../domain/entities/MarsWeather';
import { getInSightWeatherRaw } from '../datasources/InSightWeatherRemoteDataSource';
import { mapInSightDtoToEntity } from '../mappers/InSightWeatherMapper';

export class MarsWeatherRepositoryImpl implements MarsWeatherRepository {
  async getLatestWeather(): Promise<MarsWeather> {
    const raw = await getInSightWeatherRaw();

    // Validación de estructura mínima
    if (!raw || !Array.isArray(raw.sol_keys) || raw.sol_keys.length === 0) {
      throw new Error('No se encontraron datos válidos del clima en Marte.');
    }

    const latestSolKey = raw.sol_keys[raw.sol_keys.length - 1];
    const solData = raw[latestSolKey];

    const dto = {
      sol: latestSolKey,
      season: solData?.Season ?? 'Unknown',
      minTemp: solData?.AT?.mn?.toString() ?? '-',
      maxTemp: solData?.AT?.mx?.toString() ?? '-',
      avgPressure: solData?.PRE?.av?.toString() ?? '-',
      date: solData?.First_UTC ?? 'N/A',
    };

    return mapInSightDtoToEntity(dto);
  }
}

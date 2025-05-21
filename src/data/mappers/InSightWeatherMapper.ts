import { InSightWeatherDto } from '../models/InSightWeatherDto';
import { MarsWeather } from '../../domain/entities/MarsWeather';

export const mapInSightDtoToEntity = (dto: InSightWeatherDto): MarsWeather => ({
  sol: dto.sol,
  earthDate: dto.date,
  minTemp: dto.minTemp,
  maxTemp: dto.maxTemp,
  pressure: dto.avgPressure,
  season: dto.season,
  opacity: ''
});

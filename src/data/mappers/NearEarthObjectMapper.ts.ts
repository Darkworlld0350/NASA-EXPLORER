import { NearEarthObjectDto } from '../models/NearEarthObjectDto.ts';
import { Asteroid } from '../../domain/entities/Asteroid';

export const mapNeoDtoToEntity = (dto: NearEarthObjectDto): Asteroid => ({
  id: dto.id,
  name: dto.name,
  approachDate: dto.close_approach_data[0]?.close_approach_date ?? '',
  speedKph: dto.close_approach_data[0]?.relative_velocity.kilometers_per_hour ?? '',
  missDistanceKm: dto.close_approach_data[0]?.miss_distance.kilometers ?? '',
  isHazardous: dto.is_potentially_hazardous_asteroid,
  diameterKm: `${dto.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${dto.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)}`
});

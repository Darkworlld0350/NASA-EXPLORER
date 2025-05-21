import { MarsWeatherRepository } from '../repositories/MarsWeatherRepository';
import { MarsWeather } from '../entities/MarsWeather';

export class GetMarsWeatherUseCase {
  constructor(private repo: MarsWeatherRepository) {}

  async execute(): Promise<MarsWeather> {
    return this.repo.getLatestWeather();
  }
}

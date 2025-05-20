import { AsteroidRepository } from '../repositories/AsteroidRepository.ts';
import { Asteroid } from '../entities/Asteroid';

export class GetAsteroidsUseCase {
  constructor(private repo: AsteroidRepository) {}

  async execute(start: string, end: string): Promise<Asteroid[]> {
    return this.repo.getAsteroidsByDate(start, end);
  }
}

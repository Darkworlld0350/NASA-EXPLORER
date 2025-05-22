import { Asteroid } from '../entities/Asteroid';

export interface AsteroidRepository {
  getAsteroidsByDate(start: string, end: string): Promise<Asteroid[]>;
}

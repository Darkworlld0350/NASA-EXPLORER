import { NasaMediaItem } from '../entities/NasaMedia';

export interface NasaMediaRepository {
  search(query: string): Promise<NasaMediaItem[]>;
}

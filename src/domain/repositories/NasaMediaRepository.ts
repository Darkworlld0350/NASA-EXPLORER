import { NasaMediaItem } from '../entities/NasaMedia';

export interface NasaMediaRepository {
  search(query: string, page: number): Promise<NasaMediaItem[]>;

}

import { MarsPhoto } from '../entities/MarsPhoto';

export interface MarsPhotoRepository {
  getPhotosBySol(sol: number): Promise<MarsPhoto[]>;
}

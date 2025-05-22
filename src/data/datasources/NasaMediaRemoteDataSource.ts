import axios from 'axios';
import { NasaMediaItem } from '../../domain/entities/NasaMedia';

export const getNasaMediaByQuery = async (query: string): Promise<NasaMediaItem[]> => {
  const res = await axios.get(`https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`);
  const items = res.data.collection?.items ?? [];

  return items.map((item: any) => ({
    title: item.data[0]?.title ?? 'No title',
    description: item.data[0]?.description ?? 'No description',
    imageUrl: item.links?.[0]?.href ?? '',
  }));
};

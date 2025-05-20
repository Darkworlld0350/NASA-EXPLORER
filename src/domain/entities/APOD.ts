export interface APOD {
  title: string;
  description: string;
  imageUrl: string;
  date: string;
  mediaType: 'image' | 'video';
}

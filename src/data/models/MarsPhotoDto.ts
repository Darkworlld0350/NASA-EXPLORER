export interface MarsPhotoDto {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
   camera: {
    full_name: string;
  };
  rover: {
    name: string;
  };
  // Puedes añadir más campos si los necesitas
}

export interface MarsPhotosResponseDto {
  photos: MarsPhotoDto[];
}

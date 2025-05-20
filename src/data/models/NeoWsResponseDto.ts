import { NearEarthObjectDto } from "./NearEarthObjectDto.ts";

export interface NeoWsResponseDto {
  near_earth_objects: {
    [date: string]: NearEarthObjectDto[];
  };
}

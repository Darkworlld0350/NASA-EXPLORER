import { ReactNode } from "react";

export interface Asteroid {
  date: ReactNode;
  id: string;
  name: string;
  approachDate: string;
  speedKph: string;
  missDistanceKm: string;
  isHazardous: boolean;
  diameterKm: string;
}

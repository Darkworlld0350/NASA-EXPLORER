import { ReactNode } from "react";

export interface MarsPhoto {
  title: ReactNode;
  id: number;
  imageUrl: string;
  earthDate: string;
  cameraName: string;
  roverName: string;
}

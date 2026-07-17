export interface Country {
  name: string;
  flag: string;

  students: string;
  avgFees: string;
  topUnis: number;

  coordinates: {
    lat: number;
    lng: number;
  };
}
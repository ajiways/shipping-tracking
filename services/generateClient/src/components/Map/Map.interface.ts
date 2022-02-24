export interface interpC {
  lat: number;
  lng: number;
}

export interface interpolitedCoordinates {
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface CoordinatesData {
  coordinates: { lat: number; lng: number };
  count: string;
  start: number;
  end: number;
}

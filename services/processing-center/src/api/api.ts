import axios from 'axios';
import { LatLang } from './latlang';

const API_KEY = 'AIzaSyAnolHAY1cSxTBCexjTsKHVXkn8lgWp1is';

const instanceMap = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/directions/json?',
});

export const GoogleMap = {
  async getMap(): Promise<google.maps.Map> {
    return await instanceMap.get('/');
  },
  async getPolyline(start: LatLang, end: LatLang): Promise<string> {
    const response = await instanceMap.get('', {
      params: {
        origin: `${start.lat},${start.lng}`,
        destination: `${end.lat},${end.lng}`,
        key: API_KEY,
      },
    });
    return response.data.routes[0].overview_polyline.points;
  },
};

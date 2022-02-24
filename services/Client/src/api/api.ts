import axios from 'axios';
import { Order, OrderStatus } from '../types-reducers/order';

const API_KEY = 'AIzaSyAnolHAY1cSxTBCexjTsKHVXkn8lgWp1is';

const instance = axios.create({
  baseURL: 'http://localhost:3002'
});

export const ServerAPI = {
  async getPolyline(): Promise<string> {
    return await (
      await instance.get('/app')
    ).data;
  },

  async getOrder(id: string): Promise<Order> {
    try {
      const obj = {
        coordinates: {
          lat: 123,
          lng: 213
        },
        end: { lat: 56, lng: 56 },
        start: {
          lat: 56,
          lng: 56
        },
        id: 1,
        orderStatus: OrderStatus.handedToCourier
      };
      const response = await instance.get<Order>('order', {
        params: { id }
      });
      return obj;
    } catch (error) {
      throw error;
    }
  }
};

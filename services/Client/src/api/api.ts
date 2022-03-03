import axios from 'axios';
import { orderCreate } from '../interfaces/order';
import { Order, OrderStatus } from '../types-reducers/order';

const API_KEY = 'AIzaSyAnolHAY1cSxTBCexjTsKHVXkn8lgWp1is';

const instance = axios.create({
  baseURL: 'http://localhost:4000'
});

export const ServerAPI = {
  async createOrder(orderCreate: orderCreate) {
    const response = await instance.post('/create', orderCreate);
    return response.data;
  },

  async paymentOrder(id: number) {
    const response = await instance.put('/paid', { id });

    console.log(response);
  }
};

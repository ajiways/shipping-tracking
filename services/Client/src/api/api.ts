import axios from 'axios';
import { orderCreate } from '../interfaces/order';
import { Order, OrderStatus } from '../types-reducers/order';

const API_KEY = 'AIzaSyAnolHAY1cSxTBCexjTsKHVXkn8lgWp1is';

const instance = axios.create({
  baseURL: 'http://localhost:3005'
});

export const ServerAPI = {
  async createOrder(orderCreate: orderCreate) {
    const response = await instance.post('order/create', orderCreate);
  },

  async paymentOrder(status) {
    const response = await instance.put('order/payments', { status: status });
  }
};

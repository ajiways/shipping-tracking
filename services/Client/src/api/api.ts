import axios from 'axios';
import { orderCreate } from '../interfaces/order';
import { createOrderResp } from './interface';

const instance = axios.create({
  baseURL: 'http://localhost:4000'
});

export const ServerAPI = {
  async createOrder(orderCreate: orderCreate): Promise<number> {
    const response = await instance.post<createOrderResp>(
      '/create',
      orderCreate
    );
    return response.data.id;
  },

  async paymentOrder(id: number) {
    return await instance.put('/paid', { id });
  }
};

import { CREATE, PAID } from './../constants/constants';
import { HOST, PORT } from './../constants/config.contsants';
import { orderCreate } from '../interfaces/order';
import { createOrderResp } from './interface';
import axios from 'axios';

const instance = axios.create({
  baseURL: `${HOST}:${PORT}`
});

export const ServerAPI = {
  async createOrder(orderCreate: orderCreate): Promise<number> {
    const response = await instance.post<createOrderResp>(CREATE, orderCreate);
    return response.data.id;
  },

  async paymentOrder(id: number) {
    return await instance.put(PAID, { id });
  }
};

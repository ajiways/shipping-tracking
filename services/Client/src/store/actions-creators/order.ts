import { Dispatch } from '@reduxjs/toolkit';
import {
  OrderAction,
  OrderActionTypes,
  OrderStatus
} from '../../types-reducers/order';
import * as io from 'socket.io-client';
import { ServerAPI } from '../../api/api';
import { orderCreate } from '../../interfaces/order';

export const fetchCoordinates = (value) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
    } catch (e) {}
  };
};

const socket = io.connect('http://localhost:3019');

export const FetchOrder = (id: string) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      dispatch({ type: OrderActionTypes.FETCH_ORDER });
      socket.close();
      socket.connect();
      socket.emit('order.subscribe', id);
      socket.on('watch.order', (data) => {
        dispatch({
          type: OrderActionTypes.FETCH_ORDER_SUCCES,
          payload: data
        });
      });
    } catch (e) {
      dispatch({ type: OrderActionTypes.FETCH_ORDER_ERROR });
    }
  };
};

export const CreateOrder = (orderCreate: orderCreate) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      const response = await ServerAPI.createOrder(orderCreate);
      dispatch({
        type: OrderActionTypes.SEND_ORDER_SUCCES,
        payload: { id: response }
      });
    } catch (error) {}
  };
};

export const PaymentConfirm = (id: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      ServerAPI.paymentOrder(id);
    } catch (error) {
      console.log(error);
    }
  };
};

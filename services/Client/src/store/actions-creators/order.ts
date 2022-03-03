import { Dispatch } from '@reduxjs/toolkit';
import { OrderAction, OrderActionTypes } from '../../types-reducers/order';
import * as io from 'socket.io-client';
import { ServerAPI } from '../../api/api';
import { orderCreate } from '../../interfaces/order';

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
          type: OrderActionTypes.FETCH_ORDER_SUCCESS,
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
      dispatch({ type: OrderActionTypes.SEND_ORDER });
      const id = await ServerAPI.createOrder(orderCreate);
      dispatch({
        type: OrderActionTypes.SEND_ORDER_SUCCESS,
        payload: { id }
      });
    } catch (error) {
      dispatch({ type: OrderActionTypes.SEND_ORDER_ERROR });
    }
  };
};

export const PaymentConfirm = (id: number) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      dispatch({ type: OrderActionTypes.PAID_ORDER });
      await ServerAPI.paymentOrder(id);
      dispatch({ type: OrderActionTypes.PAID_ORDER_SUCCESS });
    } catch (error) {
      dispatch({ type: OrderActionTypes.PAID_ORDER_ERROR });
    }
  };
};

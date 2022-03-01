import { Dispatch } from '@reduxjs/toolkit';
import { OrderAction, OrderActionTypes } from '../../types-reducers/order';
import * as io from 'socket.io-client';
import { ServerAPI } from '../../api/api';
import { orderCreate } from '../../interfaces/order';

export const fetchCoordinates = (value) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
    } catch (e) {}
  };
};
const socket = io.connect('http://localhost:3002');

export const FetchOrder = (id: string) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      dispatch({ type: OrderActionTypes.FETCH_ORDER });
      socket.removeListener('coordinatesServer');
      socket.emit('CoordinatesToServer', id);
      socket.on('coordinatesServer', (data) => {
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

export const SendOrder = (id) => {
  return async (dispath: Dispatch<OrderAction>) => {
    try {
      socket.emit('CoordinatesToServer', id);
      dispath({ type: OrderActionTypes.SEND_ORDER });
    } catch (error) {}
  };
};

export const CreateOrder = (orderCreate: orderCreate) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      ServerAPI.createOrder(orderCreate);
    } catch (error) {}
  };
};

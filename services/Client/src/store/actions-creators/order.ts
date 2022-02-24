import { Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';
import { ServerAPI } from '../../api/api';
import { OrderAction, OrderActionTypes } from '../../types-reducers/order';

export const fetchCoordinates = (value) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
    } catch (e) {}
  };
};

export const FetchOrder = (id: string) => {
  return async (dispatch: Dispatch<OrderAction>) => {
    try {
      dispatch({ type: OrderActionTypes.FETCH_ORDER });
      const response = await ServerAPI.getOrder(id);
      dispatch({
        type: OrderActionTypes.FETCH_ORDER_SUCCES,
        payload: response
      });
    } catch (e) {}
  };
};

import {
  OrderAction,
  OrderActionTypes,
  OrderState
} from '../../types-reducers/order';

const initialState: OrderState = {
  order: null,
  isLoading: false,
  loaded: false,
  error: false,
  id: null
};

export const orderReducer = (
  state = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case OrderActionTypes.FETCH_ORDER_SUCCES:
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        loaded: true,
        error: false
      };
    case OrderActionTypes.FETCH_ORDER:
      return {
        ...state,
        isLoading: true
      };
    case OrderActionTypes.FETCH_ORDER_ERROR:
      return {
        ...state,
        loaded: true,
        isLoading: false,
        error: true
      };
    case OrderActionTypes.SEND_ORDER_SUCCES:
      return {
        ...state,
        isLoading: false,
        loaded: true,
        error: false,
        id: action.payload.id
      };
    case OrderActionTypes.SEND_ORDER:
      return {
        ...state,
        isLoading: true
      };
    case OrderActionTypes.SEND_ORDER_ERROR:
      return {
        ...state,
        loaded: true,
        isLoading: false,
        error: true
      };
    default:
      return state;
  }
};

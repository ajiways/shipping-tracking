import {
  OrderAction,
  OrderActionTypes,
  OrderState,
  OrderStatus
} from '../../types-reducers/order';

const initialState: OrderState = {
  order: null,
  isLoading: false,
  loaded: false,
  error: false
};

export const orderReducer = (
  state = initialState,
  action: OrderAction
): OrderState => {
  switch (action.type) {
    case OrderActionTypes.FETCH_ORDER_SUCCES:
      return {
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
    default:
      return state;
  }
};

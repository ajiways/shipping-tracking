import {
  OrderAction,
  OrderActionTypes,
  OrderState
} from '../../types-reducers/order';

const initialState: OrderState = {
  order: null,
  isLoadingCreate: false,
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
    case OrderActionTypes.FETCH_ORDER_SUCCESS:
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
    case OrderActionTypes.SEND_ORDER_SUCCESS:
      return {
        ...state,
        isLoadingCreate: false,
        loaded: true,
        error: false,
        id: action.payload.id
      };
    case OrderActionTypes.SEND_ORDER:
      return {
        ...state,
        isLoadingCreate: true
      };
    case OrderActionTypes.SEND_ORDER_ERROR:
      return {
        ...state,
        loaded: true,
        isLoadingCreate: false,
        error: true
      };
    default:
      return state;
  }
};

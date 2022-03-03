import {
  OrderAction,
  OrderActionTypes,
  OrderState
} from '../../types-reducers/order';

const initialState: OrderState = {
  order: null,
  isLoadingPaid: false,
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
    case OrderActionTypes.FETCH_ORDER:
      return {
        ...state,
        isLoading: true
      };
    case OrderActionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        order: action.payload,
        isLoading: false,
        loaded: true,
        error: false
      };
    case OrderActionTypes.FETCH_ORDER_ERROR:
      return {
        ...state,
        loaded: true,
        isLoading: false,
        error: true
      };
    case OrderActionTypes.SEND_ORDER:
      return {
        ...state,
        isLoadingCreate: true
      };
    case OrderActionTypes.SEND_ORDER_SUCCESS:
      return {
        ...state,
        isLoadingCreate: false,
        id: action.payload.id
      };
    case OrderActionTypes.SEND_ORDER_ERROR:
      return {
        ...state,
        isLoadingCreate: false
      };
    case OrderActionTypes.PAID_ORDER:
      return {
        ...state,
        isLoadingPaid: true
      };
    case OrderActionTypes.PAID_ORDER_SUCCESS:
      return {
        ...state,
        isLoadingPaid: false
      };
    case OrderActionTypes.PAID_ORDER_ERROR:
      return {
        ...state,
        isLoadingPaid: false
      };
    default:
      return state;
  }
};

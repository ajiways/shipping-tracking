import {
  OrderAction,
  OrderActionTypes,
  OrderState
} from '../../types-reducers/order';

const initialState: OrderState = {
  order: null,
  isLoading: false,
  loaded: false
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
        loaded: true
      };
    case OrderActionTypes.FETCH_ORDER:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

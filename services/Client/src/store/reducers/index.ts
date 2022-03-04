import { combineReducers } from '@reduxjs/toolkit';
import { orderReducer } from './orderReducer';

export const rootReducer = combineReducers({
  order: orderReducer
});

export type RootState = ReturnType<typeof rootReducer>;

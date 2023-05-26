import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import catalogReducer from './catalogSlice';
import cartReducer from './cartSlice';
import mapReducer from './mapSlice';

const store = configureStore({
  reducer: {
    orders: orderReducer,
    catalog: catalogReducer,
    cart: cartReducer,
    map: mapReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

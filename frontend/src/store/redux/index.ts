import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './orderSlice';
import catalogReducer from './catalogSlice';

const store = configureStore({
  reducer: {
    orders: orderReducer,
    catalog: catalogReducer,
  },
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

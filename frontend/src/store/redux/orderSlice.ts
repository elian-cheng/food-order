import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from './catalogSlice';

interface IOrder {
  shop: string;
  userId: string;
  userData: {
    name: string;
    phone: number;
    address: string;
  };
  products: IProduct[];
  totalPrice: number;
  date: Date;
}

interface IOrderState {
  orders: IOrder[];
}

const initialState: IOrderState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.unshift(action.payload);
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../../API/URL';
import { IGetUSer } from '../../API/authorization';
import storage from '../../utils/storage';
import { ICartItem } from './cartSlice';

export interface IOrder {
  _id?: string;
  shop: string;
  userId: string;
  userData: {
    name: string;
    phone: string;
    address: string;
  };
  products: ICartItem[];
  totalAmount: number;
  date: string;
}

interface IOrderState {
  orders: IOrder[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: IOrderState = {
  orders: [],
  isLoading: false,
  isError: false,
};

axios.interceptors.request.use((request) => {
  const auth = storage.getItem<IGetUSer>('userData');
  if (auth?.token && request.headers) {
    request.headers['Authorization'] = 'Bearer ' + auth.token;
  }

  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status == 401) {
      localStorage.removeItem('userData');
      location.reload();
      return Promise.reject({ message: 'Please login again.' });
    }
  }
);

export const getOrders = createAsyncThunk('orders/getOrders', async (id: string) => {
  try {
    const orders = await axios.get<IOrder[]>(`${BASE_URL}users/${id}/orders`);
    return orders.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
});

export const sendOrder = createAsyncThunk(
  'orders/sendOrder',
  async (params: { id: string; body: IOrder }) => {
    try {
      const response = await axios.post<IOrder[]>(
        `${BASE_URL}users/${params.id}/orders`,
        params.body
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      if (error.response) {
        const { status } = error.response;
        if (status === 400) {
          throw new Error('Bad request. Please provide valid credentials.');
        } else if (status === 401) {
          throw new Error('Unauthorized. Please check your email and password.');
        } else if (status === 403) {
          throw new Error('Your password is incorrect. Please check your credentials.');
        } else if (status === 404) {
          throw new Error('This email does not exist. Please check your credentials.');
        } else if (status === 500) {
          throw new Error('Internal server error. Please try again later.');
        } else {
          throw new Error('Server error. Please try again later.');
        }
      } else {
        throw new Error('An error occurred. Please try again later.');
      }
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(sendOrder.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;

import { BASE_URL } from './URL';
import { IGetUSer } from './authorization';
import axios from 'axios';
import storage from '../utils/storage';
import { ICartItem } from '../store/redux/cartSlice';

export interface IUserOrder {
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
    if (error.response.status == 401) {
      localStorage.removeItem('userData');
      location.reload();
      return Promise.reject({ message: 'Please login again.' });
    }
    return Promise.reject(error);
  }
);

export const getUserOrders = (id: string) => {
  return axios.get<IUserOrder[]>(`${BASE_URL}users/${id}/orders`);
};

export const setUserOrders = (id: string, body: IUserOrder) => {
  return axios.put<IUserOrder[]>(`${BASE_URL}users/${id}/orders`, body);
};

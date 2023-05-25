import { BASE_URL } from './URL';
import { IGetUSer, USER } from './authorization';
import axios from 'axios';
import storage from '../utils/storage';
import { IProduct } from './products';

export interface IUserOrder {
  shop: string;
  userId: string;
  userData: {
    name: string;
    phone: string;
    address: string;
  };
  products: IProduct[];
  totalPrice: string;
  date: Date;
}

export const USER_ORDERS = `${USER}/orders`;

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
export const setUserOrder = (id: string, body: IUserOrder) => {
  return axios.put<IUserOrder[]>(`${BASE_URL}users/${id}/orders`, body);
};

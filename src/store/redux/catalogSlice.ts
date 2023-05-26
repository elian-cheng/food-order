import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../../API/URL';
import axios, { AxiosError } from 'axios';

export interface IProduct {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  price: number;
  weight: number;
  calories: number;
  category: string;
  shop: string;
  image: string;
}

interface ICatalogState {
  shop: string;
  products: IProduct[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: ICatalogState = {
  shop: 'burgerville',
  products: [],
  isLoading: false,
  isError: false,
};

export const getProducts = createAsyncThunk('catalog/getProducts', async (shop: string) => {
  try {
    const products = await axios.get(`${BASE_URL}products?shop=${shop}`);
    return products.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
});

export const getProduct = createAsyncThunk('catalog/getProduct', async (id: string) => {
  try {
    const product = await axios.get(`${BASE_URL}products/${id}`);
    return product.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message);
  }
});

export const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {
    setShop: (state, { payload }) => ({ ...state, shop: payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(getProduct.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.error(action.error.message);
      });
  },
});

export const { setShop } = catalogSlice.actions;

export default catalogSlice.reducer;

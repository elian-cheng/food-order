import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import storage from '../../utils/storage';

export interface ICartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface ICartState {
  cartItems: ICartItem[];
  totalQuantity: number;
  changed?: boolean;
  totalAmount: number;
}

// const initialState: ICartState = {
//   items: [],
//   totalQuantity: 0,
//   totalAmount: 0
//   changed: false,
// };

const saveCarttoLS = (cartItems: ICartItem[], totalAmount: number, totalQuantity: number) => {
  storage.setItem('cartItems', cartItems);
  storage.setItem('totalAmount', totalAmount);
  storage.setItem('totalQuantity', totalQuantity);
};

const initialState: ICartState = {
  cartItems: storage.getItem('cartItems') || [],
  totalQuantity: (storage.getItem('totalQuantity') as number) || 0,
  totalAmount: (storage.getItem('totalAmount') as number) || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(
      state,
      action: PayloadAction<{ totalQuantity: number; totalAmount: number; items: ICartItem[] }>
    ) {
      state.totalAmount = action.payload.totalAmount;
      state.cartItems = action.payload.items;
    },
    addItemToCart(state, action: PayloadAction<ICartItem>) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      // state.changed = true;
      if (!existingItem) {
        state.cartItems.push({
          id: newItem.id,
          price: newItem.price,
          quantity: newItem.quantity,
          totalPrice: newItem.price,
          title: newItem.title,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      saveCarttoLS(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;
      // state.changed = true;
      if (existingItem?.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else if (existingItem) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      saveCarttoLS(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },
  },
});

export const { replaceCart, addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;

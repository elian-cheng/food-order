import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICartItem {
  id: number;
  price: number;
  quantity: number;
  totalPrice: number;
  name: string;
}

interface ICartState {
  items: ICartItem[];
  totalQuantity: number;
  changed: boolean;
}

const initialState: ICartState = {
  items: [],
  totalQuantity: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action: PayloadAction<{ totalQuantity: number; items: ICartItem[] }>) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItemToCart(
      state,
      action: PayloadAction<{
        id: number;
        price: number;
        title: string;
      }>
    ) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem?.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else if (existingItem) {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
    },
  },
});

export const { replaceCart, addItemToCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;

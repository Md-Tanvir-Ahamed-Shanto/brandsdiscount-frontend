import { ISingleProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICartProduct extends ISingleProduct {
  quantity: number;
}

interface ICart {
  products: ICartProduct[];
}

const initialState: ICart = {
  products: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ISingleProduct>) => {
      const existingProduct = state.products.find(p => p.id === action.payload.id);
      if (!existingProduct) {
        state.products.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },

    clearCart: (state) => {
      state.products = [];
    },

    incrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },

    decrementQuantity: (state, action: PayloadAction<string>) => {
      const product = state.products.find(p => p.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
  }
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity
} = cartSlice.actions;

export default cartSlice.reducer;

//
// Selectors
//
export const selectCartProducts = (state: { cart: ICart }) => state.cart.products;

export const selectCartSubtotal = (state: { cart: ICart }) =>
  state.cart.products.reduce((total, product) => {
    return total + product.salePrice * product.quantity;
  }, 0);

export const selectCartSavings = (state: { cart: ICart }) =>
  state.cart.products.reduce((total, product) => {
    return total + (product.regularPrice - product.salePrice) * product.quantity;
  }, 0);

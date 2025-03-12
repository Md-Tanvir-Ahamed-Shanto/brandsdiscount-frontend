import { baseApi } from './baseApi';
import { cartSlice } from './cart';

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartSlice.reducer
};

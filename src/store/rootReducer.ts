import { baseApi } from './baseApi';
import { cartSlice } from './cart'; 
import { orderSlice } from './order';

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartSlice.reducer, 
    order: orderSlice.reducer, 
};

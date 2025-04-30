import { baseApi } from './baseApi';
import { cartSlice } from './cart'; 
import { orderSlice } from './order';
import { publicApi } from './publicApi';

export const reducer = {
    [baseApi.reducerPath]: baseApi.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    cart: cartSlice.reducer, 
    order: orderSlice.reducer, 
};

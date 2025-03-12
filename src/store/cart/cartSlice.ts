import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IProduct {
    name: string;
    quantity: number;
}

interface ICart {
    products: IProduct[];
}

const initialState: ICart = {
    products: []
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<IProduct>) => {
            state.products.push(action.payload);
        }
    }
});

export default cartSlice.reducer;
export const { addToCart } = cartSlice.actions;

import { ISingleProduct } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICartProduct extends ISingleProduct {
    quantity: number;
}

interface ICart {
    products: ICartProduct[];
    discountedTotal: number;
    appliedPoints: number;
}

const initialState: ICart = {
    products: [],
    discountedTotal: 0,
    appliedPoints: 0
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<ICartProduct>) => {
            const existingProduct = state.products.find(
                (p) => p.id === action.payload.id
            );
            if (!existingProduct) {
                state.products.push(action.payload);
            } else {
                existingProduct.quantity += action.payload.quantity;
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            state.products = state.products.filter(
                (p) => p.id !== action.payload
            );
        },

        clearCart: (state) => {
            state.products = [];
            state.discountedTotal = 0;
        },

        incrementQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find((p) => p.id === action.payload);
            if (product) {
                product.quantity += 1;
            }
        },

        decrementQuantity: (state, action: PayloadAction<string>) => {
            const product = state.products.find((p) => p.id === action.payload);
            if (product && product.quantity > 1) {
                product.quantity -= 1;
            }
        },

        setAppliedPointsFromStore: (state, action: PayloadAction<number>) => {
            state.appliedPoints = action.payload;
        },

        setDiscountedTotal: (state, action: PayloadAction<number>) => {
            state.discountedTotal = action.payload;
        }
    }
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
    setDiscountedTotal,
    setAppliedPointsFromStore
} = cartSlice.actions;

export default cartSlice.reducer;

//
// Selectors
//
export const selectCartProducts = (state: { cart: ICart }) =>
    state.cart.products;

export const selectCartSubtotal = (state: { cart: ICart }) =>
    state.cart.products.reduce((total, product) => {
        return total + (product.salePrice ?? 0) * product.quantity;
    }, 0);

export const selectCartSavings = (state: { cart: ICart }) =>
    state.cart.products.reduce((total, product) => {
        return (
            total +
            ((product.regularPrice ?? 0) - (product.salePrice ?? 0)) *
                (product.quantity ?? 0)
        );
    }, 0);

export const selectDiscountedTotal = (state: { cart: ICart }) =>
    state.cart.discountedTotal;

export const getDiscountedSubtotal = (
    subtotal: number,
    discountAmount: number
): number => {
    const discounted = subtotal - discountAmount;
    return discounted >= 0 ? discounted : 0;
};

export const selectAppliedPoints = (state: { cart: ICart }) =>
    state.cart.appliedPoints;

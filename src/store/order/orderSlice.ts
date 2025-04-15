import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
interface IOrder { 
  finalAmount: number;
  usedRedeemPoint: number;

}

const initialState: IOrder = { 
  finalAmount: 0,
  usedRedeemPoint: 0,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {  
    setFinalAmount: (state, action: PayloadAction<number>) => {
      state.finalAmount = action.payload;
    },
    setUsedRedeemPoint: (state, action: PayloadAction<number>) => {
      state.usedRedeemPoint = action.payload;
    },
  }
});

export const { 
  setFinalAmount,
  setUsedRedeemPoint
} = orderSlice.actions;

export default orderSlice.reducer;
 
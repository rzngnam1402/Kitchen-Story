import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    addOrder: (state, action) => {
      console.log("order", action.payload);
      state.push(action.payload);
    },
    removeOrder: (state, action) => {
      return state.filter((order) => order.id !== action.payload);
    },
    resetCart: (state) => {
        state = [];
    },
  },
});

export const { addOrder, removeOrder, resetCart } = ordersSlice.actions;
export default ordersSlice.reducer;

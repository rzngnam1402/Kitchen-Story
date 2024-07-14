import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";
import ordersReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    orders: ordersReducer,
  },
});

export default store;

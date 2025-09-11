import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState = {
  pausedOrders: [],
  pendingOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const homePageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPausedOrders: (state, action) => {
      state.pausedOrders = action.payload;
    },
    setPendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const {
  setPausedOrders,
  setProcessOrders,
  setFinishedOrders,
  setPendingOrders,
} = homePageSlice.actions;

const OrdersPageReducer = homePageSlice.reducer;
export default OrdersPageReducer;

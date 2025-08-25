import { createSlice } from "@reduxjs/toolkit";
import { ProductPageState } from "../../../lib/types/screen";

const initialState: ProductPageState = {
  restaurant: null,
  chosenProduct: null,
  products: [],
};

const productPageState = createSlice({
  name: "productPage",
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChosenProdcut: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setRestaurant, setChosenProdcut, setProducts } =
  productPageState.actions;

const ProductPageReducer = productPageState.reducer;
export default ProductPageReducer;

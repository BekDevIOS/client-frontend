import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectProductPage = (state: AppRootState) => state.productPage;

export const retrieveRestaurant = createSelector(
  selectProductPage,
  (productPage) => productPage.restaurant
);

export const retrieveChosenProduct = createSelector(
  selectProductPage,
  (productPage) => productPage.chosenProduct
);

export const retrieveProducts = createSelector(
  selectProductPage,
  (productPage) => productPage.products
);

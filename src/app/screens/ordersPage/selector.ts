import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(
  selectHomePage,
  (ordersPage) => ordersPage.pausedOrders
);

export const retrieveProcessOrders = createSelector(
  selectHomePage,
  (ordersPage) => ordersPage.processOrders
);

export const retrieveFinishedOrders = createSelector(
  selectHomePage,
  (ordersPage) => ordersPage.finishedOrders
);

import React from "react";
import { Box, Button, Stack } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { retrieveFinishedOrders } from "./selector";
import { useGlobals } from "../../hooks/useGlobals";
import { T } from "../../../lib/types/common";
import { OrderStatus, PaymentStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";

/** REDUX SLICE & SELECTOR */

const finishedOrdersRetriever = createSelector(
  retrieveFinishedOrders,
  (finishedOrders) => ({ finishedOrders })
);

export default function FinishedOrders() {
  const { finishedOrders } = useSelector(finishedOrdersRetriever);
  const { authTable, setOrderBulder } = useGlobals();

  /** HANDLERS **/
  const complatedOrderHandler = async (e: T) => {
    try {
      if (!authTable) throw new Error(Messages.error2);
      //  PAYMENT PROCESS

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.COMPLETED,
        paymentStatus: PaymentStatus.PAID,
      };

      const confirmation = window.confirm(
        "Do you want to complete with payment?"
      );
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setOrderBulder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value="3">
      <Stack>
        {finishedOrders?.map((order: Order) => {
          return (
            <Box key={order._id} className="order-main-box">
              <Box className="order-box-scroll">
                {order.orderItems?.map((item: OrderItem) => {
                  const product: Product = order.productData.filter(
                    (ele: Product) => item.productId === ele._id
                  )[0];
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Box key={item._id} className="orders-name-price">
                      <img src={imagePath} className="order-dish-img" />
                      <p className="title-dish">{product.productName}</p>
                      <Box className="price-box">
                        <p>${item.itemPrice}</p>
                        <img src={"/icons/close.svg"} />
                        <p>{item.itemQuantity}</p>
                        <img src="/icons/pause.svg" />
                        <p>${item.itemQuantity * item.itemPrice}</p>
                      </Box>
                    </Box>
                  );
                })}
                <Box className="total-price-box">
                  <Box className="box-total">
                    <p>Product price</p>
                    <p>${order.orderTotal - order.orderDelivery}</p>
                    <img src={"/icons/plus.svg"} />
                    <p>delivery cost</p>
                    <p>${order.orderDelivery}</p>
                    <img src={"/icons/pause.svg"} />
                    <p>Total</p>
                    <p>${order.orderTotal}</p>
                    {authTable && (
                      <Button
                        value={order._id}
                        variant="contained"
                        className="verify-button"
                        onClick={complatedOrderHandler}
                      >
                        payment
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}

        {!finishedOrders ||
          (finishedOrders.length === 0 && (
            <Box
              width={"800px"}
              display="flex"
              flexDirection="row"
              justifyContent="center"
            >
              <img
                src={"/icons/noimage-list.svg"}
                style={{ width: 400, height: 400 }}
              />
            </Box>
          ))}
      </Stack>
    </TabPanel>
  );
}

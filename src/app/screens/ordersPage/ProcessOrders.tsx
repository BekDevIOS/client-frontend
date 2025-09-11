import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { retrievePendingOrders, retrieveProcessOrders } from "./selector";
import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { Order, OrderItem, OrderUpdateInput } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";
import { Messages, serverApi } from "../../../lib/config";
import { useGlobals } from "../../hooks/useGlobals";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { T } from "../../../lib/types/common";

/** REDUX SLICE & SELECTOR */

const pendingOrdersRetriever = createSelector(
  retrievePendingOrders,
  (pendingOrders) => ({ pendingOrders })
);

const processOrdersRetriever = createSelector(
  retrieveProcessOrders,
  (processOrders) => ({ processOrders })
);

interface ProcessOrdersProps {
  setValue: (input: string) => void;
  callHandler: (id: string) => void;
}

export default function ProcessOrders(props: ProcessOrdersProps) {
  const { setValue, callHandler } = props;
  const { authMember, setOrderBulder, authTable } = useGlobals();
  const { processOrders } = useSelector(processOrdersRetriever);
  const { pendingOrders } = useSelector(pendingOrdersRetriever);

  /** HANDLERS **/
  const deleteOrderHandler = async (e: T) => {
    try {
      if (!authTable && !authMember) throw new Error(Messages.error2);
      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.CANCELLED,
      };

      const confirmation = window.confirm("Do you want to delete the order?");
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

  const finishOrderHandler = async (e: T) => {
    try {
      if (!authMember) throw new Error(Messages.error2);

      const orderId = e.target.value;
      const input: OrderUpdateInput = {
        orderId: orderId,
        orderStatus: OrderStatus.COMPLETED,
      };

      const confirmation = window.confirm("Have you received your order?");
      if (confirmation) {
        const order = new OrderService();
        await order.updateOrder(input);
        setValue("3");
        setOrderBulder(new Date());
      }
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };
  return (
    <TabPanel value="2">
      <Stack>
        {pendingOrders?.concat(processOrders).map((order: Order) => {
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
                        <img src="/icons/close.svg" />
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
                  </Box>
                  <p className="data-compl">
                    {moment().format("YY-MM-DD HH:mm")}
                  </p>

                  <Button
                    value={order._id}
                    variant="contained"
                    className="cancel-button"
                    color={"secondary"}
                    onClick={deleteOrderHandler}
                    disabled={order.orderStatus !== OrderStatus.PENDING}
                  >
                    cancel
                  </Button>
                  <Button
                    value={order._id}
                    variant="contained"
                    className="verify-button"
                    onClick={(e) => {
                      if (authMember) {
                        finishOrderHandler(e);
                      } else if (authTable) {
                        callHandler(authTable._id);
                      }
                    }}
                  >
                    {authMember ? "Verify" : "Call"}
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}

        {pendingOrders?.concat(processOrders)?.length === 0 && (
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
        )}
      </Stack>
    </TabPanel>
  );
}

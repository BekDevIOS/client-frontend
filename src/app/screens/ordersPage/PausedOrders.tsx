import React from "react";
import { Box, Stack } from "@mui/material";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";

export default function PausedOrders() {
  return (
    <TabPanel value="1">
      <Stack>
        {[1, 2].map((ele, index) => {
          return (
            <Box key={index} className="order-main-box">
              <Box className="order-box-scroll">
                {[1, 2].map((ele2, index2) => {
                  return (
                    <Box key={index2} className="orders-name-price">
                      <img
                        src="/img/kebab.webp"
                        className="order-dish-img"
                      />
                      <p className="title-dish">Kebab</p>
                      <Box className="price-box">
                        <p>$11</p>
                        <img src="/icons/close.svg" />
                        <p>2</p>
                        <img src="/icons/pause.svg" />
                        <p >$22</p>
                      </Box>
                    </Box>
                  );
                })}
                <Box className="total-price-box">
                  <Box className="box-total">
                    <p>Product price</p>
                    <p>$22</p>
                    <img
                      src={"/icons/plus.svg"}
                    />
                    <p>delivery cost</p>
                    <p>$2</p>
                    <img
                      src={"/icons/pause.svg"}
                    />
                    <p>Total</p>
                    <p>$24</p>
                  </Box>
                  <Button variant="contained" className="cancel-button" color={"secondary"}>
                    cancel
                  </Button>
                  <Button variant="contained" className="verify-button">
                    payment
                  </Button>
                </Box>
              </Box>
            </Box>
          );
        })}

        {false && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
          >
            <img
              src={"/icons/noimage-list.svg"}
              style={{ width: 300, height: 300 }}
            />
          </Box>
        )}
      </Stack>
    </TabPanel>
  );
}

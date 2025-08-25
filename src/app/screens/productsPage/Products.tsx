import React from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useDispatch, useSelector } from "react-redux";
import { createSelector, Dispatch } from "@reduxjs/toolkit";
import { setProducts } from "./slice";
import { Product } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
);


const products = [
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Lavash", imagePath: "/img/lavash.webp" },
  { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
  { productName: "Kebab", imagePath: "/img/kebab.webp" },
  { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
];


export default function Products() {
  return (
    <div className="products-page">
      <div className="products">
        <Container>
          <Stack flexDirection={"column"} alignItems={"center"} mt="77px">
            <Stack 
              flexDirection={"row"} 
              justifyContent={"right"} 
              alignItems={"center"}
              width={"100%"}
            >
              <Stack className="avatar-big-box">
                <Box className="top-text">Burak restaurant</Box>
                <Stack flexDirection={"row"} alignItems={"center"}>
                  <input placeholder="Type here" className="input" />
                  <Button 
                    variant="contained"
                    color="primary"
                    className="input-btn"
                  >
                    Search
                    <SearchIcon/>
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack className="dishes-filter-section">
              <Button
                variant={"contained"}
                color={"primary"}
                className={"order"}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={"secondary"}
                className={"order"}
                sx={{marginRight:"56px"}}
              >
                Views
              </Button>
            </Stack>
            <Stack className="list-category-section" >
              <Stack className="product-category">
                {["DISH", "salad", "drink", "desert", "other"].map((item, i) =>(
                  
                    <Button
                      key={i}
                      variant={"contained"}
                      color={item === "DISH" ? "primary" : "secondary"}
                      className="order"
                      sx={{marginTop:item === "DISH" ? "25px" : "10px"}}
                    >
                    {item}
                    </Button>
                
                ))}
              </Stack>
              <Stack className="product-wrapper">
                {products.length !==0 ? (
                  products.map((product, index) => {
                    return (
                      <Stack key={index} className="product-card">
                        <Stack
                          className="product-img"
                          sx={{ backgroundImage: `url(${product.imagePath})` }}
                        >
                          <div className="product-sale">Normal size</div>
                          <Button className="shop-btn">
                            <img
                              src="/icons/shopping-cart.svg"
                              style={{ display: "flex" }}
                            />
                          </Button>
                          <Button className="view-btn" >
                            <Badge badgeContent={20} color="secondary">
                              <RemoveRedEyeIcon
                                sx={{
                                  color:"white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                        <Box className="product-desc">
                          <span className="product-title">{product.productName}</span>
                          <div className="product-desc">
                            <MonetizationOnIcon />
                            {12}
                          </div>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className="no-data">Products are not available!</Box>
                )}
              </Stack>
            </Stack>
            <Stack className="pagination-section">
              <Stack spacing={2}>
                <Pagination
                  count={3}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                      color={"secondary"}
                    />
                  )}
                />
              </Stack>
            </Stack>
          </Stack>
        </Container>
        <div className="brands-logo">
          <Container sx={{marginTop:"84px"}}>
            <Box className="logo-title">
              Our family brands
            </Box>
            <Stack className="logo-imgs">
              <Button>
                <img src="/img/gurme.webp" alt=""/>
              </Button>
              <Button>
                <img src="/img/seafood.webp" alt=""/>
              </Button>
              <Button>
                <img src="/img/sweets.webp" alt=""/>
              </Button>
              <Button>
                <img src="/img/doner.webp" alt=""/>
              </Button>
            </Stack>
          </Container>
        </div>

        <div className="address">
          <Container>
            <Stack className="address-area">
              <Box className="title">Our address</Box>
              <iframe
                style={{ marginTop: "60px" }}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3167.319131247058!2d128.0829753!3d35.1801889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356e308da2897b87%3A0x3880b1459bb117c0!2sJinju-si%2C%20Gyeongsangnam-do%2C%20South%20Korea!5e0!3m2!1sen!2skr!4v1696240032161!5m2!1sen!2skr"
                width="1320"
                height="570"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Stack>
          </Container>
        </div>

      </div>
    </div>
  )
}
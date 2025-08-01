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
      </div>
    </div>
  )
}
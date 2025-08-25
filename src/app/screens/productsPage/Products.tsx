import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack, StepIconClassKey } from "@mui/material";
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
import { Product, ProductInquiry } from "../../../lib/types/product";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enums";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";

/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

export default function Products() {
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>("");
  const history = useHistory();

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);

  /** HANDLERS */

  const searchCollectionHandler = (colletion: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = colletion;
    setProductSearch({ ...productSearch });
  };

  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };

  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };

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
                  <input
                    type="search"
                    name="singleResearch"
                    placeholder="Type here"
                    className="input"
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") searchProductHandler();
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className="input-btn"
                    endIcon={<SearchIcon />}
                    onClick={searchProductHandler}
                  >
                    Search
                  </Button>
                </Stack>
              </Stack>
            </Stack>
            <Stack className="dishes-filter-section">
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                className={"order"}
                sx={{ marginRight: "56px" }}
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
            <Stack className="list-category-section">
              <Stack className="product-category">
                {[
                  ProductCollection.DISH,
                  ProductCollection.DESSERT,
                  ProductCollection.DRINK,
                  ProductCollection.OTHER,
                  ProductCollection.SALAD,
                ].map((item, i) => (
                  <Button
                    key={i}
                    variant={"contained"}
                    color={
                      productSearch.productCollection === item
                        ? "primary"
                        : "secondary"
                    }
                    className="order"
                    sx={{ marginTop: item === "DISH" ? "25px" : "10px" }}
                    onClick={() => searchCollectionHandler(item)}
                  >
                    {item}
                  </Button>
                ))}
              </Stack>
              <Stack className="product-wrapper">
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + "litre"
                        : product.productSize + "size";
                    return (
                      <Stack
                        key={product._id}
                        className="product-card"
                        onClick={() => chooseDishHandler(product._id)}
                      >
                        <Stack
                          className="product-img"
                          sx={{ backgroundImage: `url(${imagePath})` }}
                        >
                          <div className="product-sale">{sizeVolume}</div>
                          <Button className="shop-btn">
                            <img
                              src="/icons/shopping-cart.svg"
                              style={{ display: "flex" }}
                            />
                          </Button>
                          <Button className="view-btn">
                            <Badge
                              badgeContent={product.productViews}
                              color="secondary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  color:
                                    product.productViews === 0
                                      ? "gray"
                                      : "white",
                                }}
                              />
                            </Badge>
                          </Button>
                        </Stack>
                        <Box className="product-desc">
                          <span className="product-title">
                            {product.productName}
                          </span>
                          <div className="product-desc">
                            <MonetizationOnIcon />
                            {product.productPrice}
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
                  count={
                    products.length !== 0
                      ? productSearch.page + 1
                      : productSearch.page
                  }
                  page={productSearch.page}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                      color={"secondary"}
                    />
                  )}
                  onChange={paginationHandler}
                />
              </Stack>
            </Stack>
          </Stack>
        </Container>
        <div className="brands-logo">
          <Container sx={{ marginTop: "84px" }}>
            <Box className="logo-title">Our family brands</Box>
            <Stack className="logo-imgs">
              <Button>
                <img src="/img/gurme.webp" alt="" />
              </Button>
              <Button>
                <img src="/img/seafood.webp" alt="" />
              </Button>
              <Button>
                <img src="/img/sweets.webp" alt="" />
              </Button>
              <Button>
                <img src="/img/doner.webp" alt="" />
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
  );
}

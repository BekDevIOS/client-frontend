import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { useGlobals } from "../../hooks/useGlobals";

const Footers = styled.div`
  width: 100%;
  height: 590px;
  display: flex;
  background: #343434;
  background-size: cover;
`;

export default function Footer() {
  const { authMember, authTable } = useGlobals();
  const device = useDeviceDetect();

  if(device === "mobile") {
    if(authTable) {
      return null;
    } else {
      return <div>Mobile Footer</div>;
    }
  } else {
  return (
    <Footers>
      <Container>
        <Stack flexDirection={"row"} sx={{ mt: "94px" }}>
          <Stack flexDirection={"column"} style={{ width: "340px" }}>
            <Box>
              <img width={"100px"} src={"/icons/navruz.svg"} />
            </Box>
            <Box className={"foot-desc-txt"}>
              Celebrating the spirit of Uzbekistan, Navruz Restaurant brings
              authentic flavors of plov, kebabs, and traditional dishes to your
              table. A place where culture meets taste.
            </Box>
            <Box className="sns-context">
              <img src={"/icons/facebook.svg"} />
              <img src={"/icons/twitter.svg"} />
              <img src={"/icons/instagram.svg"} />
              <img src={"/icons/youtube.svg"} />
            </Box>
          </Stack>
          <Stack sx={{ ml: "288px" }} flexDirection={"row"}>
            <Stack>
              <Box>
                <Box className={"foot-category-title"}>Sections</Box>
                <Box className={"foot-category-link"}>
                  <Link to="/">Home</Link>
                  <Link to="/products">Menu</Link>
                  {authMember && <Link to="/orders">Orders</Link>}
                  <Link to="/help">Help</Link>
                  <Link to="/about">About</Link>
                </Box>
              </Box>
            </Stack>
            <Stack sx={{ ml: "100px" }}>
              <Box>
                <Box className={"foot-category-title"}>Find us</Box>
                <Box
                  flexDirection={"column"}
                  sx={{ mt: "20px" }}
                  className={"foot-category-link"}
                  justifyContent={"space-between"}
                >
                  <Box flexDirection={"row"} className={"find-us"}>
                    <span>L.</span>
                    <div>Amir Temur Street, Tashkent</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>P.</span>
                    <div>+998 90 123 45 67</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>E.</span>
                    <div>navruz.restaurant@gmail.com</div>
                  </Box>
                  <Box className={"find-us"}>
                    <span>H.</span>
                    <div>Open 24/7</div>
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          style={{ border: "1px solid #C5C8C9", width: "100%", opacity: "0.2" }}
          sx={{ mt: "80px" }}
        ></Stack>
        <Stack className={"copyright-txt"}>
          © {new Date().getFullYear()} Navruz Restaurant, All rights reserved.
        </Stack>
      </Container>
    </Footers>
    );
  }
}

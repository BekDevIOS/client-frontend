import React from "react";
import { Box, Container, Stack } from "@mui/material";
import Divider from "../../components/divider";

export default function Statistics(){
  return (
  <div className="static-frame">
    <Container>
      <Stack className="info">
        <Stack className="static-box">
          <Box className="static-num">5</Box>
          <Box className="static-text">Restaurant</Box>
        </Stack>
        <Divider height="64" width="2" bg="#e3c08d"/>
        <Stack className="static-box">
          <Box className="static-num">4</Box>
          <Box className="static-text">Experience</Box>
        </Stack>
        <Divider height="64" width="2" bg="#e3c08d"/>
        <Stack className="static-box">
          <Box className="static-num">100+</Box>
          <Box className="static-text">Menu</Box>
        </Stack>
        <Divider height="64" width="2" bg="#e3c08d"/>
        <Stack className="static-box">
          <Box className="static-num">150+</Box>
          <Box className="static-text">Clients</Box>
        </Stack>
      </Stack>
    </Container>
  </div>
  );
}
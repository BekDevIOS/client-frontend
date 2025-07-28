import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Card, CssVarsProvider, Typography } from "@mui/joy";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";

const activeUsers = [
  {memberNick: "Martin", memberImage: "/img/martin.webp"},
  {memberNick: "Jay", memberImage: "/img/justin.webp"},
  {memberNick: "Rose", memberImage: "/img/rose.webp"},
  {memberNick: "Nusret", memberImage: "/img/nusret.webp"},
];

export default function ActiveUsers(){
  return (
  <div className="active-users">
    <Container>
      <Stack className="main">
        <Box className="category-title">Active Users</Box>
        <Stack className="cards-frame">
          <CssVarsProvider>
            {activeUsers.length !==0 ? (
              activeUsers.map((val, index) => {
                return (
                  <Card key={index} variant="outlined" className="card">
                    <CardOverflow>
                      <AspectRatio ratio={"1"}>
                        <img src={val.memberImage} alt="" />
                      </AspectRatio>
                    </CardOverflow>
                    <CardOverflow variant="soft" className="member-nickname">
                      <Typography>{val.memberNick}</Typography>
                    </CardOverflow>
                  </Card>
                );
              })
            ) : (
              <Box className="no-data">New products are not available!</Box>
            )}
          </CssVarsProvider>
        </Stack>
      </Stack>
    </Container>
  </div>
  );
}
import { AppBar, Container, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

export default function AppBarTop() {
  const location = useLocation();

  function getPageName() {
    if (location.pathname === "/") {
      return "Home";
    }
    if (location.pathname === "/history") {
      return "History";
    }
  }

  return (
    <AppBar position="static">
      <Container maxWidth="x1">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {getPageName()}
        </Typography>
      </Container>
    </AppBar>
  );
}

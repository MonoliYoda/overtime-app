import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../contexts/FirebaseContext";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SettingsIcon from "@mui/icons-material/Settings";
import withContext from "../withContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [value, setValue] = useState();
  const { currentUser, testDatabase } = useAuth();
  const navigate = useNavigate();

  if (currentUser) {
    return (
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
            onClick={() => navigate("/")}
          />
          <BottomNavigationAction
            label="History"
            value="history"
            icon={<ViewListIcon />}
            onClick={() => navigate("/history")}
          />
          <BottomNavigationAction
            label="Stats"
            value="statstics"
            icon={<EqualizerIcon />}
            onClick={() => navigate("/stats")}
          />
          <BottomNavigationAction
            label="Settings"
            value="settings"
            icon={<SettingsIcon />}
            onClick={() => navigate("/settings")}
          />
        </BottomNavigation>
      </Paper>
    );
  } else {
    return null;
  }
}

export default withContext(Navbar);

import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../contexts/FirebaseContext";
import HomeIcon from "@mui/icons-material/Home";
import ViewListIcon from "@mui/icons-material/ViewList";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Navbar() {
  const [value, setValue] = useState();
  const { currentUser, testDatabase } = useAuth();

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
            onClick={testDatabase}
          />
          <BottomNavigationAction
            label="History"
            value="history"
            icon={<ViewListIcon />}
          />
          <BottomNavigationAction
            label="Stats"
            value="statstics"
            icon={<EqualizerIcon />}
          />
          <BottomNavigationAction
            label="Settings"
            value="settings"
            icon={<SettingsIcon />}
          />
        </BottomNavigation>
      </Paper>
    );
  } else {
    return "";
  }
}

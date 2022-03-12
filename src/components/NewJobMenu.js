import { CreateNewFolder, Work } from "@mui/icons-material";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NewJobMenu() {
  const actions = [
    { icon: <Work />, name: "Day", action: openNewJob },
    { icon: <CreateNewFolder />, name: "Project" },
  ];
  const navigate = useNavigate();

  function openNewJob(e) {
    navigate("/new");
  }

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 64, right: 16 }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => action.action()}
        />
      ))}
    </SpeedDial>
  );
}

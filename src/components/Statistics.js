import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import withContext from "../withContext";
import MonthlyStats from "./MonthlyStats";
import WeeklyStats from "./WeeklyStats";
import YearlyStats from "./YearlyStats";

function Statistics(props) {
  const fb = { ...props.value };
  const [value, setValue] = useState("week");

  function handleChange(e, newVal) {
    setValue(newVal);
  }

  useEffect(() => {}, []);

  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Tydzień" value="week" />
          <Tab label="Miesiąc" value="month" />
          <Tab label="Rok" value="year" />
        </TabList>
      </Box>
      <TabPanel value="week">
        <WeeklyStats />
      </TabPanel>
      <TabPanel value="month">
        <MonthlyStats />
      </TabPanel>
      <TabPanel value="year">
        <YearlyStats />
      </TabPanel>
    </TabContext>
  );
}

export default withContext(Statistics);

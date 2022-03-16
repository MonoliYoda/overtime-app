import { Grid } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";

export default function MonthlyStats() {
  function getFirstDayOfMonth(d) {
    let date = new Date(d);
    let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return firstDay;
  }

  function getLastDayOfMonth(d) {
    let date = new Date(d);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDay;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StatsCard
          startDate={getFirstDayOfMonth(new Date())}
          endDate={getLastDayOfMonth(new Date())}
          title="Ten miesiąc"
        />
      </Grid>
      <Grid item xs={12}>
        <StatsCard
          startDate={getFirstDayOfMonth(
            new Date().setDate(new Date().getDate() - 7)
          )}
          endDate={getLastDayOfMonth(
            new Date().setDate(new Date().getDate() - 7)
          )}
          title="Poprzedni miesiąc"
        />
      </Grid>
    </Grid>
  );
}

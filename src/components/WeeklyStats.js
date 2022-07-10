import React from "react";
import { Grid } from "@mui/material";
import StatsCard from "./StatsCard";

export default function WeeklyStats() {
  // const today = new Date();

  function getFirstDayOfWeek(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  function getLastDayOfWeek(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1) + 6;
    return new Date(date.setDate(diff));
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StatsCard
          startDate={getFirstDayOfWeek(new Date())}
          endDate={getLastDayOfWeek(new Date())}
          title="Ten tydzień"
        />
      </Grid>
      <Grid item xs={12}>
        <StatsCard
          startDate={getFirstDayOfWeek(
            new Date().setDate(new Date().getDate() - 7)
          )}
          endDate={getLastDayOfWeek(
            new Date().setDate(new Date().getDate() - 7)
          )}
          title="Poprzedni tydzień"
        />
      </Grid>
    </Grid>
  );
}

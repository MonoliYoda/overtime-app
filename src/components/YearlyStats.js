import { Grid } from "@mui/material";
import React from "react";
import StatsCard from "./StatsCard";

export default function YearlyStats() {
  function getFirstDayOfYear(d) {
    const date = new Date(d);
    return new Date(date.getFullYear(), 0, 1);
  }

  function getLastDayOfYear(d) {
    const date = new Date(d);
    return new Date(date.getFullYear(), 11, 31);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <StatsCard
          startDate={getFirstDayOfYear(new Date())}
          endDate={getLastDayOfYear(new Date())}
          title="Ten rok"
        />
      </Grid>
      <Grid item xs={12}>
        <StatsCard
          startDate={getFirstDayOfYear(
            new Date().setDate(new Date().getDate() - 365)
          )}
          endDate={getLastDayOfYear(
            new Date().setDate(new Date().getDate() - 365)
          )}
          title="Poprzedni rok"
        />
      </Grid>
    </Grid>
  );
}

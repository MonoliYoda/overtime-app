import { MoreHoriz } from "@mui/icons-material";
import {
  Card,
  CardHeader,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export default function ActiveJobCard({ activeJob }) {
  return (
    <Grid item xs={12}>
      <Card variant="outlined">
        <CardHeader
          title={
            <Stack>
              <Typography variant="h4">
                {activeJob && activeJob.name}
              </Typography>
              <Typography>12/03/2022</Typography>
            </Stack>
          }
          action={
            <IconButton>
              <MoreHoriz />
            </IconButton>
          }
        ></CardHeader>
        <Grid container alignItems="center">
          {/* divider={<Divider orientation="vertical" flexItem />} */}
          <Grid item xs={8}>
            <List>
              <ListItem>ProjectName</ListItem>
              <ListItem>Start Time</ListItem>
              <ListItem>Start Time</ListItem>
              <ListItem>Overtime</ListItem>
            </List>
          </Grid>
          <Grid item xs={4}>
            <CircularProgress variant="determinate" value={75} />
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

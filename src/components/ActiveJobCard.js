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
import withContext from "../withContext";

function ActiveJobCard(props) {
  const fb = { ...props.value };
  const activeJob = { ...props.activeJob };
  if (activeJob) {
    return (
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardHeader
            title={
              <Stack>
                <Typography variant="h4">
                  {activeJob && activeJob.name}
                </Typography>
                <Typography>
                  {activeJob.startTime && fb.strfDate(activeJob.startTime)}
                </Typography>
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
                <ListItem>project name</ListItem>
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
  } else {
    return null;
  }
}

export default withContext(ActiveJobCard);

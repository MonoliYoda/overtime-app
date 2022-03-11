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
import { strfDate, strfTime, strfRuntime } from "../util/utils";

function ActiveJobCard(props) {
  const fb = { ...props.value };
  const activeJob = props.activeJob;
  if (activeJob) {
    return (
      <Card elevation={4}>
        <CardHeader
          title={
            <Stack>
              <Typography variant="h4">
                {activeJob && activeJob.name}
              </Typography>
              <Typography>{strfDate(activeJob.startTime)}</Typography>
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
              <ListItem>{activeJob.project && activeJob.project.name}</ListItem>
              <ListItem>{strfTime(activeJob.startTime)}</ListItem>
              <ListItem>Start Time</ListItem>
              <ListItem>Overtime</ListItem>
            </List>
          </Grid>
          <Grid item xs={4}>
            <CircularProgress variant="determinate" value={75} />
          </Grid>
        </Grid>
      </Card>
    );
  } else {
    return null;
  }
}

export default withContext(ActiveJobCard);

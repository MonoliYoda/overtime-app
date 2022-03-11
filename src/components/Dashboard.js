import { MoreHoriz } from "@mui/icons-material";
import {
  AppBar,
  Card,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../withContext";
import NewJobMenu from "./NewJobMenu";

function Dashboard(props) {
  const navigate = useNavigate();
  const [jobList, setJobList] = useState();
  const [userInfo, setUserInfo] = useState();
  const [activeJob, setActiveJob] = useState();

  const fb = { ...props.value };

  useEffect(async () => {
    if (!fb.currentUser) {
      console.log("Not logged in, redirecting.");
      navigate("/login");
    }
    setUserInfo(await fb.getUserData());
    // getUserJobs(currentUser.uid);
    const jobs = await fb.getUserJobs();
    setJobList(jobs);

    const openJobs = await fb.getOpenJob();
    setActiveJob(openJobs[0]);
  }, []);

  function strfDate(timestamp) {
    const date = new Date(timestamp.toDate());
    return date.toLocaleDateString();
  }

  function strfTime(timestamp) {
    try {
      const date = new Date(timestamp.toDate());
      return date.toLocaleTimeString();
    } catch (e) {
      return "-";
    }
  }

  function strfRuntime(start, end) {
    try {
      const t1 = new Date(start.toDate());
      const t2 = new Date(end.toDate());
      const diff = (t2 - t1) / 1000;
      var hrs = Math.floor(diff / (60 * 60));
      var leftSec = diff - hrs * 60 * 60;
      var mins = Math.floor(leftSec / 60);
      if (mins < 10) {
        mins = "0" + mins;
      }
      return `Worktime: ${hrs}:${mins}`;
    } catch (e) {
      return "-";
    }
  }

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ margin: "2rem 0", height: "calc(100vh - 150px)" }}
      >
        <Grid item xs={12}>
          <Card variant="outlined">
            <CardHeader
              title={
                <Typography variant="h4">
                  {activeJob && activeJob.name}
                </Typography>
              }
              action={
                <IconButton>
                  <MoreHoriz />
                </IconButton>
              }
            ></CardHeader>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title={
                userInfo && (
                  <Typography variant="h4">{userInfo.name}</Typography>
                )
              }
            ></CardHeader>
            <List>
              {jobList &&
                jobList.map((job) => {
                  return (
                    <ListItem key={job.id}>
                      <ListItemText
                        primary={`${job.name}`}
                        secondary={`${strfTime(job.startTime)} - ${strfTime(
                          job.endTime
                        )}`}
                      ></ListItemText>
                      <ListItemText
                        sx={{ textAlign: "right" }}
                        primary={strfDate(job.startTime)}
                        secondary={strfRuntime(job.startTime, job.endTime)}
                        edge="end"
                      ></ListItemText>
                    </ListItem>
                  );
                })}
            </List>
          </Card>
        </Grid>
      </Grid>
      <NewJobMenu></NewJobMenu>
    </>
  );
}

export default withContext(Dashboard);

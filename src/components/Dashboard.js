import { MoreHoriz } from "@mui/icons-material";
import {
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../withContext";
import ActiveJobCard from "./ActiveJobCard";

import RecentJobs from "./RecentJobs";

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

    const openJobs = await fb.getOpenJobs();
    setActiveJob(openJobs[0]);
  }, []);

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ margin: "2rem 0", height: "calc(100vh - 150px)" }}
      >
        <Grid item xs={12}>
          <ActiveJobCard activeJob={activeJob} />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center">
            <Button variant="contained">STOP</Button>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <RecentJobs />
        </Grid>
      </Grid>
    </>
  );
}

export default withContext(Dashboard);

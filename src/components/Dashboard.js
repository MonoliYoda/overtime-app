import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../withContext";
import ActiveJobCard from "./ActiveJobCard";

import RecentJobs from "./RecentJobs";

function Dashboard(props) {
  const fb = { ...props.value };
  const navigate = useNavigate();
  const [activeJob, setActiveJob] = useState();

  useEffect(() => {
    if (!fb.currentUser) {
      console.log("Not logged in, redirecting.");
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const openJobs = fb.openJobs();
    setActiveJob(openJobs[0]);
  }, [fb.userJobs]);
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

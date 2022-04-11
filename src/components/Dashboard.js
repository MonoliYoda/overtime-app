import { Grid } from "@mui/material";
import { el } from "date-fns/locale";
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
    } else {
      fb.fetchUserJobs();
      fb.fetchUserOvtSchemes();
    }
  }, []);

  useEffect(() => {
    const openJobs = fb.openJobs();
    setActiveJob(openJobs[0]);
  }, [fb.userJobs]);

  useEffect(() => {
    const interval = setInterval(() => {
      fb.fetchUserJobs();
    }, 20000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Grid
      container
      rowSpacing={2}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ margin: "2rem 0" }}
    >
      <Grid item xs={12}>
        <ActiveJobCard activeJob={activeJob} />
      </Grid>
      <Grid item xs={12}>
        <RecentJobs />
      </Grid>
    </Grid>
  );
}

export default withContext(Dashboard);

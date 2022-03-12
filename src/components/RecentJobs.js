import { Card, CardHeader, List, ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { strfDate, strfTime, strfRuntime } from "../util/utils";
import withContext from "../withContext";

function RecentJobs(props) {
  const fb = { ...props.value };
  const [jobList, setJobList] = useState();

  useEffect(() => {
    setJobList(fb.completedJobs());
  }, [fb.userJobs]);

  return (
    <Card elevation={4}>
      <CardHeader title="Recents"></CardHeader>
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
  );
}

export default withContext(RecentJobs);

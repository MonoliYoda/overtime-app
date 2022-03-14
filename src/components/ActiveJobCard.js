import { MoreVert } from "@mui/icons-material";
import StartIcon from "@mui/icons-material/Start";
import FolderIcon from "@mui/icons-material/Folder";
import ShortTextIcon from "@mui/icons-material/ShortText";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import withContext from "../withContext";
import { strfRuntime } from "../util/utils";

function ActiveJobCard(props) {
  const fb = { ...props.value };
  const activeJob = props.activeJob;
  const [percentElapsed, setPercentElapsed] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState("");
  const [timeLeft, setTimeLeft] = useState("");

  function secondsElapsed(startTime) {
    const endTime = new Date();
    const diff = Math.floor((endTime - startTime) / 1000);
    return diff;
  }

  function finishJob() {
    fb.updateJob({ ...activeJob, endTime: new Date() });
  }

  useEffect(() => {
    let timer = setInterval(() => {
      if (!activeJob) {
        return () => {};
      }
      const secondsEl = secondsElapsed(activeJob.startTime);
      const secondsTotal = activeJob.ovtScheme.stdHours * 60 * 60;
      let pct = (secondsEl / secondsTotal) * 100;
      if (pct > 100) pct = 100;
      setPercentElapsed(pct);

      const jobStartTime = new Date(activeJob.startTime);
      setTimeElapsed(strfRuntime(jobStartTime, new Date()));
      const jobEndTime = new Date(
        jobStartTime.setHours(
          jobStartTime.getHours() + activeJob.ovtScheme.stdHours
        )
      );
      setTimeLeft(strfRuntime(new Date(), jobEndTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [activeJob]);

  if (activeJob) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Card
            elevation={4}
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardHeader
              title="Dzisiaj"
              subheader={activeJob.startTime.toLocaleDateString()}
              action={
                <IconButton>
                  <MoreVert />
                </IconButton>
              }
            ></CardHeader>
            <CardContent sx={{ flexGrow: 1 }}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <ShortTextIcon />
                  </ListItemIcon>
                  <ListItemText>{activeJob.name}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <StartIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {activeJob.startTime.toLocaleTimeString()}
                  </ListItemText>
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemIcon>
                    <FolderIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {activeJob.project ? activeJob.project.name : "-"}
                  </ListItemText>
                </ListItem>
              </List>
            </CardContent>
            <CardActions>
              <Button onClick={finishJob}>Zakończ</Button>
              <Button>Edycja</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2}>
            <Card elevation={4}>
              <CardHeader
                subheader="Czas pracy"
                sx={{ paddingBottom: "0" }}
              ></CardHeader>
              <CardContent>
                <Stack alignItems="center" spacing={1}>
                  <CircularProgress
                    variant="determinate"
                    value={percentElapsed}
                    size={60}
                    thickness={8}
                  />
                  <Typography>{timeElapsed}</Typography>
                </Stack>
              </CardContent>
            </Card>
            <Card elevation={4}>
              <CardHeader
                subheader="Nadgodziny"
                sx={{ paddingBottom: "0" }}
              ></CardHeader>
              <CardContent>
                <Stack alignItems="center" spacing={1}>
                  <CircularProgress
                    variant="determinate"
                    value={60}
                    size={60}
                    thickness={8}
                    color="warning"
                  />
                  <Typography>{timeLeft}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
}

export default withContext(ActiveJobCard);

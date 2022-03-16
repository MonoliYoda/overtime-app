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
import { minutesToTimeString } from "../util/utils";
import { strfRuntime } from "../util/utils";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";

function ActiveJobCard(props) {
  const fb = { ...props.value };
  const navigate = useNavigate();
  const activeJob = props.activeJob;
  const [percentElapsed, setPercentElapsed] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState("--:--");
  const [timeLeft, setTimeLeft] = useState("");

  function secondsElapsed(startTime) {
    const endTime = new Date();
    const diff = Math.floor((endTime - startTime) / 1000);
    return diff;
  }

  function finishJob() {
    fb.updateJob({ ...activeJob, endTime: new Date() });
  }

  function startNewJob() {
    fb.addNewJob({
      name: "",
      project: null,
      client: null,
      startTime: new Date(),
      endTime: null,
      personalRate: 0,
      equipmentRate: 0,
      ovtScheme: null,
      notes: "",
    });
  }

  function updateCycle() {
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
  }

  function getOvertimePercentage() {
    if (!activeJob) {
      return 0;
    }
    let runtimeMinutes = Math.floor(
      (new Date() - activeJob.startTime) / 1000 / 60
    );
    let ovtMinutes = runtimeMinutes - activeJob.ovtScheme.stdHours * 60;
    if (ovtMinutes < 0) return 0;
    return ((ovtMinutes % 60) / 60) * 100;
  }

  function getFormattedOvertime(job) {
    if (!job) return "--:--";
    const endTime = job.endTime || new Date();
    let runtimeMinutes = Math.floor((endTime - job.startTime) / 1000 / 60);
    let ovtMinutes = runtimeMinutes - job.ovtScheme.stdHours * 60;
    if (ovtMinutes < 0) return "00:00";
    return minutesToTimeString(ovtMinutes);
  }

  useEffect(() => {
    setPercentElapsed(1);
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      updateCycle();
    }, 1000);
    return () => clearInterval(timer);
  }, [activeJob]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={8}>
        <Card
          elevation={4}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <CardHeader
            title="Dzisiaj"
            subheader={new Date().toLocaleDateString()}
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
                <ListItemText>{activeJob ? activeJob.name : "-"}</ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <StartIcon />
                </ListItemIcon>
                <ListItemText>
                  {activeJob
                    ? activeJob.startTime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "-"}
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText>
                  {activeJob && activeJob.project
                    ? activeJob.project.name
                    : "-"}
                </ListItemText>
              </ListItem>
            </List>
          </CardContent>
          <CardActions>
            {activeJob ? (
              <Button onClick={finishJob}>Zakończ</Button>
            ) : (
              <Button onClick={startNewJob}>Rozpocznij</Button>
            )}
            {activeJob && (
              <Button onClick={(e) => navigate(`/edit/${activeJob.id}`)}>
                Edytuj
              </Button>
            )}
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
                <Box sx={{ position: "relative" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={60}
                    thickness={8}
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      right: 0,
                      color: "text.disabled",
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={percentElapsed}
                    size={60}
                    thickness={8}
                    sx={{ position: "relative", zIndex: 2 }}
                  />
                </Box>
                <Typography>{activeJob ? timeElapsed : "--:--"}</Typography>
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
                <Box sx={{ position: "relative" }}>
                  <CircularProgress
                    variant="determinate"
                    value={100}
                    size={60}
                    thickness={8}
                    sx={{
                      position: "absolute",
                      zIndex: 1,
                      right: 0,
                      color: "text.disabled",
                    }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={getOvertimePercentage()}
                    size={60}
                    thickness={8}
                    color="warning"
                    sx={{ position: "relative", zIndex: 2 }}
                  />
                </Box>
                <Typography>{getFormattedOvertime(activeJob)}</Typography>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default withContext(ActiveJobCard);

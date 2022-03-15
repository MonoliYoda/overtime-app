import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../withContext";
import { minutesToTimeString } from "../util/utils";
import {
  Business,
  ExpandMore,
  Folder,
  Functions,
  MoreTime,
  Note,
  Person,
  PlayArrow,
  PointOfSale,
  PrecisionManufacturing,
  Stop,
  Timer,
} from "@mui/icons-material";

function History(props) {
  const fb = { ...props.value };
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function handleDeleteRequest(id) {
    setJobIdToDelete(id);
    setDeleteConfirmOpen(true);
  }

  function handleDeleteConfirm() {
    fb.deleteJob(jobIdToDelete);
    setDeleteConfirmOpen(false);
    setJobIdToDelete(null);
    fb.fetchUserJobs();
  }

  function getFormattedOvertime(job) {
    const endTime = job.endTime || new Date();
    let runtimeMinutes = Math.floor((endTime - job.startTime) / 1000 / 60);
    let ovtMinutes = runtimeMinutes - job.ovtScheme.stdHours * 60;
    if (ovtMinutes < 0) return "00:00";
    return minutesToTimeString(ovtMinutes);
  }

  function getFormattedWorktime(job) {
    const endTime = job.endTime || new Date();
    let runtimeMinutes = Math.floor((endTime - job.startTime) / 1000 / 60);
    return minutesToTimeString(runtimeMinutes);
  }

  useEffect(() => {
    if (!fb.currentUser) {
      console.log("Not logged in, redirecting.");
      navigate("/login");
    }
    fb.fetchUserJobs();
  }, []);

  return (
    <Grid
      container
      rowSpacing={1}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      sx={{ margin: "2rem 0" }}
    >
      <Grid item xs={12}>
        {fb.userJobs.map((job) => {
          return (
            <Accordion
              key={job.id}
              expanded={expanded === job.id}
              onChange={handleChange(job.id)}
              elevation={4}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                  {job.name}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {job.startTime.toLocaleDateString()}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack
                  direction="row"
                  flexWrap="wrap"
                  divider={<Divider orientation="vertical" flexItem />}
                >
                  <List>
                    <ListItem>
                      <ListItemText>Szczegóły</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <Folder />
                      </ListItemIcon>
                      <ListItemText>
                        {job.project && job.project.name}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Business />
                      </ListItemIcon>
                      <ListItemText>
                        {job.client && job.client.name}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Note />
                      </ListItemIcon>
                      <ListItemText>{job.notes}</ListItemText>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText>Czas</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <PlayArrow />
                      </ListItemIcon>
                      <ListItemText>
                        {job.startTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Stop />
                      </ListItemIcon>
                      <ListItemText>
                        {job.endTime
                          ? job.endTime.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "--:--"}
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Timer />
                      </ListItemIcon>
                      <ListItemText>{getFormattedWorktime(job)}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <MoreTime />
                      </ListItemIcon>
                      <ListItemText>{getFormattedOvertime(job)}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText></ListItemText>
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>
                      <ListItemText>Finanse</ListItemText>
                    </ListItem>
                    <Divider />

                    <ListItem>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText>{job.personalRate}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PrecisionManufacturing />
                      </ListItemIcon>
                      <ListItemText>{job.equipmentRate}</ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Functions />
                      </ListItemIcon>
                      <ListItemText>{job.ovtScheme.name}</ListItemText>
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <PointOfSale />
                      </ListItemIcon>

                      <ListItemText>1900</ListItemText>
                    </ListItem>
                  </List>
                </Stack>
              </AccordionDetails>
              <AccordionActions>
                <Button onClick={(e) => navigate(`/edit/${job.id}`)}>
                  Edytuj
                </Button>
                <Button
                  onClick={() => handleDeleteRequest(job.id)}
                  variant="outlined"
                  color="error"
                >
                  Usuń
                </Button>
              </AccordionActions>
            </Accordion>
          );
        })}

        <Dialog open={deleteConfirmOpen}>
          <DialogContent>
            <DialogContentText>Czy napewno usunąć?</DialogContentText>
            <DialogActions>
              <Button onClick={() => setDeleteConfirmOpen(false)} autoFocus>
                Nie
              </Button>
              <Button onClick={handleDeleteConfirm} color="error">
                Usuń
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Grid>
    </Grid>
  );
}

export default withContext(History);

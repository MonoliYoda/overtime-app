import React, { useEffect, useState } from "react";
import withContext from "../withContext";
import {
  ExpandMore,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { minutesToTimeString, getOvertimePay } from "../util/utils";
import { Element } from "react-scroll";

function AccordionJob(props) {
  const job = { ...props.job };
  const expanded = props.expandedID;
  const handleChange = props.handleChange;
  const handleDeleteRequest = props.handleDelete;
  const navigate = useNavigate();

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

  function getRuntime() {
    const endTime = job.endTime || new Date();
    let runtimeMinutes = Math.floor((endTime - job.startTime) / 1000 / 60);
    let hours = Math.floor(runtimeMinutes / 60) - job.ovtScheme.stdHours;
    if (runtimeMinutes % 60 > 15) {
      hours += 1;
    }
    return hours;
  }

  function getTotalPay() {
    const runtime = getRuntime()
    const overtimePay = getOvertimePay(
      job.personalRate,
      job.ovtScheme.scheme,
      runtime
    );
    return job.personalRate + job.equipmentRate + overtimePay;
  }

  return (
  <Element name={job.id}>
    <Accordion
      key={job.id}
      expanded={expanded === job.id}
      onChange={handleChange(job.id)}
      elevation={4}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography sx={{ width: "33%", flexShrink: 0 }}>{job.name}</Typography>
        <Typography sx={{ color: "text.secondary" }}>
          {job.startTime.toLocaleDateString()}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container rowSpacing={2}>
          <Grid item xs={6}>
          <List dense>
            <ListItem>
              <ListItemText>Szczegóły</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText style={{margin: 0}} primary="Projekt" secondary={job.project ? job.project.name : "---"}></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText style={{margin: 0}} primary="Klient" secondary={job.client ? job.client.name : "---"}></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText style={{margin: 0}} primary="Notatka" secondary={job.notes ? job.notes : "---"}></ListItemText>
            </ListItem>
          </List>
          </Grid>
          <Grid item xs={6}>

          <List dense>
            <ListItem>
              <ListItemText>Czas</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText style={{margin: 0}} primary="Start" secondary=
                {job.startTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText style={{margin: 0}} primary="Koniec" secondary=
                {job.endTime
                  ? job.endTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "--:--"}>
              </ListItemText>
            </ListItem>
            <ListItem >
              <ListItemText style={{margin: 0}} primary="Czas pracy" secondary={getFormattedWorktime(job)}></ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText style={{margin: 0}} primary="Nadgodziny" secondary={getFormattedOvertime(job)}></ListItemText>
            </ListItem>
          </List>
          </Grid>
          <Grid item xs={12}>

          <List dense>
            <ListItem>
              <ListItemText>Finanse</ListItemText>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Dniówka"></ListItemText>
              <ListItemSecondaryAction>
                {job.personalRate}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Sprzęt"></ListItemText>
              <ListItemSecondaryAction>
                {job.equipmentRate}
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem>
              <ListItemText primary="Nadgodziny" secondary={job.ovtScheme.name}></ListItemText>
              <ListItemSecondaryAction>
                {getOvertimePay(
                  job.personalRate,
                  job.ovtScheme.scheme,
                  getRuntime()
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem style={{marginTop: "1rem"}}>
              <ListItemText primary=" "></ListItemText>
              <ListItemSecondaryAction>{getTotalPay()}</ListItemSecondaryAction>
            </ListItem>
          </List>
          </Grid>
          </Grid>

      </AccordionDetails>
      <AccordionActions>
        <Button onClick={(e) => navigate(`/edit/${job.id}`)}>Edytuj</Button>
        <Button
          onClick={() => handleDeleteRequest(job.id)}
          variant="outlined"
          color="error"
        >
          Usuń
        </Button>
      </AccordionActions>
    </Accordion>
    </Element>
  );
}

export default withContext(AccordionJob);

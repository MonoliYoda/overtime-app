import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../withContext";
import { minutesToTimeString } from "../util/utils";
import { ExpandMore } from "@mui/icons-material";

function History(props) {
  const fb = { ...props.value };
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    <Card>
      {fb.userJobs.map((job) => {
        return (
          <Accordion
            key={job.id}
            expanded={expanded === job.id}
            onChange={handleChange(job.id)}
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
                justifyContent="space-between"
                alignItems="center"
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Box>
                  <Typography>Start</Typography>
                  <Typography>
                    {job.startTime.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
                <Box>
                  <Typography>
                    {`Czas pracy: ${getFormattedWorktime(job)}`}
                  </Typography>
                  <Typography>
                    {`Nadgodziny: ${getFormattedOvertime(job)}`}
                  </Typography>
                </Box>
                <Box>
                  <Typography>Koniec</Typography>
                  <Typography>
                    {job.endTime
                      ? job.endTime.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "--:--"}
                  </Typography>
                </Box>
              </Stack>
            </AccordionDetails>
            <AccordionActions>
              <Button>Edytuj</Button>
            </AccordionActions>
          </Accordion>
        );
      })}
    </Card>
  );
}

export default withContext(History);

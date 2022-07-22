import {
  Box,
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import React, { useState } from "react";
import withContext from "../withContext";
import AccordionJob from "./AccordionJob";
import { scroller } from 'react-scroll'

function RecentJobs(props) {
  const fb = { ...props.value };
  const [expanded, setExpanded] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (isExpanded) {
      scroller.scrollTo(panel, {duration: 300, smooth: true})
      setTimeout(() => {
        scroller.scrollTo(panel, {duration: 300, smooth: true})
      }, 400)
    }
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

  return (
    <>
      <Card elevation={4} sx={{padding: "0 0.5rem"}}>
        <CardHeader title="Ostatnie"></CardHeader>
      {fb.completedJobs() &&
          fb
          .completedJobs()
          .slice(0, 5)
          .map((job) => (
            <AccordionJob
            key={job.id}
            job={job}
            handleChange={handleChange}
            expandedID={expanded}
            handleDelete={handleDeleteRequest}
            />
            ))}
      </Card>
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
    </>
  );
}

export default withContext(RecentJobs);

import {
  Button,
  Card,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { strfRuntime } from "../util/utils";
import withContext from "../withContext";
import AccordionJob from "./AccordionJob";

function RecentJobs(props) {
  const fb = { ...props.value };
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

  return (
    <>
      <Card elevation={4}>
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

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../withContext";
import AccordionJob from "./AccordionJob";

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

  useEffect(() => {
    if (!fb.currentUser) {
      console.log("Not logged in, redirecting.");
      navigate("/login");
    }
    fb.fetchUserJobs();
  }, []);

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ margin: "2rem 0" }}
      >
        <Grid item xs={12}>
          {fb.userJobs.map((job) => (
            <AccordionJob
              key={job.id}
              job={job}
              handleChange={handleChange}
              expandedID={expanded}
              handleDelete={handleDeleteRequest}
            />
          ))}
        </Grid>
      </Grid>
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

export default withContext(History);

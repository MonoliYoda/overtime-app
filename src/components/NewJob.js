import {
  Autocomplete,
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  createFilterOptions,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import withContext from "../withContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTimePicker } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

function NewJob(props) {
  const fb = { ...props.value };
  const [name, setName] = useState("");
  const [project, setProject] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState(null);
  const [ovtScheme, setOvtScheme] = useState(10);
  // const [client, setClient] = useState("");
  const [personalRate, setPersonalRate] = useState(0);
  const [equipmentRate, setEquipmentRate] = useState(0);
  const [stdWorkHours, setStdWorkHours] = useState(11);
  const [notes, setNotes] = useState("");

  const clients = ["one", "two"];
  const navigate = useNavigate();
  const filter = createFilterOptions();

  useEffect(() => {
    setUserProjects(fb.userProjects);
  }, [fb.userProjects]);

  useEffect(() => {
    async function fetchProjects() {
      fb.fetchUserProjects();
    }
    function setDateToNow() {
      setStartTime(new Date());
    }
    fetchProjects();
    setDateToNow();
  }, []);

  function handleSubmit() {
    fb.addNewJob({
      name,
      project,
      client: null,
      startTime: Timestamp.fromDate(new Date(startTime)),
      endTime: endTime ? Timestamp.fromDate(new Date(endTime)) : null,
      personalRate,
      equipmentRate,
      stdWorkHours,
      notes,
    });
    navigate("/");
  }

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Card sx={{ maxWidth: "32rem" }}>
        <CardHeader title="New Job" />
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  sx={{ width: "50%" }}
                />
                <Autocomplete
                  value={project}
                  onChange={(e, newValue) => {
                    if (typeof newValue === "string") {
                      setProject({
                        name: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      const newProject = {
                        name: newValue.inputValue,
                      };
                      setProject(newProject);
                      fb.addNewProject(newProject);
                    } else {
                      setProject(newValue);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.name
                    );
                    if (inputValue !== "" && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="free-solo-with-text-demo"
                  options={userProjects}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === "string") {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }
                    // Regular option
                    return option.name;
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                  sx={{ width: "50%", display: "inline-block" }}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} label="Project" variant="standard" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  options={clients}
                  renderInput={(params) => (
                    <TextField {...params} label="Client" variant="standard" />
                  )}
                />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={12}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Start Time"
                    value={startTime}
                    onChange={(newValue) => {
                      setStartTime(newValue);
                    }}
                  />
                  <DateTimePicker
                    clearable={true}
                    defaultValue={null}
                    renderInput={(props) => <TextField {...props} />}
                    label="End Time (leave blank if ongoing)"
                    value={endTime}
                    onChange={(newValue) => {
                      setEndTime(newValue);
                    }}
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Personal rate"
                  type="number"
                  value={personalRate}
                  onChange={(e) => setPersonalRate(e.target.value)}
                />
                <TextField
                  variant="standard"
                  label="Equipment rate"
                  type="number"
                  value={equipmentRate}
                  onChange={(e) => setEquipmentRate(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  freeSolo
                  options={clients}
                  renderInput={(params) => (
                    <TextField {...params} label="Client" variant="standard" />
                  )}
                  sx={{ width: "50%", display: "inline-block" }}
                />
                <TextField
                  variant="standard"
                  label="Standard work hours"
                  type="number"
                  value={stdWorkHours}
                  onChange={(e) => setStdWorkHours(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="standard"
                  label="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                  OK
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Backdrop>
  );
}

export default withContext(NewJob);

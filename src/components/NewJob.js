import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  createFilterOptions,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import withContext from "../withContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTimePicker } from "@mui/lab";
import { useNavigate, useParams } from "react-router-dom";

function NewJob(props) {
  const fb = { ...props.value };
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [project, setProject] = useState(null);
  const [client, setClient] = useState(null);
  const [userProjects, setUserProjects] = useState([]);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState(null);
  const [ovtScheme, setOvtScheme] = useState(null);
  const [personalRate, setPersonalRate] = useState(0);
  const [equipmentRate, setEquipmentRate] = useState(0);
  const [notes, setNotes] = useState("");
  const [edting, setEdting] = useState(false);
  // Error states for form validation
  const [personalRateError, setPersonalRateError] = useState(false)
  const [equipmentRateError, setEquipmentRateError] = useState(false)
  const [endTimeError, setEndTimeError] = useState(false)
  const [submitButtonEnable, setSubmitButtonEnable] = useState(true)

  const navigate = useNavigate();
  const filter = createFilterOptions();

  let { jobId } = useParams();

  const textFieldStyle = {width: "100%", paddingRight: "1rem"}

  // Keep local project list in sync with FB
  useEffect(() => {
    setUserProjects(fb.userProjects);
  }, [fb.userProjects]);

  useEffect(() => {
    async function fetchProjects() {
      fb.fetchUserProjects();
    }
    async function fetchClients() {
      fb.fetchUserClients();
    }
    async function fetchOvtSchemes() {
      fb.fetchUserOvtSchemes();
    }
    function setDateToNow() {
      setStartTime(new Date());
    }
    fetchProjects();
    fetchClients();
    fetchOvtSchemes();
    setDateToNow();
    if (jobId) {
      setEdting(true);
      const editingJob = fb.userJobs.filter((job) => job.id === jobId)[0];
      if (editingJob) {
        setId(jobId);
        setName(editingJob.name);
        setProject(editingJob.project);
        setClient(editingJob.client);
        setStartTime(editingJob.startTime);
        setEndTime(editingJob.endTime);
        setPersonalRate(editingJob.personalRate);
        setEquipmentRate(editingJob.equipmentRate);
        setOvtScheme(editingJob.ovtScheme);
        setNotes(editingJob.notes);
      }
    } else {
      setEdting(false);
    }
  }, []);

  // Disable submit button if any fields are errored
  useEffect(() => {
    if (!personalRateError && !equipmentRateError && !endTimeError) {
      setSubmitButtonEnable(true)
    } else {
      setSubmitButtonEnable(false)
    }
  }, [personalRateError, equipmentRateError, endTimeError])
  
  // Make sure all datetimes have seconds set to zero
  function createTimeZeroSeconds(timeString) {
    let time = new Date(timeString);
    time.setSeconds(0);
    return time
  }

  function handleSubmit() {
    if (edting) {
      fb.updateJob({
        id,
        name,
        project,
        client,
        startTime: createTimeZeroSeconds(startTime),
        endTime: endTime ? createTimeZeroSeconds(endTime) : null,
        personalRate,
        equipmentRate,
        ovtScheme,
        notes,
      });
    } else {
      fb.addNewJob({
        name,
        project,
        client,
        startTime: createTimeZeroSeconds(startTime),
        endTime: endTime ? createTimeZeroSeconds(endTime) : null,
        personalRate,
        equipmentRate,
        ovtScheme,
        notes,
      });
    }
    navigate("/");
  }

  function handlePersonalRateChange(e) {
    const inputValue = parseInt(e.target.value)
    if (inputValue) {
      setPersonalRate(inputValue)
      if (validateRate(inputValue)) {
        setPersonalRateError(false)
      } else {
        setPersonalRateError(true)
      }
    } else {
      setPersonalRate("")
      setPersonalRateError(false)
    }
  }

  function handleEquipmentRateChange(e) {
    const inputValue = parseInt(e.target.value)
    if (inputValue) {
      setEquipmentRate(inputValue)
      if (validateRate(inputValue)) {
        setEquipmentRateError(false)
      } else {
        setEquipmentRateError(true)
      }
    } else {
      setEquipmentRate("")
      setEquipmentRateError(false)
    }
  }

  function handleStartTimeChange(val) {
    setStartTime(val)
  }

  function handleEndTimeChange(val) {
    setEndTime(val)
    if (createTimeZeroSeconds(startTime) < createTimeZeroSeconds(endTime)) {
      setEndTimeError(false)
    } else {
      setEndTimeError(true)
    }
  }

  function getOptLbl(option) {
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
  }

  function filerOpts(options, params) {
    const filtered = filter(options, params);

    const { inputValue } = params;
    // Suggest the creation of a new value
    const isExisting = options.some((option) => inputValue === option.name);
    if (inputValue !== "" && !isExisting) {
      filtered.push({
        inputValue,
        name: `Add "${inputValue}"`,
      });
    }

    return filtered;
  }

  function validateRate(rate) {
    return rate < 0 ? false : true
  }

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Card sx={{ maxWidth: "32rem" }}>
        <CardHeader title={jobId ? "Edit Job" : "New Job"} />
        <CardContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
          >
            <Grid container rowSpacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={textFieldStyle}
                />
              </Grid>
              <Grid item xs={6}>
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
                  filterOptions={filerOpts}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="project-select"
                  options={userProjects}
                  getOptionLabel={getOptLbl}
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} style={textFieldStyle} label="Project" variant="standard" />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  value={client}
                  onChange={(e, newValue) => {
                    if (typeof newValue === "string") {
                      setClient({
                        name: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      const newClient = {
                        name: newValue.inputValue,
                      };
                      setClient(newClient);
                      fb.addNewClient(newClient);
                    } else {
                      setClient(newValue);
                    }
                  }}
                  filterOptions={filerOpts}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="client-select"
                  options={fb.userClients}
                  getOptionLabel={getOptLbl}
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                  freeSolo
                  renderInput={(params) => (
                    <TextField {...params} style={textFieldStyle} label="Client" variant="standard" />
                  )}
                />
              </Grid>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid item xs={6}>
                  <DateTimePicker
                    renderInput={(props) => <TextField {...props} style={textFieldStyle} />}
                    label="Start Time"
                    value={startTime}
                    onChange={handleStartTimeChange}
                  />
                </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  label="Personal rate"
                  type="number"
                  value={personalRate}
                  onChange={handlePersonalRateChange}
                  style={textFieldStyle}
                  error={personalRateError}
                />
              </Grid>
                <Grid item xs={6}>
                  <DateTimePicker
                    clearable={true}
                    defaultValue={null}
                    renderInput={(props) => <TextField {...props} style={textFieldStyle} error={endTimeError} />}
                    label="End Time (blank if ongoing)"
                    value={endTime}
                    onChange={handleEndTimeChange}
                    
                  />
                </Grid>
              </LocalizationProvider>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  label="Equipment rate"
                  type="number"
                  value={equipmentRate}
                  onChange={handleEquipmentRateChange}
                  style={textFieldStyle}
                  error={equipmentRateError}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  value={ovtScheme}
                  onChange={(e, newValue) => {
                    if (typeof newValue === "string") {
                      setOvtScheme({
                        name: newValue,
                      });
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      const newScheme = {
                        name: newValue.inputValue,
                      };
                      setOvtScheme(newScheme);
                      fb.addNewOvtScheme(newScheme);
                    } else {
                      setOvtScheme(newValue);
                    }
                  }}
                  filterOptions={filerOpts}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="ovt-scheme-select"
                  options={fb.userOvtSchemes}
                  getOptionLabel={getOptLbl}
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Overtime scheme"
                      variant="standard"
                      style={textFieldStyle}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="standard"
                  label="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  style={textFieldStyle}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Button variant="outlined" onClick={() => navigate("/")}>
                  Cancel
                </Button>
                <Button variant="contained" disabled={!submitButtonEnable} onClick={handleSubmit}>
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

import {
  Autocomplete,
  Backdrop,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import withContext from "../withContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DateTimePicker } from "@mui/lab";
import { useNavigate } from "react-router-dom";

function NewJob() {
  const [project, setProject] = useState(10);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState(null);
  const [ovtScheme, setOvtScheme] = useState(10);
  const [client, setClient] = useState("");

  const clients = ["one", "two"];

  const navigate = useNavigate();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <Card sx={{ maxWidth: "35rem" }}>
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
                <TextField variant="standard" label="Name" />
                <FormControl sx={{ width: "45%" }}>
                  <InputLabel id="project-select-label">Project</InputLabel>
                  <Select
                    labelId="project-select-label"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                  </Select>
                </FormControl>
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
                />
                <TextField
                  variant="standard"
                  label="Equipment rate"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="standard" sx={{ width: "45%" }}>
                  <InputLabel id="scheme-select-label">
                    Overtime scheme
                  </InputLabel>
                  <Select
                    labelId="scheme-select-label"
                    value={ovtScheme}
                    onChange={(e) => setOvtScheme(e.target.value)}
                  >
                    <MenuItem value={10}>Commercial</MenuItem>
                    <MenuItem value={20}>Film</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="standard"
                  label="Standard work hours"
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField variant="standard" label="Notes" />
              </Grid>
              <Button variant="contained" onClick={() => navigate("/")}>
                OK
              </Button>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Backdrop>
  );
}

export default withContext(NewJob);

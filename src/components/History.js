import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../withContext";
import { minutesToTimeString } from "../util/utils";

function History(props) {
  const fb = { ...props.value };
  const navigate = useNavigate();
  const [localUserJobs, setLocalUserJobs] = useState([]);
  const [processedRows, setProcessedRows] = useState([]);

  const cols = [
    {
      field: "startTime",
      headerName: "Data",
      valueFormatter: (params) => {
        return params.value.toLocaleDateString();
      },
    },
    {
      field: "overtimeMinutes",
      headerName: "Nadgodziny",
      valueFormatter: (params) => {
        return minutesToTimeString(params.value);
      },
    },
  ];

  useEffect(() => {
    if (!fb.currentUser) {
      console.log("Not logged in, redirecting.");
      navigate("/login");
    }
    fb.fetchUserJobs();
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      console.log("Setting localUserJobs to:", [...fb.userJobs]);
      setLocalUserJobs([...fb.userJobs]);
    }
    return () => {
      isMounted = false;
    };
  }, [fb.userJobs]);

  useEffect(() => {
    let isMounted = true;
    //console.log("first");
    let rows = [...localUserJobs];
    rows.map((row) => {
      if (!row.endTime) {
        row.endTime = new Date();
      }
      row.runtimeMinutes = (
        Math.floor((row.endTime - row.startTime) / 1000) / 60
      ).toFixed(4);
      let overtime = row.runtimeMinutes - row.ovtScheme.stdHours * 60;
      if (overtime > 0) {
        row.overtimeMinutes = overtime;
      } else {
        row.overtimeMinutes = 0;
      }
      return row;
    });
    if (isMounted) {
      console.log("Setting processedRows to:", rows);
      setProcessedRows(rows);
    }
    rows = [];
    return () => {
      isMounted = false;
    };
  }, [localUserJobs]);

  return (
    <Box sx={{ height: "calc(100vh - 150px)" }}>
      <DataGrid rows={processedRows} columns={cols}></DataGrid>
    </Box>
  );
}

export default withContext(History);

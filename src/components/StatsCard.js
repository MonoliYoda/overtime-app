import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";
import withContext from "../withContext";
import {
  getOvertimePay,
  getTotalPay,
  minutesToTimeString,
} from "../util/utils";

function StatsCard(props) {
  const fb = { ...props.value };
  const startDate = props.startDate;
  const endDate = props.endDate;
  const title = props.title;

  const [jobsThisWeek, setJobsThisWeek] = useState(0);
  const [totalWorkMinutes, setTotalWorkMinutes] = useState(0);
  const [totalOvtHours, setTotalOvtHours] = useState(0);
  const [overtimePay, setOvertimePay] = useState(0);
  const [totalPay, setTotalPay] = useState(0);

  useEffect(() => {
    const jobsThisWeek = fb.completedJobs().filter((job) => {
      return job.startTime >= startDate && job.startTime <= endDate;
    });
    setJobsThisWeek(jobsThisWeek.length);
    jobsThisWeek.forEach((job) => {
      let runtimeMinutes = Math.floor(
        (job.endTime - job.startTime) / 1000 / 60
      );
      setTotalWorkMinutes(totalWorkMinutes + runtimeMinutes);
      let ovtHours = Math.floor(runtimeMinutes / 60) - job.ovtScheme.stdHours;
      if (runtimeMinutes % 60 > 15) {
        ovtHours += 1;
      }
      setTotalOvtHours(totalOvtHours + ovtHours);
      setOvertimePay(
        overtimePay +
          getOvertimePay(job.personalRate, job.ovtScheme.scheme, ovtHours)
      );
      setTotalPay(totalPay + getTotalPay(job));
    });
  }, []);

  return (
    <Card>
      <CardHeader
        title={title}
        subheader={`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
      />
      <Divider />
      <CardContent>
        <Typography>Dni pracujących: {jobsThisWeek}</Typography>
        <Typography>
          Godziny przepracowane: {minutesToTimeString(totalWorkMinutes)}
        </Typography>
        <Typography>Nadgodziny: {totalOvtHours}</Typography>
        <Typography>
          Średnio godzin dziennie:{" "}
          {minutesToTimeString(totalWorkMinutes / jobsThisWeek)}
        </Typography>
        <Typography>Zarobki: {totalPay}</Typography>
        <Typography>W tym z nadgodzin: {overtimePay}</Typography>
      </CardContent>
    </Card>
  );
}

export default withContext(StatsCard);

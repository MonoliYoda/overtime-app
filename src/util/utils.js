export function strfRuntime(start, end) {
  try {
    const diff = (end - start) / 1000;
    var hrs = Math.floor(diff / (60 * 60));
    var leftSec = diff - hrs * 60 * 60;
    var mins = Math.floor(leftSec / 60);
    leftSec = Math.floor(leftSec - mins * 60);
    if (hrs < 10) {
      hrs = "0" + hrs;
    }
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (leftSec < 10) {
      leftSec = "0" + leftSec;
    }
    return `${hrs}:${mins}:${leftSec}`;
  } catch (e) {
    return "-";
  }
}

export function minutesToTimeString(totalMinutes) {
  let minutes = Math.floor(totalMinutes) % 60;
  let hours = (Math.floor(totalMinutes) - minutes) / 60;
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  return `${hours}:${minutes}`;
}

export function getOvertimePay(base, scheme = [15], hours) {
  let sum = 0;
  let schemeIdx = 0;
  for (let i = 0; i < hours; i++) {
    schemeIdx = i;
    if (schemeIdx >= scheme.length) {
      schemeIdx = scheme.length - 1;
    }
    sum = sum + base * (scheme[schemeIdx] / 100);
  }
  return sum;
}

export function getTotalPay(job) {
  const endTime = job.endTime || new Date();
  let runtimeMinutes = Math.floor((endTime - job.startTime) / 1000 / 60);
  let hours = Math.floor(runtimeMinutes / 60) - job.ovtScheme.stdHours;
  if (runtimeMinutes % 60 > 15) {
    hours += 1;
  }
  const overtimePay = getOvertimePay(
    job.personalRate,
    job.ovtScheme.scheme,
    hours
  );
  return job.personalRate + job.equipmentRate + overtimePay;
}

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

export function strfDate(timestamp) {
  try {
    const date = new Date(timestamp.toDate());
    return date.toLocaleDateString();
  } catch (e) {
    return "-";
  }
}
export function strfTime(timestamp) {
  try {
    const date = new Date(timestamp.toDate());
    return date.toLocaleTimeString();
  } catch (e) {
    return "-";
  }
}

export function strfRuntime(start, end) {
  try {
    const diff = (end - start) / 1000;
    var hrs = Math.floor(diff / (60 * 60));
    var leftSec = diff - hrs * 60 * 60;
    var mins = Math.floor(leftSec / 60);
    leftSec = Math.floor(leftSec - mins * 60);
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

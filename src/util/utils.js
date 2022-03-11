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
    const t1 = new Date(start.toDate());
    const t2 = new Date(end.toDate());
    const diff = (t2 - t1) / 1000;
    var hrs = Math.floor(diff / (60 * 60));
    var leftSec = diff - hrs * 60 * 60;
    var mins = Math.floor(leftSec / 60);
    if (mins < 10) {
      mins = "0" + mins;
    }
    return `Worktime: ${hrs}:${mins}`;
  } catch (e) {
    return "-";
  }
}

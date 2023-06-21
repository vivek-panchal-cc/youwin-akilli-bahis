export const getDateWithOrdinalSuffix = (fullDate) => {
    const d = new Date(fullDate);
    const date = d.getDate();
    const day = getOrdinalDay(date);
    const suffixes = getOrdinalSuffix(d.getDate(date));
    return day + " " + date + suffixes
}

export const getOrdinalDay = (date) => {
    const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const d = new Date(date);
    return DAY[d.getDay()]
}

export const getOrdinalSuffix = (day) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const specialCases = [11, 12, 13];
  
    if (specialCases.includes(day % 100)) {
      return suffixes[0];
    } else {
      return suffixes[day % 10];
    }
}

export const getFormattedTime = (fullDate) => {
    const d = new Date(fullDate);

    const hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
    const minutes = (d.getMinutes() < 10 ? "0" : '') + d.getMinutes();

    return hours + ":" + minutes;
}

export const getMonthNameWithDate = (fullDate) => {
  const d = new Date(fullDate);
  
  const month = d.toLocaleDateString('default', {
    month: "short"
  })
  const date = d.getDate();
  return date +" "+ month
}
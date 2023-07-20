// function return current day and date and suffix base on date, e.g "Mon 5th"
export const getDateWithOrdinalSuffix = (fullDate) => {
    const d = new Date(fullDate);
    const date = d.getDate();
    const day = getOrdinalDay(date);
    const suffixes = getOrdinalSuffix(d.getDate(date));
    return day + " " + date + suffixes
}

// function return current day base on date which is pass in argument
export const getOrdinalDay = (date) => {
    const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const d = new Date(date);
    return DAY[d.getDay()]
}

// function return suffix which is use after number e.g "th", "st", "nd", "rd".
export const getOrdinalSuffix = (day) => {  
    const suffixes = ["th", "st", "nd", "rd"];
    const specialCases = [11, 12, 13];
  
    if (specialCases.includes(day % 100)) {
      return suffixes[0];
    } else {
      const lastDigit = day % 10;
      return suffixes[lastDigit] || suffixes[0];
    }
}

// function returns formatted time e.g "10:30"
export const getFormattedTime = (fullDate) => {
    const d = new Date(fullDate);

    const hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
    const minutes = (d.getMinutes() < 10 ? "0" : '') + d.getMinutes();

    return hours + ":" + minutes;
}

// function return month name with date e.g "15 Jun"
export const getMonthNameWithDate = (fullDate) => {
  const d = new Date(fullDate);
  
  const month = d.toLocaleDateString('default', {
    month: "short"
  })
  const date = d.getDate();
  return date +" "+ month
}
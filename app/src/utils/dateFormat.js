// function return current day and date and suffix base on date, e.g "Mon 5th"
export const getDateWithOrdinalSuffix = (fullDate) => {
  const d = new Date(fullDate);
  const date = d.getDate();
  const day = getOrdinalDay(date);
  const suffixes = getOrdinalSuffix(d.getDate(date));
  return day + " " + date + suffixes;
};

export const getOrdinalDay = (date) => {
  const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const d = new Date(date);

  // Check if date is today's current date
  const today = new Date();
  if (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  return DAY[d.getDay()];
};

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
};

export const getFormattedTime = (fullDate) => {
  let d;

  // Check if the date matches the format "2023-08-19 21:45"
  const simpleDatePattern = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/;

  if (simpleDatePattern.test(fullDate)) {
    // If it matches the simple date format, treat it directly
    d = new Date(fullDate);
  } else {
    // If it's the other format, convert it to the desired timezone
    d = new Date(
      new Date(fullDate).toLocaleString("en", { timeZone: "Asia/Istanbul" })
    );
  }

  const hours = (d.getHours() < 10 ? "0" : "") + d.getHours();
  const minutes = (d.getMinutes() < 10 ? "0" : "") + d.getMinutes();

  return hours + ":" + minutes;
};

// function return month name with date e.g "15 Jun"
export const getMonthNameWithDate = (fullDate) => {
  const d = new Date(
    new Date(fullDate).toLocaleString("en", { timeZone: "Asia/Istanbul" })
  );
  const month = d.toLocaleDateString("default", {
    month: "short",
  });
  const date = d.getDate();
  return date + " " + month;
};

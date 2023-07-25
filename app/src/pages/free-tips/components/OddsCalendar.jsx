import React from "react";
import { CalendarIcon } from "../../../assets/svgs";

const OddsCalendar = ({ handleDateSelection, selectedDate }) => {  
  const currentDate = new Date();
  // Get the current date with day
  const currentDay = currentDate.getDate();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();  

  // Calculate the next six dates with days
  const nextDates = [];
  for (let i = 1; i <= 6; i++) {
    const nextDate = new Date(currentYear, currentMonth, currentDay + i);
    const nextDay = nextDate.getDate();
    const nextDayOfWeek = daysOfWeek[nextDate.getDay()];
    nextDates.push({ date: nextDay, dayOfWeek: nextDayOfWeek });
  }

  return (
    <div className="calendar">
      <div className="month_name">
        <CalendarIcon />
        <h1 className="month">{monthsOfYear[currentMonth]}</h1>
      </div>
      <div className="day_date_name">
        <div
          className={`date ${selectedDate === currentDay ? "selected" : ""}`}
          onClick={() => handleDateSelection(currentDay)}
        >
          <span className="day">{currentDayOfWeek}</span>
          <span className="number">{currentDay}</span>
        </div>
        <div className="next_dates_column">
          {nextDates.map((dateObj, index) => (
            <div
              key={index}
              className={`date ${
                selectedDate === dateObj.date ? "selected" : ""
              }`}
              onClick={() => handleDateSelection(dateObj.date)}
            >
              <span className="day_of_week">{dateObj.dayOfWeek}</span>
              <span className="date_number">{dateObj.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OddsCalendar;

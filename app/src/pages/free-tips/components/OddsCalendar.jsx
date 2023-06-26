import React, { useState } from "react";
import { CalendarIcon } from "../../../assets/svgs";

const OddsCalendar = ({ handleDateSelection, selectedDate }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
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
  // const [selectedDate, setSelectedDate] = useState(currentDay);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get the first day of the current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const startingDayOfWeek = firstDayOfMonth.getDay();

  // Calculate the next six dates with days
  const nextDates = [];
  for (let i = 1; i <= 6; i++) {
    const nextDate = new Date(currentYear, currentMonth, currentDay + i);
    const nextDay = nextDate.getDate();
    const nextDayOfWeek = daysOfWeek[nextDate.getDay()];
    nextDates.push({ date: nextDay, dayOfWeek: nextDayOfWeek });
  }

  // const handleDateSelection = (date) => {
  //   setSelectedDate(date);    
  // };

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

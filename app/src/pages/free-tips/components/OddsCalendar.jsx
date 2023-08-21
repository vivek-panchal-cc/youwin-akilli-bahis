import React from "react";
import { CalendarIcon } from "../../../assets/svgs";
import useCurrentLanguage from "../../../misc";
import { getCurrentOddStatus } from "../../../services/vefaAppService";

const OddsCalendar = ({ handleDateSelection, selectedDate, data }) => {
  const currentDate = new Date();
  const settings = useCurrentLanguage();
  // Get the current date with day
  const currentDay = currentDate.getDate();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthsOfYear = [
    settings.staticString.january,
    settings.staticString.february,
    settings.staticString.march,
    settings.staticString.april,
    settings.staticString.may,
    settings.staticString.june,
    settings.staticString.july,
    settings.staticString.august,
    settings.staticString.september,
    settings.staticString.october,
    settings.staticString.november,
    settings.staticString.december,
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

  const filterData = data?.filter((item) => {
    const oddStatus =
      item?.name_en !== ""
        ? getCurrentOddStatus(item?.name_en, item?.line)
        : "";
    return oddStatus !== "";
  });

  const hasDataOnDate = (date) => {
    return filterData?.some(
      (item) => new Date(item.kickOffTime).getDate() === date
    );
  };

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
          <span className={`number ${hasDataOnDate(currentDay) ? "bold" : ""}`}>
            {currentDay}
          </span>
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
              <span
                className={`date_number ${
                  hasDataOnDate(dateObj.date) ? "bold" : ""
                }`}
              >
                {dateObj.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OddsCalendar;

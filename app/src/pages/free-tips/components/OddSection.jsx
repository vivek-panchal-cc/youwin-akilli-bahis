import React, { useState } from "react";
import {
  getFormattedTime,
  getMonthNameWithDate,
  getOrdinalDay,
} from "../../../utils/dateFormat";
import settings from "../../../misc";
import { getCurrentOddStatus } from "../../../services/vefaAppService";
import OddsCalendar from "./OddsCalendar";
import { useParams } from "react-router-dom";

/**
 *
 * PopularOdds - component use for all popular odds show.
 *
 * @param data - data comes from firebase.
 *
 */

const OddSection = ({ data, handleSelectOdd, selectedItem }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const [selectedDate, setSelectedDate] = useState(currentDay);
  const { id } = useParams();

  // Filter the data based on the selected date
  const filteredData = data?.filter((item) => {
    const filteredItems = new Date(item.kickOffTime).getDate();
    const itemGroupId = item.groupId;
    return filteredItems === selectedDate && itemGroupId === id;
  });

  const handleDateSelection = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="odds_section_container">
      <OddsCalendar
        handleDateSelection={handleDateSelection}
        selectedDate={selectedDate}
      />
      <div className="odds_section_content">
        {filteredData && filteredData?.length > 0 ? (
          filteredData?.map((item) => {
            const isSelected = selectedItem?.some(
              (elm) => elm.eventId === item?.eventId && elm.selectionId === item?.selectionId
            );
            return (
              <div key={item?.eventId} className="odds_section_item">
                <div className="left_content">
                  <div className="team_section">
                    <img
                      src={`${IMAGE_BASE_PATH}${item?.teamA_logo}`}
                      alt="team logo"
                    />
                    <img
                      src={`${IMAGE_BASE_PATH}${item?.teamB_logo}`}
                      alt="team logo"
                    />
                  </div>
                  <div className="odd_section_details">
                    <div className="event_kick_off">
                      <p className="event_details">{item?.groupName}</p>
                      <p className="kick_off_time">
                        {getOrdinalDay(item?.kickOffTime)} {"at"}{" "}
                        {getFormattedTime(item?.kickOffTime)}
                      </p>
                    </div>
                    <p className="team_details">
                      {item?.teamA} v {item?.teamB}
                    </p>
                    <p className="stats">{item?.stats}</p>
                  </div>
                </div>

                <div
                  className={`odd_button ${isSelected ? "selected" : ""} `}
                  onClick={() => handleSelectOdd(item)}
                >
                  <p>{getCurrentOddStatus(item?.name_en, item?.line)}</p>
                  <p>{item?.odds_decimal}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no_data_found">No data found.</p>
        )}
      </div>
    </div>
  );
};

export default OddSection;

import React, { Suspense, useState } from "react";
import { getFormattedTime, getOrdinalDay } from "../../../utils/dateFormat";
import { getCurrentOddStatus } from "../../../services/vefaAppService";
import OddsCalendar from "./OddsCalendar";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";
import settings from "../../../misc";
const ImageLoader = React.lazy(() =>
  import("../../../components/common/imageLoader")
);

/**
 *
 * PopularOdds - component use for all popular odds show.
 *
 * @param data - data comes from firebase.
 *
 */

const OddSection = ({ data, handleSelectOdd, selectedItem, isLoading }) => {
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

  let content;

  if (isLoading) {
    content = Array.from({ length: filteredData?.length || 1 }).map(
      (_, index) => (
        <div key={index} className="odds_section_item skeleton">
          <div className="left_content">
            <div className="team_section">
              <Skeleton
                variant="rectangular"
                width={60}
                height={40}
                className="skeleton_img_1"
              />
              <Skeleton
                variant="rectangular"
                width={60}
                height={40}
                className="skeleton_img_2"
              />
            </div>
            <div className="odd_section_details">
              <div className="event_kick_off">
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton
                  variant="text"
                  width={70}
                  height={20}
                  style={{ marginLeft: "10px" }}
                />
              </div>
              <Skeleton variant="text" width={160} height={20} />
              <Skeleton variant="text" width={160} height={20} />
            </div>
          </div>
          <div className="odd_button skeleton">
            <Skeleton variant="text" width={80} height={20} />
            <Skeleton variant="text" width={60} height={20} />
          </div>
        </div>
      )
    );
  } else if (filteredData && filteredData.length > 0) {
    const nonEmptyOddStatusItems = filteredData.filter((item) => {
      const oddStatus =
        item?.name_en !== ""
          ? getCurrentOddStatus(item?.name_en, item?.line)
          : "";
      return oddStatus !== "";
    });

    if (nonEmptyOddStatusItems.length > 0) {
      content = nonEmptyOddStatusItems.map((item) => {
        const isSelected = selectedItem?.some(
          (elm) =>
            elm.eventId === item?.eventId &&
            elm.selectionId === item?.selectionId
        );

        // Check if item?.name_en is not blank before rendering the odd status
        const oddStatus =
          item?.name_en !== ""
            ? getCurrentOddStatus(item?.name_en, item?.line)
            : "";

        // If the odd status is null, skip rendering this item
        if (oddStatus === "") {
          return null;
        }

        return (
          <div key={item?.eventId} className="odds_section_item">
            <div className="left_content">
              <div className="team_section">
                <Suspense
                  fallback={
                    <Skeleton
                      variant="rectangular"
                      width={60}
                      height={60}
                      style={{
                        position: "relative",
                        zIndex: "2",
                        top: "-13px",
                        left: "0px",
                      }}
                    />
                  }
                >
                  <ImageLoader
                    src={`${IMAGE_BASE_PATH}${item?.teamA_logo}`}
                    alt="logo"
                    className="image_loader_teamA"
                    style={{
                      position: "relative",
                      zIndex: "2",
                      top: "-13px",
                      left: "0px",
                    }}
                  />
                </Suspense>
                <Suspense
                  fallback={
                    <Skeleton
                      variant="rectangular"
                      width={60}
                      height={60}
                      style={{
                        position: "relative",
                        zIndex: "1",
                        top: "14px",
                        left: "-20px",
                      }}
                    />
                  }
                >
                  <ImageLoader
                    src={`${IMAGE_BASE_PATH}${item?.teamB_logo}`}
                    alt="logo"
                    className="image_loader_teamB"
                    style={{
                      position: "relative",
                      zIndex: "1",
                      top: "14px",
                      left: "-20px",
                    }}
                  />
                </Suspense>
              </div>
              <div className="odd_section_details">
                <div className="event_kick_off">
                  <p className="event_details">{item?.groupName}</p>
                  <p className="kick_off_time">
                    {getOrdinalDay(item?.kickOffTime)} at{" "}
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
              className={`odd_button ${isSelected ? "selected" : ""}`}
              onClick={() => handleSelectOdd(item)}
            >
              <p>{oddStatus}</p>
              <p>{item?.odds_decimal}</p>
            </div>
          </div>
        );
      });
    } else {
      content = (
        <p className="no_data_found">{settings.staticString.noDataFound}</p>
      );
    }
  } else {
    content = (
      <p className="no_data_found">{settings.staticString.noDataFound}</p>
    );
  }

  return (
    <div className="odds_section_container">
      <OddsCalendar
        handleDateSelection={handleDateSelection}
        selectedDate={selectedDate}
      />
      <div className="odds_section_content">{content}</div>
    </div>
  );
};

export default OddSection;

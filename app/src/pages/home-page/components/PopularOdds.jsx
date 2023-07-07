import React from "react";
import { ShareIcon } from "../../../assets/svgs";
import {
  getFormattedTime,
  getMonthNameWithDate,
} from "../../../utils/dateFormat";
import settings from "../../../misc";
import Skeleton from "react-loading-skeleton";
import { getCurrentOddStatus } from "../../../services/vefaAppService";

/**
 *
 * PopularOdds - component use for all popular odds show.
 *
 * @param data - data comes from firebase.
 *
 */

const PopularOdds = ({ data, handleSelectOdd, tipsCollection, isLoading }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;

  return (
    <div className="popular_odds_container">
      <div className="popular_odd_header">
        <h2>{settings.staticString.popularOdds}</h2>
        <div className="share_icon">
          <ShareIcon />
        </div>
      </div>
      <div className="popular_matches_content">
        {isLoading
          ? // Render skeleton loading elements when isLoading is true
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="popular_match_item">
                <Skeleton height={100} />
              </div>
            ))
          : data?.map((item) => {
              const isSelected = tipsCollection?.some(
                (elm) =>
                  elm.eventId === item?.eventId &&
                  elm?.selectionId === item?.odds["away"]?.selectionId
              );
              console.log("isSelected :>> ", isSelected);
              return (
                <div
                  key={`${item?.eventId}-${item?.odds["away"].selectionId}`}
                  className="popular_match_item"
                >
                  <div className="left_content">
                    <div className="team_section">
                      <p>{item?.teamA}</p>
                      <img
                        src={`${IMAGE_BASE_PATH}${item?.teamA_logo}`}
                        alt="team logo"
                      />
                    </div>
                    <div className="time_section">
                      <p>{getMonthNameWithDate(item?.kickOffTime)}</p>
                      <p>{getFormattedTime(item?.kickOffTime)}</p>
                    </div>
                    <div className="team_section">
                      <img
                        src={`${IMAGE_BASE_PATH}${item?.teamB_logo}`}
                        alt="team logo"
                      />
                      <p>{item?.teamB}</p>
                    </div>
                  </div>
                  <div
                    className={`odd_button ${isSelected ? "selected" : ""} `}
                    onClick={() =>
                      handleSelectOdd({
                        ...item,
                        ...item.odds["away"],
                        name_en: "away",
                      })
                    }
                  >
                    <p>
                      {getCurrentOddStatus("away", item?.odds["away"].line)}
                    </p>
                    <p>
                      {typeof item?.odds["away"]?.odds_decimal === "string" ? (
                        <p>
                          {parseFloat(
                            item?.odds["away"]?.odds_decimal
                          )?.toFixed(2)}
                        </p>
                      ) : (
                        <p>{item?.odds["away"]?.odds_decimal?.toFixed(2)}</p>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default PopularOdds;

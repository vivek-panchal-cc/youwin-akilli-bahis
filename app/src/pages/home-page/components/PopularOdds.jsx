import React, { useState } from "react";
import { ShareIcon, CrossIcon } from "../../../assets/svgs";
import {
  getFormattedTime,
  getMonthNameWithDate,
} from "../../../utils/dateFormat";
import settings from "../../../misc";
import Skeleton from "react-loading-skeleton";
import { getCurrentOddStatus } from "../../../services/vefaAppService";
import TwitterIcon from "../../../assets/images/twitter_share.png";
import WhatsappIcon from "../../../assets/images/whatsapp_share.png";
import TelegramIcon from "../../../assets/images/telegram_share.png";
import YouWinIcon from "../../../assets/images/youwin_share.png";

/**
 *
 * PopularOdds - component use for all popular odds show.
 *
 * @param data - data comes from firebase.
 *
 */

const PopularOdds = ({ data, handleSelectOdd, tipsCollection, isLoading }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const [shareIconsVisible, setShareIconsVisible] = useState(false);

  const handleShareClick = () => {
    setShareIconsVisible(true);
  };

  const handleCrossClick = () => {
    setShareIconsVisible(false);
  };

  return (
    <div className="popular_odds_container">
      <div className={`popular_odd_header${isLoading ? " loading" : ""}`}>
        {isLoading ? (
          <Skeleton height={20} width={100} />
        ) : (
          <h2>{settings.staticString.popularOdds}</h2>
        )}
        <div className={`share_icon${isLoading ? " loading" : ""}`}>
          {!shareIconsVisible ? (
            isLoading ? (
              <Skeleton height={20} width={20} />
            ) : (
              <ShareIcon onClick={handleShareClick} />
            )
          ) : (
            <div className="share_icons_line">
              {isLoading ? (
                <>
                  <Skeleton height={20} width={20} />
                  <Skeleton height={20} width={20} />
                  <Skeleton height={20} width={20} />
                  <Skeleton height={20} width={20} />
                </>
              ) : (
                <>
                  <img src={TwitterIcon} alt="Twitter" />
                  <img src={TelegramIcon} alt="Telegram" />
                  <img src={WhatsappIcon} alt="WhatsApp" />
                  <img src={YouWinIcon} alt="YouWin" />
                </>
              )}
              <CrossIcon onClick={handleCrossClick} />
            </div>
          )}
        </div>
      </div>
      <div className="popular_matches_content">
        {isLoading
          ? // Render skeleton loading elements when isLoading is true
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="popular_match_item loading">
                <Skeleton height={100} />
              </div>
            ))
          : data?.map((item, i) => {
              const isSelected = tipsCollection?.some(
                (elm) =>
                  elm.eventId === item?.eventId &&
                  elm?.selectionId === item?.odds["away"]?.selectionId
              );              
              return (
                <div
                  key={`${item?.eventId}-${item?.odds["away"].selectionId}-${i}`}
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
                        <span>
                          {parseFloat(
                            item?.odds["away"]?.odds_decimal
                          )?.toFixed(2)}
                        </span>
                      ) : (
                        <span>{item?.odds["away"]?.odds_decimal?.toFixed(2)}</span>
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

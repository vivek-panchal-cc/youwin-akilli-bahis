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

const PopularOdds = ({ data, handleSelectOdd, tipsCollection, isLoading }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const [shareIconsVisible, setShareIconsVisible] = useState(false);

  const handleShareClick = () => {
    setShareIconsVisible(true);
  };

  const handleCrossClick = () => {
    setShareIconsVisible(false);
  };

  const getRandomOdd = (odds, eventId) => {
    // If there's already a random odd for this item, return it
    let randomOddsData =
      JSON.parse(sessionStorage.getItem("randomOddsData")) || {};
    if (randomOddsData[eventId]) {
      return randomOddsData[eventId];
    }

    // Otherwise, generate a new random odd
    const keys = Object.keys(odds);
    const randomIndex = Math.floor(Math.random() * keys.length);
    const randomKey = keys[randomIndex];

    // Store the new random odd in the ref
    randomOddsData[eventId] = { key: randomKey };
    sessionStorage.setItem("randomOddsData", JSON.stringify(randomOddsData));
    return randomOddsData[eventId];
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
              const randomOddKey = getRandomOdd(item?.odds, item?.eventId)?.key;
              const randomOdd = item?.odds[randomOddKey];
              const isSelected = tipsCollection?.some(
                (elm) =>
                  elm.eventId === item?.eventId &&
                  elm?.selectionId === randomOdd?.selectionId
              );
              return (
                <div
                  key={`${item?.eventId}-${randomOdd?.selectionId}-${i}`}
                  className="popular_match_item"
                >
                  <div className="left_content">
                    <div className="team_section">
                      <p>{item?.teamA}</p>
                      <ImageLoader
                        src={`${IMAGE_BASE_PATH}${item?.teamA_logo}`}
                        alt="team logo"
                        shape="circular"
                        className="image_loader_teamA"
                        style={{ height: "20px", width: "20px" }}
                      />
                    </div>
                    <div className="time_section">
                      <p>{getMonthNameWithDate(item?.kickOffTime)}</p>
                      <p>{getFormattedTime(item?.kickOffTime)}</p>
                    </div>
                    <div className="team_section">
                      <ImageLoader
                        src={`${IMAGE_BASE_PATH}${item?.teamB_logo}`}
                        alt="team logo"
                        shape="circular"
                        className="image_loader_teamB"
                        style={{ height: "20px", width: "20px" }}
                      />
                      <p>{item?.teamB}</p>
                    </div>
                  </div>
                  <div
                    className={`odd_button ${isSelected ? "selected" : ""} `}
                    onClick={() =>
                      handleSelectOdd({
                        ...item,
                        ...randomOdd,
                        name_en: randomOddKey,
                      })
                    }
                  >
                    <p>{getCurrentOddStatus(randomOddKey, randomOdd?.line)}</p>
                    <p>
                      {typeof randomOdd?.odds_decimal === "string" ? (
                        <span>
                          {parseFloat(randomOdd?.odds_decimal)?.toFixed(2)}
                        </span>
                      ) : (
                        <span>{randomOdd?.odds_decimal?.toFixed(2)}</span>
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

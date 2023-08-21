import React, { Suspense, useRef } from "react";
import { DownloadIcon } from "../../../assets/svgs";
import {
  getFormattedTime,
  getMonthNameWithDate,
} from "../../../utils/dateFormat";
import useCurrentLanguage from "../../../misc";
import Skeleton from "react-loading-skeleton";
import { getCurrentOddStatus } from "../../../services/vefaAppService";
import html2canvas from "html2canvas";
import ScreenShotFooter from "../../../components/common/screenshotFooter";
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
  const contentRef = useRef();
  const footerRef = useRef();
  const settings = useCurrentLanguage();

  const handleDownloadClick = () => {
    const content = contentRef.current;
    const footer = footerRef.current.cloneNode(true);

    // Temporarily append the footer to the content
    content.appendChild(footer);

    html2canvas(content, {
      onclone: function (document) {
        const items = document.querySelectorAll(".popular_match_item");
        items?.forEach((item, index) => {
          if (index >= 10) {
            item.style.display = "none";
          } else if (index === 0) {
            item.style.paddingTop = "10px";
          }
          // Add a condition for the 9th item (10th considering 0-index) 
          // to adjust bottom margin or padding
          else if (index === 9) {
            item.style.marginBottom = "20px"; // Adjust the value as needed
          }
        });
        const clonedFooter = document.querySelector(".footer");
        clonedFooter.style.position = "relative";
        clonedFooter.style.visibility = "visible";
        clonedFooter.style.opacity = "1";
        clonedFooter.style.left = "-20px";
        clonedFooter.style.width = "calc(100% + 40px)";
        clonedFooter.style.marginBottom = "-10px";
        clonedFooter.style.marginTop = "50px"; // Added some margin to top of footer
      },
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "screenshot.png";
      link.click();

      // Remove the footer from the content
      content.removeChild(footer);
    });
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
          {(() => {
            if (isLoading) {
              return <Skeleton height={20} width={20} />;
            } else {
              return <DownloadIcon onClick={handleDownloadClick} />;
            }
          })()}
        </div>
      </div>
      <div className="popular_matches_content" ref={contentRef}>
        {isLoading
          ? // Render skeleton loading elements when isLoading is true
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="popular_match_item loading">
                <Skeleton height={100} />
              </div>
            ))
          : data?.slice(0, 10).map((item, i) => {
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
                      <Suspense
                        fallback={
                          <Skeleton
                            variant="circular"
                            width={60}
                            height={60}
                            style={{
                              height: "20px",
                              width: "20px",
                            }}
                          />
                        }
                      >
                        <ImageLoader
                          src={`${IMAGE_BASE_PATH}${item?.teamA_logo}`}
                          alt="team logo"
                          shape="circular"
                          className="image_loader_teamA"
                          style={{ height: "20px", width: "20px" }}
                        />
                      </Suspense>
                    </div>
                    <div className="time_section">
                      <p>{getMonthNameWithDate(item?.kickOffTime)}</p>
                      <p>{getFormattedTime(item?.kickOffTime)}</p>
                    </div>
                    <div className="team_section">
                      <Suspense
                        fallback={
                          <Skeleton
                            variant="circular"
                            width={60}
                            height={60}
                            style={{
                              height: "20px",
                              width: "20px",
                            }}
                          />
                        }
                      >
                        <ImageLoader
                          src={`${IMAGE_BASE_PATH}${item?.teamB_logo}`}
                          alt="team logo"
                          shape="circular"
                          className="image_loader_teamB"
                          style={{ height: "20px", width: "20px" }}
                        />
                      </Suspense>
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
      <div
        ref={footerRef}
        className="footer"
        style={{ visibility: "hidden", height: 0, opacity: 0, padding: "0px" }}
      >
        <ScreenShotFooter />
      </div>
    </div>
  );
};

export default PopularOdds;

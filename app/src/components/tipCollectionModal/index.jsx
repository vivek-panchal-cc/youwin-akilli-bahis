import { Modal } from "react-bootstrap";
import React, { useContext, useRef } from "react";
import { ReducerContext } from "../../context/ReducerContext";
import { AppContext } from "../../context/AppContext";
import {
  removeItemFromTipCollection,
  setTipCollectionModalStatus,
  removeAllItemsFromTipCollection,
} from "../../feature/appAction";
import settings from "../../misc";
import { InformationIcon, DownloadIcon } from "../../assets/svgs";
import deleteIcon from "../../assets/svgs/Delete.svg";
import { getCurrentOddStatus } from "../../services/vefaAppService";
import html2canvas from "html2canvas";
import ScreenShotFooter from "../common/screenshotFooter";

/**
 * TipCollectionModal - component use for tip collection modal.
 **/

const TipCollectionModal = () => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const contentRef = useRef(null);
  const footerRef = useRef();
  const { dispatch, isModalShow, tipsCollection } = useContext(ReducerContext);
  const { fireBaseAllEventsDataBase } = useContext(AppContext);

  const handleClose = () => {
    setTipCollectionModalStatus(dispatch, false);
  };

  const handleRemoveAllOdds = () => {
    dispatch(removeAllItemsFromTipCollection());
  };

  const handleRemoveOdds = (eventId) => {
    removeItemFromTipCollection(dispatch, eventId);
  };

  const calculateTotalOdds = () => {
    let totalOdds = 1;

    tipsCollection?.forEach((item) => {
      const odds =
        typeof item?.odds_decimal === "string"
          ? parseFloat(item?.odds_decimal)
          : item?.odds_decimal;
      const price =
        typeof item?.price === "string" ? parseFloat(item?.price) : item?.price;

      // Check if the parsed odds and price are valid numbers
      if (!isNaN(odds)) {
        // If odds is a valid number, multiply it with totalOdds
        totalOdds *= odds;
      }

      // Check if the parsed price is a valid number
      if (!isNaN(price)) {
        // If price is a valid number, multiply it with totalOdds
        totalOdds *= price;
      }
    });

    // Return the totalOdds rounded to 2 decimal places
    return totalOdds?.toFixed(2);
  };

  const handleDownloadClick = () => {
    const content = contentRef.current;
    const footer = footerRef.current.cloneNode(true);

    // Temporarily append the footer to the content
    content.appendChild(footer);

    html2canvas(content, {
      onclone: function (document) {
        const clonedFooter = document.querySelector(".modal-body .footer");
        clonedFooter.style.visibility = "visible"; // Make cloned footer visible
        clonedFooter.style.opacity = "1";
        clonedFooter.style.position = "relative"; // Change position to relative
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

  return (
    <div className="">
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={isModalShow}
        onHide={handleClose}
        className="tip_collection_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {settings.staticString.myTipCollection}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div ref={contentRef}>
            {tipsCollection?.length <= 0 && (
              <div className="empty_text">
                <p>{settings.staticString.tipCollectionIsEmpty}</p>
              </div>
            )}
            {tipsCollection?.length > 0 && (
              <>
                <div className="odds_container">
                  <div className="matches_content">
                    {tipsCollection?.map((item, index) => {
                      // const isSelected = tipsCollection?.some(elm => elm.eventId === item?.eventId)
                      const matchItem = fireBaseAllEventsDataBase?.find(
                        (i) => i.eventId === item?.eventId
                      );
                      const key = item?.eventId ?? `item-${index}`;

                      // Get the teamA_logo
                      let teamALogoSrc = <InformationIcon />;
                      if (item?.teamA_logo) {
                        teamALogoSrc = (
                          <img
                            src={`${IMAGE_BASE_PATH}${item?.teamA_logo}`}
                            alt="logo"
                          />
                        );
                      } else if (matchItem?.teamA_logo) {
                        teamALogoSrc = (
                          <img
                            src={`${IMAGE_BASE_PATH}${matchItem?.teamA_logo}`}
                            alt="logo"
                          />
                        );
                      }

                      // Get the teamB_logo
                      let teamBLogoSrc = <InformationIcon />;
                      if (item?.teamB_logo) {
                        teamBLogoSrc = (
                          <img
                            src={`${IMAGE_BASE_PATH}${item?.teamB_logo}`}
                            alt="logo"
                          />
                        );
                      } else if (matchItem?.teamB_logo) {
                        teamBLogoSrc = (
                          <img
                            src={`${IMAGE_BASE_PATH}${matchItem?.teamB_logo}`}
                            alt="logo"
                          />
                        );
                      }

                      return (
                        <div key={key} className="popular_match_item">
                          <div className="left_content">
                            <div className="team_section">
                              <p>{item?.teamA}</p>
                              {teamALogoSrc}
                            </div>
                            {/* <div className='time_section'>
                        <p>{getMonthNameWithDate(item?.kickOffTime)}</p>
                        <p>{getFormattedTime(item?.kickOffTime)}</p>
                      </div> */}
                            <div className="team_section">
                              {teamBLogoSrc}
                              <p>{item?.teamB}</p>
                            </div>
                          </div>
                          <div
                            className={`odd_button`}
                            onClick={() => handleRemoveOdds(item?.eventId)}
                          >
                            <p>
                              {item?.name_en
                                ? getCurrentOddStatus(item?.name_en, item?.line)
                                : getCurrentOddStatus(item?.outcomeName)}{" "}
                            </p>
                            {typeof item?.odds_decimal === "string" ||
                            typeof item?.price === "string" ? (
                              <p>
                                {item?.odds_decimal
                                  ? parseFloat(item?.odds_decimal)?.toFixed(2)
                                  : parseFloat(item?.price)?.toFixed(2)}
                              </p>
                            ) : (
                              <p>
                                {item?.odds_decimal
                                  ? item?.odds_decimal?.toFixed(2)
                                  : item?.price?.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="total_odds">
                  <p>{settings.staticString.totalOdds}: </p>
                  <h5>{calculateTotalOdds()}</h5>
                </div>
                <div className="tip_collection_button">
                  <div>
                    <button
                      className="btn delete_button"
                      onClick={() => handleRemoveAllOdds()}
                    >
                      <img src={deleteIcon} alt="Delete" />
                    </button>
                  </div>
                  <div>
                    <button
                      className="btn share_button"
                      onClick={handleDownloadClick}
                    >
                      <DownloadIcon />
                      {settings.staticString.downloadMyTipCollection}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            ref={footerRef}
            className="footer"
            style={{
              visibility: "hidden",
              height: 0,
              opacity: 0,
              padding: "0px",
            }}
          >
            <ScreenShotFooter />
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TipCollectionModal;

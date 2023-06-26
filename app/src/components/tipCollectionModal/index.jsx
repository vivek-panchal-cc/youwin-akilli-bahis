import { Modal } from "react-bootstrap";
import React, { useContext } from "react";
import { ReducerContext } from "../../context/ReducerContext";
import {
  removeItemFromTipCollection,
  setTipCollectionModalStatus,
} from "../../feature/appAction";
import settings from "../../misc";
import { ShareIcon } from "../../assets/svgs";
import { getCurrentOddStatus } from "../../services/vefaAppService";

/**
 * TipCollectionModal - component use for tip collection modal.
 *
 */

const TipCollectionModal = () => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;

  const { dispatch, isModalShow, tipsCollection } = useContext(ReducerContext);

  const handleClose = () => {
    setTipCollectionModalStatus(dispatch, false);
  };

  const handleRemoveOdds = (eventId) => {
    removeItemFromTipCollection(dispatch, eventId);
  };

  const calculateTotalOdds = () => {
    let totalOdds = 1;
    tipsCollection.forEach((item) => {
      totalOdds *= item.odds_decimal;
    });
    return totalOdds.toFixed(2);
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
          {tipsCollection?.length <= 0 && (
            <div className="empty_text">
              <p>Empty Tip Collection</p>
            </div>
          )}
          {tipsCollection?.length > 0 && (
            <>
              <div className="odds_container">
                <div className="matches_content">
                  {tipsCollection?.map((item) => {
                    // const isSelected = tipsCollection?.some(elm => elm.eventId === item?.eventId)
                    return (
                      <div key={item?.eventId} className="popular_match_item">
                        <div className="left_content">
                          <div className="team_section">
                            <p>{item?.teamA}</p>
                            <img
                              src={`${IMAGE_BASE_PATH}${item?.teamA_logo}`}
                              alt="team logo"
                            />
                          </div>
                          {/* <div className='time_section'>
                        <p>{getMonthNameWithDate(item?.kickOffTime)}</p>
                        <p>{getFormattedTime(item?.kickOffTime)}</p>
                      </div> */}
                          <div className="team_section">
                            <img
                              src={`${IMAGE_BASE_PATH}${item?.teamB_logo}`}
                              alt="team logo"
                            />
                            <p>{item?.teamB}</p>
                          </div>
                        </div>
                        <div
                          className={`odd_button`}
                          onClick={() => handleRemoveOdds(item?.eventId)}
                        >
                          <p>
                            {getCurrentOddStatus(item?.name_en, item?.line)}
                          </p>
                          <p>{item?.odds_decimal}</p>
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
              <div>
                <button className="btn share_button">
                  <ShareIcon />
                  {settings.staticString.shareMyTipCollection}
                </button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TipCollectionModal;

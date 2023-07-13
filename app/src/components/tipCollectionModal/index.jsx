import { Modal } from "react-bootstrap";
import React, { useContext, useState } from "react";
import { ReducerContext } from "../../context/ReducerContext";
import {
  removeItemFromTipCollection,
  setTipCollectionModalStatus,
  removeAllItemsFromTipCollection,
} from "../../feature/appAction";
import settings from "../../misc";
import { ShareIcon } from "../../assets/svgs";
import Spinner from "../../components/common/spinner"
import deleteIcon from "../../assets/svgs/Delete.svg";
import { getCurrentOddStatus } from "../../services/vefaAppService";

/**
 * TipCollectionModal - component use for tip collection modal.
 *
 */

const TipCollectionModal = () => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const [isLoading, setIsLoading] = useState(false);

  const { dispatch, isModalShow, tipsCollection } = useContext(ReducerContext);

  const handleClose = () => {
    setTipCollectionModalStatus(dispatch, false);
  };

  const handleRemoveAllOdds = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      dispatch(removeAllItemsFromTipCollection());
    }, 2000);
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
        <Modal.Body
          className={isLoading ? "loading" : ""}
          style={{ opacity: isLoading ? "0.5" : "1" }}
        >
          {tipsCollection?.length <= 0 && (
            <div className="empty_text">
              <p>{settings.staticString.tipCollectionIsEmpty}</p>
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
                          {typeof item?.odds_decimal === "string" ? (
                            <p>{parseFloat(item?.odds_decimal).toFixed(2)}</p>
                          ) : (
                            <p>{item?.odds_decimal?.toFixed(2)}</p>
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
                  <button className="btn share_button">
                    <ShareIcon />
                    {settings.staticString.shareMyTipCollection}
                  </button>
                </div>
              </div>
            </>
          )}
          {isLoading && (
            <div className="loading_container">
              <div className="loading_text"><Spinner/></div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TipCollectionModal;

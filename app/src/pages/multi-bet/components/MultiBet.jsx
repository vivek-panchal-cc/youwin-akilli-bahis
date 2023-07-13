/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import {
  ShareIcon,
  LockIcon,
  UnLockIcon,
  SyncIcon,
  CrossIcon,
  InformationIcon,
  LoadingIcon,
} from "../../../assets/svgs";
import TwitterIcon from "../../../assets/images/twitter_share.png";
import WhatsappIcon from "../../../assets/images/whatsapp_share.png";
import TelegramIcon from "../../../assets/images/telegram_share.png";
import YouWinIcon from "../../../assets/images/youwin_share.png";
import settings from "../../../misc";
import {
  getCurrentOddStatus,
  multiBetAPI,
  multiBetAlterSuggestionAPI,
} from "../../../services/vefaAppService";
import { Skeleton } from "@mui/material";
import { debounce } from "lodash";

/**
 *
 * MultiBet - component use for multi bet.
 *
 * @param data - data comes from firebase.
 *
 */

const MultiBet = ({ data, handleSelectOdd, tipsCollection, isLoading }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const [rangeValue, setRangeValue] = useState(5000);
  const [multiBet, setMultiBet] = useState([]);
  const [shareIconsVisible, setShareIconsVisible] = useState(false);
  const [lockedItems, setLockedItems] = useState([]);
  const [isAlterSuggestion, setAlterSuggestion] = useState(false);
  const stack = 1000;

  useEffect(() => {
    const fetchMultiBetData = async () => {
      try {
        setAlterSuggestion(true);
        let multiBetData = await multiBetAPI(stack, rangeValue);

        const lockItem = lockedItems.map((i) => i.eventId);

        let multiBetFilterItem = multiBetData.MultibetItems?.filter(
          (item) => !lockItem.includes(item.eventId)
        );

        multiBetData["MultibetItems"] = multiBetFilterItem;
        setMultiBet(multiBetData);

        console.log("multiBetFilter", multiBetFilterItem);
      } catch (error) {
        console.error("Failed to fetch multiBet data:", error);
      } finally {
        setAlterSuggestion(false);
      }
    };

    const debouncedFetchMultiBetData = debounce(fetchMultiBetData, 500);

    const updateRangeColor = () => {
      const rangeInput = document.getElementById("vol");
      const value =
        ((rangeInput.value - rangeInput.min) /
          (rangeInput.max - rangeInput.min)) *
        100;
      rangeInput.style.background = `linear-gradient(to right, #00CA6B 0%, #00CA6B ${value}%, #BDBDBD ${value}%, #BDBDBD 100%)`;
    };

    updateRangeColor();
    debouncedFetchMultiBetData();

    return () => {
      debouncedFetchMultiBetData.cancel(); // Cleanup the debounce function on component unmount
    };
  }, [rangeValue]);

  const handleAlterSuggestions = useCallback(async () => {
    try {
      setAlterSuggestion(true);
      const eventIds = lockedItems?.map((item) => item.eventId).join(",");
      let multiBetAlterSuggestionData = await multiBetAlterSuggestionAPI(
        eventIds,
        7
      );
      // Filter out the locked items from the received suggestion data
      const lockedItemsData = multiBet.MultibetItems?.filter((item) =>
        lockedItems.some((lockedItem) => lockedItem.eventId === item.eventId)
      );

      // Set the locked items data along with the new suggestion data
      multiBetAlterSuggestionData.MultibetItems = [
        ...lockedItemsData,
        ...multiBetAlterSuggestionData.MultibetItems,
      ];
      console.log(
        "multiBetAlterSuggestionData :>> ",
        multiBetAlterSuggestionData
      );
      setMultiBet(multiBetAlterSuggestionData);
    } catch (error) {
      console.error("Failed to fetch multiBet data:", error);
    } finally {
      setAlterSuggestion(false);
    }
  }, [lockedItems, multiBet]);

  const handleShareClick = () => {
    setShareIconsVisible(true);
  };

  const handleCrossClick = () => {
    setShareIconsVisible(false);
  };

  const handleLockToggle = useCallback(
    (item) => {
      const isItemLocked = lockedItems.some(
        (elm) => elm.eventId === item.eventId
      );

      if (isItemLocked) {
        // Unlock the item by removing it from the lockedItems array
        const updatedLockedItems = lockedItems.filter(
          (elm) => elm.eventId !== item.eventId
        );
        setLockedItems(updatedLockedItems);
      } else {
        // Lock the item by adding it to the lockedItems array
        const updatedLockedItems = [...lockedItems, item];
        setLockedItems(updatedLockedItems);
      }
    },
    [lockedItems]
  );

  const handleRangeChange = useCallback((event) => {
    const value = event.target.value;
    const winningMoreValue = document.querySelector(".winning_more_value");
    if (winningMoreValue) {
      winningMoreValue.textContent = `${parseFloat(value).toFixed(3)}TL`;
    }
    setRangeValue(value);
  }, []);

  return (
    <div className="multi_bet_odds_container">
      <div className="multi_bet_odd_header">
        <h2>{settings.staticString.buildYourOwn}</h2>
        {!shareIconsVisible ? (
          <div className="share_icon">
            <ShareIcon onClick={handleShareClick} />
          </div>
        ) : (
          <div className="share_icon">
            <div className="share_icons_line">
              <img src={TwitterIcon} alt="Twitter" />
              <img src={TelegramIcon} alt="Telegram" />
              <img src={WhatsappIcon} alt="WhatsApp" />
              <img src={YouWinIcon} alt="YouWin" />
              <CrossIcon onClick={handleCrossClick} />
            </div>
          </div>
        )}
      </div>
      <div className="range_container">
        <div className="winning_more">
          <p>{settings.staticString.winningMoreThan}</p>
          <p className="winning_more_value">
            {parseFloat(rangeValue).toFixed(3)}TL
          </p>
        </div>
        <div className="select_range">
          <input
            className="range_style"
            type="range"
            id="vol"
            name="vol"
            step={500}
            min="1000"
            max="10000"
            value={rangeValue}
            disabled={isAlterSuggestion}
            onChange={handleRangeChange}
          />
        </div>
      </div>
      <div className="multi_bet_matches_content">
        {isLoading
          ? // Skeletons
            Array.from({ length: multiBet?.length || 0 }).map((_, index) => (
              <div key={index} className="multi_bet_match_item skeleton">
                <Skeleton variant="rectangular" width={60} height={40} />
                <Skeleton variant="rectangular" width={60} height={40} />
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="text" width={80} height={20} />
              </div>
            ))
          : multiBet?.MultibetItems &&
            multiBet?.MultibetItems?.map((item) => {
              const isSelected = tipsCollection?.some(
                (elm) =>
                  elm.eventId === item?.eventId &&
                  elm?.selectionId === item?.selectionId
              );

              const isLocked = lockedItems.some(
                (elm) => elm.eventId === item?.eventId
              );

              const matchItem = data?.find((i) => i.eventId === item?.eventId);

              return (
                <div key={matchItem?.eventId} className="multi_bet_match_item">
                  {isLocked ? (
                    <LockIcon onClick={() => handleLockToggle(item)} />
                  ) : (
                    <UnLockIcon onClick={() => handleLockToggle(item)} />
                  )}{" "}
                  <div className="left_content">
                    <div className="team_section">
                      <p>{item?.teamA}</p>
                      {matchItem?.teamA_logo ? (
                        <img
                          src={`${IMAGE_BASE_PATH}${matchItem?.teamA_logo}`}
                          alt="logo"
                        />
                      ) : (
                        <InformationIcon />
                      )}
                    </div>
                    <div className="team_section">
                      {matchItem?.teamB_logo ? (
                        <img
                          src={`${IMAGE_BASE_PATH}${matchItem?.teamB_logo}`}
                          alt="logo"
                        />
                      ) : (
                        <InformationIcon />
                      )}
                      <p>{item?.teamB}</p>
                    </div>
                  </div>
                  <div
                    className={`odd_button ${isSelected ? "selected" : ""} `}
                    // onClick={() => handleSelectOdd(item)}
                  >
                    <p>{getCurrentOddStatus(item?.name_en, item?.line)}</p>
                    {typeof item?.price === "string" ? (
                      <p>{parseFloat(item?.price).toFixed(2)}</p>
                    ) : (
                      <p>{item?.price.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              );
            })}
      </div>
      <div className="total_odds_details">
        <div className="total_odds">
          <p>{settings.staticString.totalOdds}:&nbsp;</p>
          <p className="total_odds_value">
            {multiBet.TotalOdds ? multiBet.TotalOdds : 0}
          </p>
        </div>
        <div className="total_win">
          <p>{settings.staticString.totalWins}:&nbsp;</p>
          <p className="total_wins_value">
            {isNaN(multiBet?.TotalOdds * stack)
              ? 0
              : (multiBet?.TotalOdds * stack).toFixed(2)}
            TL
          </p>
        </div>
      </div>
      <div className="multi_bet_button">
        <button onClick={handleAlterSuggestions}>
          {isAlterSuggestion ? (
            <>
              <div className="loading_icon">
                <LoadingIcon />
              </div>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <SyncIcon />
              &nbsp;Alter. Suggestions
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default MultiBet;

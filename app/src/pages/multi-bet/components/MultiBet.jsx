import React, { useEffect, useState } from "react";
import {
  ShareIcon,
  LockIcon,
  UnLockIcon,
  SyncIcon,
  PlusIcon,
  CrossIcon,
} from "../../../assets/svgs";
import YouWinIcon from "../../../assets/images/youwin_share.svg";
import TwitterIcon from "../../../assets/images/twitter_share.png";
import WhatsappIcon from "../../../assets/images/whatsapp_share.png";
import TelegramIcon from "../../../assets/images/telegram_share.png";
import settings from "../../../misc";
import {
  getCurrentOddStatus,
  multiBetAPI,
  multiBetAlterSuggestionAPI,
} from "../../../services/vefaAppService";

/**
 *
 * MultiBet - component use for multi bet.
 *
 * @param data - data comes from firebase.
 *
 */

const MultiBet = ({ data, handleSelectOdd, tipsCollection }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const [rangeValue, setRangeValue] = useState(1000);
  const [multiBet, setMultiBet] = useState([]);
  const [shareIconsVisible, setShareIconsVisible] = useState(false);
  // const [isLocked, setIsLocked] = useState(false);
  const [lockedItems, setLockedItems] = useState([]);
  const [unlockedItems, setUnlockedItems] = useState([]);
  const stack = 1000;

  // useEffect(() => {
  //   updateRangeColor();
  //   (async () => {
  //     const multiBetData = await multiBetAPI(1000, rangeValue);
  //     console.log("multiBetData :>> ", multiBetData?.MultibetItems);
  //     setMultiBet(multiBetData);
  //   })();
  // }, [rangeValue]);

  useEffect(() => {
    updateRangeColor();
    fetchMultiBetData();
  }, [rangeValue]);

  const fetchMultiBetData = async () => {
    try {
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
    }
  };

  const handleAlterSuggestions = async () => {
    try {
      const eventIds = lockedItems?.map((item) => item.eventId).join(",");
      const multiGroupIds = lockedItems
        ?.map((item) => item.multiGroupId)
        .join(",");
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
      console.log('multiBetAlterSuggestionData :>> ', multiBetAlterSuggestionData);
      setMultiBet(multiBetAlterSuggestionData);
      setUnlockedItems([]);
    } catch (error) {
      console.error("Failed to fetch multiBet data:", error);
    }
  };

  const updateRangeColor = () => {
    const rangeInput = document.getElementById("vol");
    const value =
      ((rangeInput.value - rangeInput.min) /
        (rangeInput.max - rangeInput.min)) *
      100;
    rangeInput.style.background = `linear-gradient(to right, #00CA6B 0%, #00CA6B ${value}%, #BDBDBD ${value}%, #BDBDBD 100%)`;
  };

  const updateRangeValue = (event) => {
    setLockedItems([]);
    setUnlockedItems([]);
    const value = event.target.value;
    const winningMoreValue = document.querySelector(".winning_more_value");
    if (winningMoreValue) {
      winningMoreValue.textContent = `${parseFloat(value).toFixed(3)}TL`;
    }
    setRangeValue(value);
  };

  const handleShareClick = () => {
    setShareIconsVisible(true);
  };

  const handleCrossClick = () => {
    setShareIconsVisible(false);
  };

  const handleLockToggle = (item) => {
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
  };

  // const handleLockToggle = (item) => {
  //   let prevLockedItems = lockedItems;
  //   let multiData = multiBet;
  //   const isItemLocked = prevLockedItems.includes(item);
  //   if (isItemLocked) {
  //     prevLockedItems = prevLockedItems.filter(
  //       (i) => i.eventId !== item.eventId
  //     );
  //   } else {
  //     prevLockedItems = [...prevLockedItems, item];
  //   }
  //   setLockedItems(prevLockedItems);

  //   const lockItem = prevLockedItems.map((i) => i.eventId);
  //   let multiBetFilterItem = multiBet.MultibetItems?.filter(
  //     (item) => !lockItem.includes(item.eventId)
  //   );
  //   multiData["MultibetItems"] = multiBetFilterItem;
  //   setMultiBet(multiData);
  // };

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
            onInput={updateRangeColor}
            onChange={updateRangeValue}
          />
        </div>
      </div>
      <div className="multi_bet_matches_content">
        {multiBet?.MultibetItems &&
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
                    <img
                      src={`${IMAGE_BASE_PATH}${matchItem?.teamA_logo}`}
                      alt="team logo"
                    />
                  </div>
                  <div className="team_section">
                    <img
                      src={`${IMAGE_BASE_PATH}${matchItem?.teamB_logo}`}
                      alt="team logo"
                    />
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
      {/* <div className="add_bet">
        <label><PlusIcon /> Add one more</label>
      </div> */}
      <div className="total_odds_details">
        <div className="total_odds">
          <p>{settings.staticString.totalOdds}:&nbsp;</p>
          <p className="total_odds_value">
            {multiBet.TotalOdds ? multiBet.TotalOdds : 0}
          </p>
        </div>
        <div className="total_win">
          <p>{settings.staticString.totalWins}:&nbsp;</p>
          <p className="total_wins_value">{multiBet?.TotalOdds * stack}TL</p>
        </div>
      </div>
      <div className="multi_bet_button">
        <button onClick={handleAlterSuggestions}>
          <SyncIcon />
          &nbsp;Alter. Suggestions
        </button>
      </div>
    </div>
  );
};

export default MultiBet;

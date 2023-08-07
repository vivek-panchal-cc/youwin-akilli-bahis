/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  SyncIcon,
  InformationIcon,
  LoadingIcon,
  DownloadIcon,
} from "../../../assets/svgs";
import settings from "../../../misc";
import LockIconPng from "../../../assets/images/Lock.png";
import UnlockIconPng from "../../../assets/images/Unlock.png";
import ScreenShotFooter from "../../../components/common/screenshotFooter";
import {
  getCurrentOddStatus,
  multiBetAPI,
  multiBetAlterSuggestionAPI,
} from "../../../services/vefaAppService";
import { Skeleton } from "@mui/material";
import { debounce } from "lodash";
import html2canvas from "html2canvas";
const ImageLoader = React.lazy(() =>
  import("../../../components/common/imageLoader")
);

/**
 *
 * MultiBet - component use for multi bet.
 *
 * @param data - data comes from firebase.
 *
 */

const MultiBet = ({
  data,
  handleSelectOdd,
  handleAddToCollection,
  tipsCollection,
  isLoading,
}) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const [rangeValue, setRangeValue] = useState(5000);
  const [multiBet, setMultiBet] = useState([]);
  const [lockedItems, setLockedItems] = useState([]);
  const [isAlterSuggestion, setAlterSuggestion] = useState(false);
  const [isSkeleton, setSkeleton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const stack = process.env.REACT_APP_STACK;
  const contentRef = useRef(null);
  const footerRef = useRef();

  const fetchMultiBetData = async (value = 5000) => {
    try {
      setAlterSuggestion(true);
      let multiBetData = await multiBetAPI(stack, value);

      // Check if multiBetData.MultibetItems is iterable (not null and is an array)
      if (
        !multiBetData.MultibetItems ||
        !Array.isArray(multiBetData.MultibetItems)
      ) {
        multiBetData.MultibetItems = []; // Set it to an empty array if not iterable
      } else {
        const lockItem = lockedItems.map((i) => i.eventId);
        let multiBetFilterItem = multiBetData.MultibetItems.filter(
          (item) => !lockItem.includes(item.eventId)
        );
        multiBetData.MultibetItems = multiBetFilterItem;
      }
      setMultiBet(multiBetData);
    } catch (error) {
      console.error("Failed to fetch multiBet data:", error);
    } finally {
      setAlterSuggestion(false);
    }
  };

  useEffect(() => {
    // Get the count of items that are not excluded because of empty oddStatus
    const validItemsCount = multiBet?.MultibetItems?.reduce((count, item) => {
      const oddStatus = getCurrentOddStatus(item?.outcomeName, item?.line);
      return oddStatus !== undefined ? count + 1 : count;
    }, 0);

    // Disable the button if all valid items are locked
    setIsButtonDisabled(lockedItems.length === validItemsCount);
  }, [lockedItems, multiBet?.MultibetItems]);

  const handleAlterSuggestions = useCallback(async () => {
    if (lockedItems.length === 0) {
      fetchMultiBetData(rangeValue); // If no items are locked, call fetchMultiBetData
    } else {
      setSkeleton(true);
      const eventIds = lockedItems?.map((item) => item.eventId).join(",");
      const unlockedItems = multiBet.MultibetItems.filter(
        (item) => !eventIds.includes(item.eventId)
      );
      // Filter out the locked items from the received suggestion data
      const lockedItemsData = multiBet.MultibetItems?.filter((item) =>
        lockedItems.some((lockedItem) => lockedItem.eventId === item.eventId)
      );
      let allSuggestions = [...lockedItemsData]; // Define a new array to hold all the new suggestion items
      for (const unlockedItem of unlockedItems) {
        try {
          let multiBetAlterSuggestionData = await multiBetAlterSuggestionAPI(
            unlockedItem?.eventId,
            unlockedItem?.multiGroupId
          );
          // Check if multiBetAlterSuggestionData.MultibetItems is iterable
          if (
            multiBetAlterSuggestionData.MultibetItems &&
            Array.isArray(multiBetAlterSuggestionData.MultibetItems)
          ) {
            allSuggestions = [
              ...allSuggestions,
              ...multiBetAlterSuggestionData.MultibetItems,
            ]; // Add new items to allSuggestions
          }
        } catch (error) {
          console.error("Failed to fetch multiBet data:", error);
        }
      }
      // Remove duplicates based on eventId
      allSuggestions = allSuggestions.reduce((acc, current) => {
        const x = acc.find((item) => item.eventId === current.eventId);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      setMultiBet((prevState) => ({
        ...prevState,
        MultibetItems: allSuggestions,
      })); // Update the multiBet state with allSuggestions
      setSkeleton(false);
    }
  }, [lockedItems, multiBet]);

  const handleDownloadClick = () => {
    const content = contentRef.current;
    const footer = footerRef.current.cloneNode(true);

    // Temporarily append the footer to the content
    content.appendChild(footer);

    html2canvas(content, {
      onclone: function (document) {
        const lockSvgIcons = document.querySelectorAll(".lock_svg_icon");
        lockSvgIcons?.forEach((icon) => {
          const pngIcon = document.createElement("img");
          pngIcon.src = LockIconPng; // path to the rasterized lock icon
          pngIcon.alt = "Lock";
          pngIcon.style.marginRight = "40px"; // Add a margin to the right of the icon
          pngIcon.style.marginLeft = "30px"; // Add a margin to the left of the icon
          pngIcon.style.height = "13px"; // set the height of the PNG icon
          icon.parentNode.replaceChild(pngIcon, icon);
        });

        // Replace the SVG unlock icons with PNG icons
        const unlockSvgIcons = document.querySelectorAll(".unlock_svg_icon");
        unlockSvgIcons?.forEach((icon) => {
          const pngIcon = document.createElement("img");
          pngIcon.src = UnlockIconPng; // path to the rasterized unlock icon
          pngIcon.alt = "Unlock";
          pngIcon.style.marginRight = "40px"; // Add a margin to the right of the icon
          pngIcon.style.marginLeft = "30px"; // Add a margin to the left of the icon
          pngIcon.style.height = "13px"; // set the height of the PNG icon
          icon.parentNode.replaceChild(pngIcon, icon);
        });

        const clonedFooter = document.querySelector(".footer");
        clonedFooter.style.position = "relative";
        clonedFooter.style.visibility = "visible";
        clonedFooter.style.opacity = "1";
        clonedFooter.style.height = "auto";
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

  useEffect(() => {
    fetchMultiBetData();
  }, []);

  useEffect(() => {
    const updateRangeColor = () => {
      const rangeInput = document.getElementById("vol");
      const value =
        ((rangeInput.value - rangeInput.min) /
          (rangeInput.max - rangeInput.min)) *
        100;
      rangeInput.style.background = `linear-gradient(to right, #00CA6B 0%, #00CA6B ${value}%, #BDBDBD ${value}%, #BDBDBD 100%)`;
    };

    updateRangeColor();
  }, [rangeValue]);

  const debouncedFetchMultiBetData = debounce(fetchMultiBetData, 500);

  const handleRangeChange = useCallback((event) => {
    const value = event.target.value;
    const winningMoreValue = document.querySelector(".winning_more_value");
    if (winningMoreValue) {
      winningMoreValue.textContent = `${parseFloat(value)?.toFixed(3)}TL`;
    }
    setRangeValue(value);
    setLockedItems([]); // Clear the lockedItems state
    debouncedFetchMultiBetData(value); // Call the debounced version of fetchMultiBetData
  }, []);

  const handleAddToCollectionClick = useCallback(() => {
    const newItems = multiBet?.MultibetItems;
    handleAddToCollection(newItems);
  }, [handleAddToCollection, multiBet]);

  return (
    <div className="multi_bet_odds_container">
      <div className="multi_bet_odd_header">
        <h2>{settings.staticString.buildYourOwn}</h2>
        <div className="share_icon">
          <DownloadIcon onClick={handleDownloadClick} />
        </div>
      </div>
      <div className="range_container">
        <div className="winning_more">
          <p>{settings.staticString.winningMoreThan}</p>
          <p className="winning_more_value">
            {parseFloat(rangeValue)?.toFixed(3)}TL
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
            disabled={isAlterSuggestion || isSkeleton}
            onChange={handleRangeChange}
          />
        </div>
        <div className="multi_bet_button">
          <button
            onClick={handleAlterSuggestions}
            disabled={isButtonDisabled || isAlterSuggestion || isSkeleton}
          >
            {isAlterSuggestion || isSkeleton ? (
              <>
                <div className="loading_icon">
                  <LoadingIcon />
                </div>
              </>
            ) : (
              <>
                <SyncIcon />
              </>
            )}
          </button>
        </div>
      </div>
      <div ref={contentRef}>
        <div className="multi_bet_matches_content">
          {isLoading || isAlterSuggestion
            ? // Skeletons
              Array.from({ length: multiBet?.MultibetItems?.length || 5 }).map(
                (_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="multi_bet_match_item skeleton"
                    // style={{padding: "8px 20px 8px 90px"}}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <div style={{ flex: 1, width: "100%" }}>
                        <Skeleton variant="text" width={"100%"} height={20} />
                      </div>
                      <div
                        style={{ flex: 1, width: "100%", lineHeight: "22px" }}
                      >
                        <Skeleton variant="text" width={"100%"} height={20} />
                      </div>
                    </div>
                  </div>
                )
              )
            : multiBet?.MultibetItems &&
              multiBet?.MultibetItems?.map((item, index) => {
                const isLocked = lockedItems.some(
                  (elm) => elm.eventId === item?.eventId
                );

                const matchItem = data?.find(
                  (i) => i.eventId === item?.eventId
                );

                return (
                  <div
                    key={matchItem?.eventId || index}
                    className="multi_bet_match_item"
                  >
                    {isLocked ? (
                      <img
                        className="lock_svg_icon"
                        src={LockIconPng}
                        alt="Lock"
                        onClick={() => handleLockToggle(item)}
                        style={{
                          pointerEvents: isAlterSuggestion ? "none" : "auto",
                        }}
                      />
                    ) : (
                      <img
                        className="unlock_svg_icon"
                        src={UnlockIconPng}
                        alt="Unlock"
                        onClick={() => handleLockToggle(item)}
                        style={{
                          pointerEvents: isAlterSuggestion ? "none" : "auto",
                        }}
                      />
                    )}{" "}
                    <div className="left_content">
                      <div className="team_section">
                        <p>{item?.teamA}</p>
                        {(() => {
                          const teamALogo = item?.teamA_logo
                            ? item?.teamA_logo
                            : matchItem?.teamA_logo;

                          if (teamALogo) {
                            return (
                              <Suspense
                                fallback={
                                  <Skeleton
                                    variant="circular"
                                    width={60}
                                    height={60}
                                    style={{ height: "20px", width: "20px" }}
                                  />
                                }
                              >
                                <ImageLoader
                                  src={`${IMAGE_BASE_PATH}${teamALogo}`}
                                  alt="logo"
                                  shape="circular"
                                  className="image_loader_teamA"
                                  style={{ height: "20px", width: "20px" }}
                                />
                              </Suspense>
                            );
                          }

                          return <InformationIcon />;
                        })()}
                      </div>
                      <div className="team_section">
                        {(() => {
                          const teamBLogo = item?.teamB_logo
                            ? item?.teamB_logo
                            : matchItem?.teamB_logo;

                          if (teamBLogo) {
                            return (
                              <Suspense
                                fallback={
                                  <Skeleton
                                    variant="circular"
                                    width={60}
                                    height={60}
                                    style={{ height: "20px", width: "20px" }}
                                  />
                                }
                              >
                                <ImageLoader
                                  src={`${IMAGE_BASE_PATH}${teamBLogo}`}
                                  alt="logo"
                                  shape="circular"
                                  className="image_loader_teamB"
                                  style={{ height: "20px", width: "20px" }}
                                />
                              </Suspense>
                            );
                          }

                          return <InformationIcon />;
                        })()}
                        <p>{item?.teamB}</p>
                      </div>
                      <div className="text_content">
                        <p>
                          {item?.marketName}
                          <span>
                            {typeof item?.price === "string"
                              ? parseFloat(item?.price).toFixed(2)
                              : item?.price?.toFixed(2)}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="total_odds_details">
          <div className="total_odds">
            <p>{settings.staticString.totalOdds}:&nbsp;</p>
            {isLoading || isAlterSuggestion ? (
              // Skeleton for totalOdds
              <div className="total_wins_value skeleton">
                <Skeleton variant="text" width={50} height={28} />
              </div>
            ) : (
              // Actual content for totalOdds
              <p className="total_odds_value">
                {multiBet.TotalOdds ? multiBet.TotalOdds : 0}
              </p>
            )}
          </div>
          <div className="total_win">
            <p>{settings.staticString.totalWins}:&nbsp;</p>
            {isLoading || isAlterSuggestion ? (
              // Skeleton for totalWins
              <div className="total_wins_value skeleton">
                <Skeleton variant="text" width={70} />
              </div>
            ) : (
              // Actual content for totalWins
              <p className="total_wins_value">
                {isNaN(multiBet?.TotalOdds * stack)
                  ? 0
                  : (multiBet?.TotalOdds * stack)?.toFixed(2)}
                TL
              </p>
            )}
          </div>
        </div>
      </div>
      <div
        ref={footerRef}
        className="footer"
        style={{ visibility: "hidden", height: 0, opacity: 0, padding: "0px" }}
      >
        <ScreenShotFooter />
      </div>

      <div className="add_to_collection_button">
        <button
          onClick={handleAddToCollectionClick}
          // disabled={isButtonDisabled || isAlterSuggestion || isSkeleton}
        >
          <p className="plus_sign">+</p>
          <p className="add_to_collection_label">
            {settings.staticString.addToCollection}
          </p>
        </button>
      </div>
    </div>
  );
};

export default MultiBet;

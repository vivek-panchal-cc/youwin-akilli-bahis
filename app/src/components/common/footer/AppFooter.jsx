import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import homeIcon from "../../../assets/images/home.svg";
import logoIcon from "../../../assets/images/logo.svg";
import multiBetIcon from "../../../assets/images/multi_bet.svg";
import newsIcon from "../../../assets/images/news.svg";
import collectionIcon from "../../../assets/images/tip_collection.svg";
import tipCollectionTop from "../../../assets/images/tip_collection_top.svg";

import settings from "../../../misc";
import { ReducerContext } from "../../../context/ReducerContext";
import { setTipCollectionModalStatus } from "../../../feature/appAction";
import { AppContext } from "../../../context/AppContext";
/**
 *
 * AppFooter - common component use for show footer in layout.
 *
 */
const AppFooter = () => {
  const { dispatch, tipsCollection, isModalShow } = useContext(ReducerContext);
  const navigate = useNavigate();
  const location = useLocation();

  const getLocationItem = useCallback(() => {
    if (location.pathname.includes("free-tips")) return "freeTips";
    if (location.pathname.includes("multi-bet")) return "multiBet";
    if (location.pathname.includes("news")) return "news";
    // Add more cases if needed
    return "home";
  }, [location.pathname]);
  const [activeItem, setActiveItem] = useState(getLocationItem());

  const { fireBaseAllLeaguesDataBase } = useContext(AppContext);

  const handleItemClick = (item) => {
    setActiveItem(item);
    switch (item) {
      case "home":
        navigate("/");
        break;
      case "freeTips":
        handleFreeTips();
        break;
      case "multiBet":
        navigate("/multi-bet");
        break;
      case "news":
        navigate("/news");
        break;
      default:
        break;
    }
  };

  const handleShow = () => {
    setTipCollectionModalStatus(dispatch, true);
  };

  const handleFreeTips = () => {
    if (fireBaseAllLeaguesDataBase) {
      const firstKey = Object.keys(fireBaseAllLeaguesDataBase)?.[0];
      if (firstKey) {
        navigate(`/free-tips/${firstKey}`);
        setActiveItem("freeTips");
      } else {
        // Handle the case when fireBaseAllLeaguesDataBase is empty
        console.log("Data is empty. Unable to navigate.");
        // or
        navigate("/");
        // or
        return <div>Data is empty. Please try again later.</div>;
      }
    } else {
      // Handle the case when fireBaseAllLeaguesDataBase is undefined or null
      console.log("Data is undefined or null. Unable to navigate.");
      // or
      navigate("/");
      // or
      return <div>Data is not available. Please try again later.</div>;
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleNews = () => {
    navigate("/news");
  };

  const handleMultiBet = () => {
    navigate("/multi-bet");
  };

  // useEffect that listens for changes in location.pathname
  useEffect(() => {
    setActiveItem(getLocationItem());
  }, [location.pathname, getLocationItem]);

  useEffect(() => {
    const handleLinkClick = (event) => {
      event.preventDefault();
    };

    const links = document.querySelectorAll(".share_icons_line a");
    links?.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      links?.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, []);

  return (
    <div className="footer">
      <div
        className={`footer_item ${activeItem === "home" ? "active" : ""}`}
        onClick={() => handleItemClick("home")}
      >
        <img src={homeIcon} alt="homeLogo" onClick={goToHome} />
        <p>{settings.staticString.home}</p>
      </div>
      <div
        className={`footer_item ${activeItem === "freeTips" ? "active" : ""}`}
        onClick={() => handleItemClick("freeTips")}
      >
        <img src={logoIcon} alt="free tips" onClick={handleFreeTips} />
        <p>{settings.staticString.freeTips}</p>
      </div>
      <div
        className={`footer_item ${activeItem === "multiBet" ? "active" : ""}`}
        onClick={() => handleItemClick("multiBet")}
      >
        <img src={multiBetIcon} alt="multi bet" onClick={handleMultiBet} />
        <p>{settings.staticString.multiBet}</p>
      </div>
      <div
        className={`footer_item ${activeItem === "news" ? "active" : ""}`}
        onClick={() => handleItemClick("news")}
      >
        <img src={newsIcon} alt="news" onClick={handleNews} />
        <p>{settings.staticString.news}</p>
      </div>
      <div className="footer_item tip_collection">
        {tipsCollection?.length > 0 && (
          <div
            className="tip_collection_icon"
            onClick={() => {
              if (isModalShow) {
                setTipCollectionModalStatus(dispatch, false);
              } else {
                handleShow();
              }
            }}
          >
            <img
              src={isModalShow ? tipCollectionTop : collectionIcon}
              alt="collection"
            />
            <span>{tipsCollection?.length}</span>
          </div>
        )}
        <div>
          <p>{settings.staticString.poweredBy}</p>
          <p className="logo_footer">
            <span>you</span>win
          </p>
        </div>
      </div>
    </div>
  );
};

export default AppFooter;

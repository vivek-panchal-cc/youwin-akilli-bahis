import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/images/logo.svg";
import images from "../../../constants/allAssets";

/**
 *
 * AppHeader - common component use for show header in layout.
 *
 */

const AppHeader = () => {
  const [showHomeImage, setShowHomeImage] = useState(true);

  const toggleImage = () => {
    setShowHomeImage((prev) => !prev);
  };

  return (
    <div className="header">
      <div className="logo_container">
        <Link to="/">
          <div className="logo_img">
            <img src={logoImg} alt="main logo" />
          </div>
        </Link>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h4>AKILLI BAHIS</h4>
        </Link>
      </div>
      <div className="header_lang_change">
        <img
          src={showHomeImage ? images.defaultHome : images.defaultAway}
          alt={showHomeImage ? "tr" : "en"}
          onClick={toggleImage}
        />
      </div>
    </div>
  );
};

export default AppHeader;

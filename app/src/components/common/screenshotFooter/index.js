import React from "react";
import logoImg from "../../../assets/images/logo.svg";
import settings from "../../../misc";

/**
 *
 * AppHeader - common component use for show header in layout.
 *
 */

const ScreenShotFooter = () => {
  return (
    <div className="screenshot">
      <div className="header">
        <div className="logo_img">
          <img src={logoImg} alt="main logo" />
        </div>
        <h4>AKILLI BAHIS</h4>
      </div>
      <div className="screenshot_logo">
        <p>{settings.staticString.poweredBy}</p>
        <p className="logo_footer">
          <span>you</span>win
        </p>
      </div>
    </div>
  );
};

export default ScreenShotFooter;

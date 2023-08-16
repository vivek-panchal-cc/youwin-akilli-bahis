import React from "react";
import logoImg from "../../../assets/images/logo.svg";
import useCurrentLanguage from "../../../misc";

/**
 *
 * AppHeader - common component use for show header in layout.
 *
 */

const ScreenShotFooter = () => {
  const settings = useCurrentLanguage()
  return (
    <div className="screenshot">
      <div className="header">
        <div className="logo_img">
          <img src={logoImg} alt="main logo" />
        </div>
        <h4>AKILLI BAHIS</h4>
      </div>
      <div className="screenshot_logo">
        <p className="logo_footer">
          <span>you</span>win 'in
        </p>
        <p>{settings.staticString.katkılarıyla}</p>
      </div>
    </div>
  );
};

export default ScreenShotFooter;

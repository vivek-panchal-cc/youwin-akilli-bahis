import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/images/logo.svg";

/**
 *
 * AppHeader - common component use for show header in layout.
 *
 */

const AppHeader = () => {
  return (
    <div className="header">
      <Link to="/">
        <div className="logo_img">
          <img src={logoImg} alt="main logo" />
        </div>
      </Link>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h4>AKILLI BAHIS</h4>
      </Link>
    </div>
  );
};

export default AppHeader;

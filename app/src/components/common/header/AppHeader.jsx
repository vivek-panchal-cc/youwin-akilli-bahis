import React, { Suspense, useContext } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../../assets/images/logo.svg";
import images from "../../../constants/allAssets";
import { AppContext } from "../../../context/AppContext";
import { Skeleton } from "@mui/material";
const ImageLoader = React.lazy(() =>
  import("../../../components/common/imageLoader")
);

/**
 *
 * AppHeader - common component use for show header in layout.
 *
 */

const AppHeader = () => {
  const { language, setLanguage } = useContext(AppContext);
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "tr" ? "en" : "tr"));
  };

  const nextFlag = language === "tr" ? images.enFlag : images.trFlag;

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
        <Suspense
          fallback={
            <Skeleton
              width={60}
              height={60}
              style={{
                height: "17px",
                width: "19px",
                backgroundColor: "darkgray",
              }}
            />
          }
        >
          <ImageLoader
            src={nextFlag}
            alt={language === "tr" ? "en" : "tr"}
            style={{
              height: "17px",
              width: "19px",
              backgroundColor: "darkgray",
            }}
            onClick={toggleLanguage}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default AppHeader;

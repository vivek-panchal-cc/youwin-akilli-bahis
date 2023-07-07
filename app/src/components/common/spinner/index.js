import React from "react";

const Spinner = ({ show = true }) => {
  return (
    <div
      id="main-spinner"
      style={{
        display: `${show ? "block" : "none"}`,
      }}
      className="spb-spinner"
    >
      <div
        className="spb-spinner__shadow spb-spinner__shadow--fixed"
        data-scrollable=""
      ></div>
      <svg
        className="spb-spinner__icon spb-spinner__icon--fixed"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 150 150"
        style={{ enableBackground: "new 0 0 150 150" }}
        space="preserve"
      >
        <style type="text/css">
          {`
            .st0{fill:#F5F5F5;}
        `}
        </style>
        <path
          className="st0"
          d="M75,38.9c19.9,0,36.1,16.2,36.1,36.1S94.9,111.1,75,111.1S38.9,94.9,38.9,75S55.1,38.9,75,38.9 M75,24.7
                c-27.8,0-50.3,22.5-50.3,50.3s22.5,50.3,50.3,50.3s50.3-22.5,50.3-50.3S102.8,24.7,75,24.7L75,24.7z"
        ></path>
        <path
          className="st1 spinner-first-line"
          d="M75,38.9V24.7c-27.8,0-50.3,22.5-50.3,50.3h14.2C38.9,55.1,55.1,38.9,75,38.9z"
        ></path>
      </svg>
    </div>
  );
};

export default Spinner;

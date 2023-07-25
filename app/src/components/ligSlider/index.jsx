import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  getDateWithOrdinalSuffix,
  getFormattedTime,
} from "../../utils/dateFormat";
import Skeleton from "react-loading-skeleton";
import { getCurrentOddStatus } from "../../services/vefaAppService";
import settings from "../../misc";

/**
 *
 * LigSlider - common component use for show lig slider.
 *
 */

const LigSlider = ({ data, handleSelectLig, tipsCollection, isLoading }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;

  // Define the custom order of odd item statuses
  const order = ["home", "draw", "away"];

  return (
    <div className="lig_slider">
      <Swiper
        spaceBetween={10}
        className={`${data?.length === 1 ? "lig_slider_one" : ""}`}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          375: {
            slidesPerView: 1.3,
            spaceBetween: 10,
          },
          568: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
      >
        {isLoading
          ? // Render skeleton loading elements when isLoading is true
          Array.from({ length: 3 }).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="lig_slider_item loading">
                <Skeleton height={100} />                
              </div>
            </SwiperSlide>
            ))
            // Render the actual data when isLoading is false
          : data?.map((elm) => {
              const matchedItem = tipsCollection?.filter(
                (item) => item.eventId === elm?.eventId
              );

              const oddsValue = elm?.odds ? Object.values(elm.odds) : [];
              const oddsKeys = elm?.odds ? Object.keys(elm.odds) : [];

              return (
                <SwiperSlide key={elm?.eventId}>
                  <div
                    className="lig_slider_item"
                    style={{ backgroundColor: "#37003E", backgroundImage:`url(${IMAGE_BASE_PATH}/uploading_23_07_06/soccer_ball_variant_1688634810196.png)`}}
                  >
                    <div className="live"><p>{settings.staticString.live}</p></div>
                    <p className="title">
                      {elm?.groupName ? elm?.groupName : <>&nbsp;</>}
                    </p>
                    <div className="team_section">
                      <div className="team_content">
                        <img
                          src={`${IMAGE_BASE_PATH}${elm?.teamA_logo}`}
                          alt="team-logo"
                        />
                        <p>{elm?.teamA}</p>
                      </div>
                      <div className="team_time">
                        <p>{getDateWithOrdinalSuffix(elm?.kickOffTime)}</p>
                        <p>{getFormattedTime(elm?.kickOffTime)}</p>
                      </div>
                      {/* <div className='team_score'>
                                    <h2>0 : 1</h2>
                                    <p>89"</p>
                                </div> */}
                      <div className="team_content">
                        <img
                          src={`${IMAGE_BASE_PATH}${elm?.teamB_logo}`}
                          alt="team-logo"
                        />
                        <p>{elm?.teamB}</p>
                      </div>
                    </div>
                    <div className="win_title">
                      <p>Match Winner</p>
                    </div>

                    <div className={`odd_items ${elm?.odds ? "multiple" : ""}`}>
                      {/* NOTE - 'multiple' class add when odd_item is more than one */}
                      {elm?.odds ? (
                        order?.map((status) => {
                          const oddIndex = oddsKeys.indexOf(status);
                          const odd = oddsValue[oddIndex];

                          return (
                            <div
                              key={odd?.selectionId}
                              className={`odd_item ${
                                matchedItem[0]?.selectionId === odd?.selectionId
                                  ? "selected"
                                  : ""
                              }`}
                              onClick={() =>
                                handleSelectLig({
                                  ...elm,
                                  ...odd,
                                  name_en: oddsKeys[oddIndex],
                                })
                              }
                            >
                              {/* NOTE - add 'selected' class when odd_item is select */}
                              <p>{getCurrentOddStatus(oddsKeys[oddIndex])}</p>
                              {typeof odd?.odds_decimal === "string" ? (
                                <p>
                                  {parseFloat(odd?.odds_decimal)?.toFixed(2)}
                                </p>
                              ) : (
                                <p>{odd?.odds_decimal?.toFixed(2)}</p>
                              )}
                            </div>
                          );
                        })
                      ) : (
                        <div
                          className={`odd_item ${
                            matchedItem.length > 0 ? "selected" : ""
                          }`}
                          onClick={() => handleSelectLig(elm)}
                        >
                          {/* NOTE - add 'selected' class when odd_item is select */}
                          <p>{elm?.title}</p>
                          {typeof elm?.odds_decimal === "string" ? (
                            <p>{parseFloat(elm?.odds_decimal)?.toFixed(2)}</p>
                          ) : (
                            <p>{elm?.odds_decimal?.toFixed(2)}</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
};

export default LigSlider;

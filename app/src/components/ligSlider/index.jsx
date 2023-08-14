import React, { Suspense } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Skeleton from "react-loading-skeleton";
import { getCurrentOddStatus } from "../../services/vefaAppService";
import settings from "../../misc";
import images from "../../constants/allAssets";

const ImageLoader = React.lazy(() => import("../common/imageLoader"));

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
        style={data === null ? { marginBottom: "0", display: "none" } : {}}
        slidesPerView={1}
        breakpoints={{
          300: {
            slidesPerView: 1.1,
            spaceBetween: 10,
          },
          375: {
            slidesPerView: 1.1,
            spaceBetween: 10,
          },
          568: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.3,
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
          : // Render the actual data when isLoading is false
            data?.map((elm, i) => {
              const matchedItem = tipsCollection?.filter(
                (item) => item.eventId === elm?.eventId
              );

              const oddsValue = elm?.odds ? Object.values(elm.odds) : [];
              const oddsKeys = elm?.odds ? Object.keys(elm.odds) : [];

              return (
                <SwiperSlide key={elm?.eventId}>
                  <div
                    className="lig_slider_item"
                    style={{
                      backgroundColor: "#37003E",
                      backgroundImage: `url(${images.ligSliderBackgroundImage})`,
                    }}
                  >
                    <div className="live">
                      <p>{settings.staticString.live}</p>
                    </div>
                    <p className="title">
                      {elm?.competitionName ? (
                        elm?.competitionName
                      ) : (
                        <>&nbsp;</>
                      )}
                    </p>
                    <div className="team_section">
                      <div className="team_content">
                        <Suspense
                          fallback={
                            <Skeleton
                              variant="rectangular"
                              width={60}
                              height={60}
                              style={{
                                height: "53px",
                                width: "53px",
                                backgroundColor: "darkgray",
                                margin: "auto",
                                marginBottom: "5px",
                                borderRadius: "4px",
                              }}
                            />
                          }
                        >
                          <ImageLoader
                            src={`${IMAGE_BASE_PATH}${elm?.teamA_logo}`}
                            alt="team-logo"
                            className="image_loader_teamA"
                            style={{
                              height: "53px",
                              width: "53px",
                              backgroundColor: "darkgray",
                              margin: "auto",
                              marginBottom: "5px",
                              borderRadius: "4px",
                            }}
                          />
                        </Suspense>
                        <p>{elm?.teamA}</p>
                      </div>
                      {/* <div className="team_time">
                        <p>{getDateWithOrdinalSuffix(elm?.kickOffTime)}</p>
                        <p>{getFormattedTime(elm?.kickOffTime)}</p>
                      </div> */}
                      <div className="team_score">
                        <h2>{`${elm?.liveData?.currentScore[0]}:${elm?.liveData?.currentScore[1]}`}</h2>
                        <p>{elm?.liveData?.clock}</p>
                      </div>
                      <div className="team_content">
                        <Suspense
                          fallback={
                            <Skeleton
                              variant="rectangular"
                              width={60}
                              height={60}
                              style={{
                                height: "53px",
                                width: "53px",
                                backgroundColor: "darkgray",
                                margin: "auto",
                                marginBottom: "5px",
                                borderRadius: "4px",
                              }}
                            />
                          }
                        >
                          <ImageLoader
                            src={`${IMAGE_BASE_PATH}${elm?.teamB_logo}`}
                            alt="team-logo"
                            className="image_loader_teamB"
                            style={{
                              height: "53px",
                              width: "53px",
                              backgroundColor: "darkgray",
                              margin: "auto",
                              marginBottom: "5px",
                              borderRadius: "4px",
                            }}
                          />
                        </Suspense>
                        <p>{elm?.teamB}</p>
                      </div>
                    </div>
                    {/* <div className="win_title">
                      <p>{settings.staticString.matchWinner}</p>
                    </div> */}

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

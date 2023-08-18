import React, { Suspense, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import images from "../../../constants/allAssets";
import logoImg from "../../../assets/images/logo.svg";
import Skeleton from "react-loading-skeleton";
import { AppContext } from "../../../context/AppContext";
import { getFormattedTime, getOrdinalDay } from "../../../utils/dateFormat";
import useCurrentLanguage from "../../../misc";
const ImageLoader = React.lazy(() =>
  import("../../../components/common/imageLoader")
);

/**
 *
 * TeaserSlider - component use for show slider in home page.
 *
 * @param data - data comes from firebase.
 *
 */

const TeaserSlider = ({ data, handleSelectTeaser, isLoading }) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  const { fireBaseHomePageTeaserSliderDataBase } = useContext(AppContext);
  const settings = useCurrentLanguage();

  return (
    <div className="first_slider">
      <Swiper
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          568: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
      >
        {isLoading
          ? // Render skeleton loading elements when isLoading is true
            Array.from({ length: 3 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="first_slider_item loading">
                  <Skeleton height={100} />
                </div>
              </SwiperSlide>
            ))
          : // Render the actual data when isLoading is false
            data?.length > 0 &&
            data?.map((item) => {
              const matchedLeagueData =
                fireBaseHomePageTeaserSliderDataBase[item?.groupId];
              const logoImageUrl =
                fireBaseHomePageTeaserSliderDataBase[item?.groupId]?.image;
              const logoImage = logoImageUrl?.slice(
                logoImageUrl?.lastIndexOf("external") + 8,
                logoImageUrl?.length
              );
              return (
                <SwiperSlide key={item?.eventId}>
                  <div className="first_slider_item">
                    {matchedLeagueData && (
                      <div
                        className="slider_strip"
                        style={{
                          background: matchedLeagueData
                            ? matchedLeagueData.color
                            : "#5D5858",
                        }}
                      >
                        {matchedLeagueData && (
                          <img
                            src={`${IMAGE_BASE_PATH}${logoImage}`}
                            alt="league logo"
                            className="league_logo"
                          />
                        )}
                      </div>
                    )}
                    <div
                      className="slider_content"
                      style={{
                        background: `url(${images.firstSliderBackgroundImg})`,
                      }}
                    >
                      <div className="top_section">
                        <div className="logo_section">
                          <img src={logoImg} alt="logo" />
                          <span>{settings.staticString.akilliBahis}</span>
                        </div>
                        <h5>
                          {getOrdinalDay(item?.kickOffTime)} at{" "}
                          {getFormattedTime(item?.kickOffTime)}
                        </h5>

                        {!matchedLeagueData && <p>{item?.parentgroupName}</p>}
                      </div>
                      <div className="team_section">
                        <div>
                          <h5>{item?.teamA}</h5>
                          <Suspense
                            fallback={
                              <Skeleton
                                variant="circular"
                                width={60}
                                height={60}
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  backgroundColor: "darkgray",
                                }}
                              />
                            }
                          >
                            <ImageLoader
                              src={`${IMAGE_BASE_PATH}${item?.teamA_logo}`}
                              alt="logo"
                              shape="circular"
                              className="image_loader_teamA"
                              style={{
                                height: "20px",
                                width: "20px",
                                backgroundColor: "darkgray",
                              }}
                            />
                          </Suspense>
                        </div>
                        <div>
                          <Suspense
                            fallback={
                              <Skeleton
                                variant="circular"
                                width={60}
                                height={60}
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  backgroundColor: "darkgray",
                                }}
                              />
                            }
                          >
                            <ImageLoader
                              src={`${IMAGE_BASE_PATH}${item?.teamB_logo}`}
                              alt="team logo"
                              shape="circular"
                              className="image_loader_teamB"
                              style={{
                                height: "20px",
                                width: "20px",
                                backgroundColor: "darkgray",
                              }}
                            />
                          </Suspense>
                          <h5>{item?.teamB}</h5>
                        </div>
                      </div>
                      <div className="dec">
                        <p>{item?.stats}</p>
                      </div>
                      <div
                        className="odds_section"
                        onClick={() => handleSelectTeaser(item)}
                      >
                        <p>{item?.name}</p>
                        <h5>{item?.odds_decimal}</h5>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </div>
  );
};

export default TeaserSlider;

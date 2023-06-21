import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { getDateWithOrdinalSuffix, getFormattedTime } from '../../utils/dateFormat';

/**
 * 
 * LigSlider - common component use for show lig slider.
 * 
 */


const LigSlider = ({ data }) => {
    const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;

    return (
        <div className='lig_slider'>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    568: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    }
                }}
            >
                {data?.map((elm) => (
                    <SwiperSlide key={elm?.eventId}>
                        <div className='lig_slider_item' style={{ backgroundColor: "#37003E" }}>
                            <p className='title'>{elm?.groupName}</p>
                            <div className='team_section'>
                                <div className='team_content'>
                                    <img src={`${IMAGE_BASE_PATH}${elm?.teamA_logo}`} alt='team-logo' />
                                    <p>{elm?.teamA}</p>
                                </div>
                                <div className='team_time'>
                                    <p>{getDateWithOrdinalSuffix(elm?.kickOffTime)}</p>
                                    <p>{getFormattedTime(elm?.kickOffTime)}</p>
                                </div>
                                {/* <div className='team_score'>
                                    <h2>0 : 1</h2>
                                    <p>89"</p>
                                </div> */}
                                <div className='team_content'>
                                    <img src={`${IMAGE_BASE_PATH}${elm?.teamB_logo}`} alt='team-logo' />
                                    <p>{elm?.teamB}</p>
                                </div>
                            </div>
                            <div className='win_title'>
                                <p>Match Winner</p>
                            </div>
                            <div className='odd_items'>
                                {/* NOTE - 'multiple' class add when odd_item is more than one */}
                                <div className='odd_item'>
                                    {/* NOTE - add 'selected' class when odd_item is select */}
                                    <p>{elm?.title}</p>
                                    <p>{elm?.odds_decimal}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default LigSlider
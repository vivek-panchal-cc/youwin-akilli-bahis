import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { getDateWithOrdinalSuffix, getFormattedTime } from '../../utils/dateFormat';

/**
 * 
 * LigSlider - common component use for show lig slider.
 * 
 */


const LigSlider = ({ data, handleSelectLig, tipsCollection }) => {
    const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;

    const getCurrentOddStatus  = (title, line) => {
        const oddName = title?.toLowerCase();
        if(oddName === "home"){
          return "1"
        }else if(oddName === "away"){
          return "2"
        }else if(oddName === "draw"){
          return "X"
        }
        else if(oddName === "under"){
          return `U +${line}`
        }else if(oddName === "over"){
          return `A -${line}`
        }else {
          return ""
        }
    }

    return (
        <div className='lig_slider'>
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                    300: {
                        slidesPerView: 1.2,
                        spaceBetween: 10
                    },
                    375: {
                        slidesPerView: 1.3,
                        spaceBetween: 10
                    },
                    568: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    768:{
                        slidesPerView: 3,
                        spaceBetween: 10
                    }
                }}
            >
                {data?.map((elm) => {
                    const matchedItem = tipsCollection?.filter(item => item.eventId === elm?.eventId)

                    const oddsValue = elm?.odds ? Object.values(elm.odds) : []; 
                    const oddsKeys = elm?.odds ? Object.keys(elm.odds) : [];

                    return (
                    <SwiperSlide key={elm?.eventId}>
                        <div className='lig_slider_item' style={{ backgroundColor: "#37003E" }}>
                            <p className='title'>{elm?.groupName ? elm?.groupName : <>&nbsp;</>}</p>
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
                            
                            <div className={`odd_items ${elm?.odds ? 'multiple': ''}`}>
                                {/* NOTE - 'multiple' class add when odd_item is more than one */}
                               {elm?.odds ? 
                               oddsValue?.map((odd, index) => (
                                    <div className={`odd_item ${matchedItem[0]?.selectionId === odd.selectionId  ? 'selected' : ''}`} onClick={() => handleSelectLig({...elm, ...odd})}>
                                        {/* NOTE - add 'selected' class when odd_item is select */}
                                        <p>{getCurrentOddStatus(oddsKeys[index])}</p>
                                        <p>{odd?.odds_decimal}</p>
                                    </div>
                               ))
                               
                               :
                               <div className={`odd_item ${matchedItem.length > 0 ? 'selected' : ''}`} onClick={() => handleSelectLig(elm)}>
                                    {/* NOTE - add 'selected' class when odd_item is select */}
                                    <p>{elm?.title}</p>
                                    <p>{elm?.odds_decimal}</p>
                                </div>}
                            </div>
                        </div>
                    </SwiperSlide>
                )})}
            </Swiper>
        </div>
    )
}

export default LigSlider
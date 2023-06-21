import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import images from '../../../constants/allAssets';

/**
 * 
 * TeaserSlider - component use for show slider in home page.
 *  
 * @param data - data comes from firebase.
 * 
 */

const TeaserSlider = ({data, handleSelectTeaser}) => {
  const IMAGE_BASE_PATH = process.env.REACT_APP_IMAGE_BASE_PATH;
  return (
    <div className='first_slider'>
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            568:{
              slidesPerView: 2,
              spaceBetween: 10
            }
          }}
          >
         {data?.length > 0 && data?.map((item) => (
            <SwiperSlide key={item?.eventId}>
            <div className='first_slider_item'>
              <div className='slider_strip' style={{background:"#5D5858"}}>
                <p>
                  title
                </p>
              </div>
              <div className='slider_content' style={{background: `url(${images.firstSliderBackgroundImg})`}}>
                <div className='top_section'>
                  <img src={images.redLogoImage} alt='logo'/>
                  <h5>{item?.kickOffTime}</h5>
                  <p>{item?.eventName}</p>
                </div>
                <div className='team_section'>
                  <div>
                    <h5>{item?.teamA}</h5>
                    <img src={`${IMAGE_BASE_PATH}${item?.teamA_logo}`} alt='test logo' />
                  </div>
                  <div>
                    <img src={`${IMAGE_BASE_PATH}${item?.teamB_logo}`} alt='team logo'/>
                    <h5>{item?.teamB}</h5>
                  </div>
                </div>
                <div className='dec'>
                  <p>{item?.stats}</p>
                </div>
                <div className='odds_section' onClick={()=> handleSelectTeaser(item)}>
                  <p>{item?.title}</p>
                  <h5>{item?.odds_decimal}</h5>
                </div>
              </div>
            </div>
          </SwiperSlide>
         ))}
        </Swiper>
      </div>
  )
}

export default TeaserSlider
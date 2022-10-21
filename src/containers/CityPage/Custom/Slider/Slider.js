import React from 'react'
import './Slider.css';
import './SliderCard.css';
import { Swiper, SwiperSlide } from "swiper/react";

import './CustomSlider.css';

// Import Swiper styles

import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import 'swiper/modules/navigation/navigation.min.css'

// import required modules
import { Pagination, Navigation } from "swiper";
import SliderCart from './SliderCart';


const Slider = ({data}) => {
  return (
    <div className="famous-city-slider">
        <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              pagination={{
                clickable: true,
              }}
             loopFillGroupWithBlank={true}
             navigation={true}
             modules={[Pagination, Navigation]}
             className="mySwiper"
             breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 5,
                  spaceBetween: 0,
                },
              }}
            >
                {
                    data?.map((cityData, index) =>
                    <SwiperSlide key={index}>
                        <SliderCart key={index} data={cityData}></SliderCart>
                    </SwiperSlide>)
                }
            </Swiper>
    </div>
  )
}

export default Slider

import React, { Component } from 'react'
import './SearchByPurpose.css'
import docIcon from "../image/img/doc.svg";
import image from "../city-demo.png";
import btnIcon from "../image/img/btn-icon.svg";
import hatIcon from "../image/img/search-hat.svg";
import locationIcon from "../image/img/tile-location.svg";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import globalIcon from "../image/img/global.svg";
import searchArrowIcon from "../image/img/search-arrow.svg";
import flagIcon from "../image/img/flag.svg";

export default class SearchByPurpose extends Component {
  render() {
    return (

      <div className="common-section search-purpose-section">
        <div className="main-container global-area">
          <div className="text-with-image"><img src={flagIcon} alt="Flag" />目的からさがす</div>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
            <SwiperSlide className='search-card'>
              <div className="search-cardHeader">
                <img src={image} alt="City name" />
                <div className="search-cardBody">
                  <span className="location">
                    <img src={locationIcon} alt="Location" /> Short Term
                  </span>
                  <div className="content">
                    <span className="location-name">2ヵ国留学</span>
                    <img className='common-icon-btn' src={searchArrowIcon} alt="Blue arrow" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='search-card'>
              <div className="search-cardHeader">
                <img src={image} alt="City name" />
                <div className="search-cardBody">
                  <span className="location">
                    <img src={locationIcon} alt="Location" /> Short Term
                  </span>
                  <div className="content">
                    <span className="location-name">2ヵ国留学</span>
                    <img className='common-icon-btn' src={searchArrowIcon} alt="Blue arrow" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='search-card'>
              <div className="search-cardHeader">
                <img src={image} alt="City name" />
                <div className="search-cardBody">
                  <span className="location">
                    <img src={locationIcon} alt="Location" /> Short Term
                  </span>
                  <div className="content">
                    <span className="location-name">2ヵ国留学</span>
                    <img className='common-icon-btn' src={searchArrowIcon} alt="Blue arrow" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='search-card'>
              <div className="search-cardHeader">
                <img src={image} alt="City name" />
                <div className="search-cardBody">
                  <span className="location">
                    <img src={locationIcon} alt="Location" /> Short Term
                  </span>
                  <div className="content">
                    <span className="location-name">2ヵ国留学</span>
                    <img className='common-icon-btn' src={searchArrowIcon} alt="Blue arrow" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='search-card'>
              <div className="search-cardHeader">
                <img src={image} alt="City name" />
                <div className="search-cardBody">
                  <span className="location">
                    <img src={locationIcon} alt="Location" /> Short Term
                  </span>
                  <div className="content">
                    <span className="location-name">2ヵ国留学</span>
                    <img className='common-icon-btn' src={searchArrowIcon} alt="Blue arrow" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='search-card'>
              <div className="search-cardHeader">
                <img src={image} alt="City name" />
                <div className="search-cardBody">
                  <span className="location">
                    <img src={locationIcon} alt="Location" /> Short Term
                  </span>
                  <div className="content">
                    <span className="location-name">2ヵ国留学</span>
                    <img className='common-icon-btn' src={searchArrowIcon} alt="Blue arrow" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='search-card'>
              <div className="search-cardHeader">
                <img src={image} alt="City name" />
                <div className="search-cardBody">
                  <span className="location">
                    <img src={locationIcon} alt="Location" /> Short Term
                  </span>
                  <div className="content">
                    <span className="location-name">2ヵ国留学</span>
                    <img className='common-icon-btn' src={searchArrowIcon} alt="Blue arrow" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='search-card'>
              <div className="search-cardHeader">
                <img src={image} alt="City name" />
                <div className="search-cardBody">
                  <span className="location">
                    <img src={locationIcon} alt="Location" /> Short Term
                  </span>
                  <div className="content">
                    <span className="location-name">2ヵ国留学</span>
                    <img className='common-icon-btn' src={searchArrowIcon} alt="Blue arrow" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide className='search-card'>
              <div className="search-cardHeader">
                <img src={image} alt="City name" />
                <div className="search-cardBody">
                  <span className="location">
                    <img src={locationIcon} alt="Location" /> Short Term
                  </span>
                  <div className="content">
                    <span className="location-name">2ヵ国留学</span>
                    <img className='common-icon-btn' src={searchArrowIcon} alt="Blue arrow" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

    )
  }
}

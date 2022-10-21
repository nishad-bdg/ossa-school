import React, { Component } from 'react'
import './SearchByCountry.css'
import docIcon from "../image/img/doc.svg";
import image from "../city-demo.png";
import btnIcon from "../image/img/btn-icon.svg";
import hatIcon from "../image/img/search-hat.svg";
import locationIcon from "../image/img/tile-location.svg";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import globalIcon from "../image/img/global.svg";
import searchArrowIcon from "../image/img/search-arrow.svg";
import country_data from '../../../json_data/country.json'

export default class SearchByCountry extends Component {
  render() {
    return (

      <div className="common-section search-country-section">
        <div className="main-container global-area">
          <div className="text-with-image"><img src={globalIcon} alt="Global" />国からさがす</div>
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

            {country_data.map(country => (
                <SwiperSlide className='search-card'>
                  <div className="search-cardHeader">
                    <a href={'country/'+country.country_code}>
                      <img src={require(`../../../images/country/${country.country_code}.jpg`).default} alt={country.country_name_en} />
                      <div className="search-cardBody">
                        <span className="location">
                          <img src={locationIcon} alt="Location" /> {country.country_code}
                        </span>
                        <div className="content">
                          <span className="location-name">{country.country_name_en}</span>
                          <img className='common-icon-btn' src={searchArrowIcon} alt={country.country_name_en} />
                        </div>
                      </div>
                    </a>
                  </div>
                </SwiperSlide>
            ))};
          </Swiper>
        </div>
      </div>

    )
  }
}

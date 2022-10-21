import React, { Component } from 'react'
import './SearchSection.css'
import docIcon from "../image/img/doc.svg";
import image from "../city-demo.png";
import btnIcon from "../image/img/btn-icon.svg";
import hatIcon from "../image/img/search-hat.svg";
import locationIcon from "../image/img/tile-location.svg";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import { injectIntl, intlShape, FormattedMessage } from '../../../util/reactIntl';

export class SearchSection extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
	const {
	  intl,
      schoolData,
	  conversionRate
    } = this.props;
	
    return (

      <div className="common-section search-section">
        <h1 className='common-title'>Search</h1>
        <p className='common-sub-title'>留学先をさがす</p>

        <div className="main-container search-area">
          <div className="text-with-image"><img src={hatIcon} alt="Hat" />いまおすすめの語学学校</div>
		  { 
		  (schoolData.length > 0)?(
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
                slidesPerView: 6,
                spaceBetween: 48,
              },
            }}
            modules={[Navigation]}
            className="mySwiper"
          >
		  {
			  schoolData.length > 0 && schoolData.map((slideLanguage, indexCampain) => {
				  
			  const city = slideLanguage.attributes.profile.publicData.city;
			  const cityName = intl.formatMessage({ id: city });

			  let countryName = '';
			  if(typeof slideLanguage.attributes.profile.publicData.country != 'undefined'){
				  const country = slideLanguage.attributes.profile.publicData.country;
				  countryName = intl.formatMessage({ id: country });
			  }
			  
			  let schoolImage = require(`../../../json_data/school_thumb/school1.jpg`).default;
			  if(typeof slideLanguage.attributes.profile.publicData.schoolPhotos != 'undefined'){
				  if(typeof slideLanguage.attributes.profile.publicData.schoolPhotos.images != 'undefined'){
					 schoolImage = JSON.parse(slideLanguage.attributes.profile.publicData.schoolPhotos.images)[0]['attributes']['variants']['default']['url'];
				  }
			  }
			  
			  let price = '';
				  if(typeof slideLanguage.attributes.profile.publicData.price != 'undefined'){
					 price = slideLanguage.attributes.profile.publicData.price.amount;
					 price = price * conversionRate;
					 price = new Intl.NumberFormat("en", {
						currency: "JPY"
					}).format(price);
				  }
			  return (
				<SwiperSlide className="search-card">
				  <a href={'/u/'+slideLanguage.id.uuid} className="lang-card">
					  <div className="search-cardHeader">
						<img src={schoolImage} alt="City name" />
						<div className="search-cardBody">
						  <span className="location">
							<img src={locationIcon} alt="Location" /> { cityName } { (countryName) && ', '+countryName }
						  </span>
						  <span className="location-name">{ slideLanguage.attributes.profile.publicData.schoolName }</span>
						  <span className="price">{ price } 円〜</span>
						</div>
					  </div>
				  </a>
				</SwiperSlide>
				)
			  })
		  }

          </Swiper>
		  ):('')
		  }
        </div>
      </div>

    )
  }
}

SearchSection.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(SearchSection);
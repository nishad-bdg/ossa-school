import PropTypes, {array} from 'prop-types';
import {intlShape, injectIntl, FormattedMessage} from '../../util/reactIntl';
import rating from '../../images/rating.svg';
import { faMapMarker, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import btnIcon from "./img/btn-icon.svg";
import { richText } from '../../util/richText';
import { getConversionRate } from '../../util/currency.js';
import currency from "./img/currency.svg";
// external
import css from './SectionLanguageSchool.module.css';
import './SectionLanguageSchool.css'
import React, {useEffect, useState} from 'react';
import IconLocation from "../IconLocation/IconLocation";

const SectionLanguageSchool = props => {
  const { intl, schoolData, country_code, seeMoreHandleClick, isShowMore } = props;
  const [schoolDataMap, setSchoolData] = React.useState([]);
  const [allSchoolData, setAllSchoolData] = React.useState([]);
  const title = intl.formatMessage({ id: 'SectionLanguageSchool.title' });
  const seeMore = intl.formatMessage({ id: 'SectionLanguageSchool.seeMore' });
  const [conversionRate, setConversionRate] = useState(0);
	
  const currencyText = intl.formatMessage({ id: 'SectionLanguageSchool.Price.Currency' });


  useEffect(()=>{
	  getConversionRate("../conversion_rate.json", (err, conversion) => {
		  if (err) {return;}
		  setConversionRate(conversion.current_date)
	  });
      loadUsers();
  }, [schoolData]);

  const loadUsers = () => {
    if(schoolData.length > 0){
      setSchoolData(schoolData);
    }
  };

  return (
    <div className='sectionLanguageSchool padding50'>
      <div className="container-fluid main-mobile-padding">
	  {
        schoolDataMap.length > 0?(
        <div className="mainPart">
          {
            schoolDataMap.length > 0?(
              <div className=''>
                <h4 className={css.sectionTitle}>{title}</h4>
              </div>
            ):('')
          }
          <div className='position-relative '>
            <div id={css.sliderLanguage} className='mx-auto d-flex flex-column'>
              {
                schoolDataMap.length > 0 && schoolDataMap.map((slideLanguage, indexCampain) => {

				  let schoolImage = require(`../../json_data/school_thumb/school1.jpg`).default;
				  if(typeof slideLanguage.attributes.profile.publicData.schoolPhotos != 'undefined'){
					  if(typeof slideLanguage.attributes.profile.publicData.schoolPhotos.images != 'undefined'){
						 schoolImage = JSON.parse(slideLanguage.attributes.profile.publicData.schoolPhotos.images)[0]['attributes']['variants']['default']['url'];
					  }
				  }

				  const city = slideLanguage.attributes.profile.publicData.city;
				  const cityName = intl.formatMessage({ id: city });

				  let countryName = '';
				  if(typeof slideLanguage.attributes.profile.publicData.country != 'undefined'){
				      const country = slideLanguage.attributes.profile.publicData.country;
				      countryName = intl.formatMessage({ id: country });
				  }

				  let description = '';
				  if(typeof slideLanguage.attributes.profile.publicData.description != 'undefined'){
				      description = slideLanguage.attributes.profile.publicData.description;
				      if(description.length > 140){
						  description = description.slice(0, 140)+' .....';
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
				   <a href={'/u/'+slideLanguage.id.uuid} className="lang-card">
                    <div className="country-language-card card m-3 mx-auto" key={indexCampain} style={{ width: '100%' }}>
					  <div className="row g-0">
					    <div className="col-md-4">
						    <img src={schoolImage} className="card-img-top" alt={slideLanguage.title_en} />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <h4 className="card-title text-wrap">{ slideLanguage.attributes.profile.publicData.schoolName }</h4>
                            <div className="card-sub-title">フランシスキングロンドン</div>
                            <div className='d-flex justify-content-between text-muted'>
                              <div className="location">
                                <IconLocation className="icon" />
                                { cityName } { (countryName) && ', '+countryName }
                              </div>
                              <p className="text-muted d-none d-flex justify-content-evenly my-0 mt-0"><span style={{marginTop: '-5%'}}><img src={rating} style={{width: '20%', height: '60px'}}/> 2.5</span></p>
                            </div>
							{ description &&
                            <p className='desc card-text text-wrap'>
								{ description }
                            </p>
							}

							{price &&
								<div className='d-flex justify-content-between text-muted'>
								  <div className="location">
									<img src={currency} alt="Yen" className="currency-icon"/>
									<h4 className="card-price">{ price } { currencyText }</h4>
								  </div>
								</div>
				            }
                          </div>
                        </div>
                      </div>
                    </div>
					</a>
                  )
                })
              }
            </div>
            {(isShowMore)?(
              <div className='common-btn-area'>
                <button onClick={seeMoreHandleClick}>{seeMore} <img className='common-icon-btn' src={btnIcon} alt="" /></button>
              </div>
              ):('')}

          </div>
        </div>
		):('')
          }
      </div>

    </div>
  );
};

const { string } = PropTypes;

SectionLanguageSchool.propTypes = {
  country_code: string,
  schoolData: array,
  intl: intlShape.isRequired
};

export default injectIntl(SectionLanguageSchool);

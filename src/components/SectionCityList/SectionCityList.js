import React, {useState, useEffect, useMemo} from 'react';

import PropTypes from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
// external
import css from './SectionCityList.module.css';
import './SectionCityList.css';
import cityjson from '../../assets/json_data/city.json';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import prevCampain from "../../images/prev.png";
import {faSquareCaretLeft, faSquareCaretRight} from "@fortawesome/free-solid-svg-icons";
import data from "../../assets/json_data/city.json";
import { richText } from '../../util/richText';
import btnIcon from "./img/btn-icon.svg";

const SectionCityList = props => {
  const { intl, country_code } = props;

  const [allCityList, setAllCityList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [isEnable, setIsEnable] = React.useState(false);
  const [isShowMore, setIsShowMore] = React.useState(false);

  useMemo(() => {
    var cityRecord = []
    cityjson.areas.map((cityData) => {
      if (cityData.country_code == country_code) {
         setIsEnable(true);
         cityRecord.push(cityData)
      }
    })

    if(cityRecord.length > 0){
        if(cityRecord.length > 3){
          setCityList(cityRecord.slice(0, 3));
          setIsShowMore(true);
        }else{
          setCityList(cityRecord);
        }
    }
    setAllCityList(cityRecord)
  }, []);

  const title = intl.formatMessage({ id: 'SectionCityList.title' });
  const seeMore = intl.formatMessage({ id: 'SectionCityList.seeMore' });

  const seeMoreHandleClick = () => {
    setIsShowMore(false);
    setCityList(allCityList);
  }

  return (
    <div className='text-center padding50'>
      {isEnable ? (
      <div className="container-fluid">
        <h2 className={css.sectionTitle}>{title}</h2>
        <div className={css.sectionContentArea}>
                {
                  cityList &&
                  cityList.map((city, index) => {
                    return (
                      <div className="card mx-2 slider-cardRec city-list-card" key={index}>
                        <a href={'/city/'+city.area_name_en.replace(" ", "-").toLowerCase()} className="mb-4 custom-tile">
                          <img src={require(`../../assets/json_data/city_thumb/${city.thumbnail}`).default} className="card-img-top" alt={city.area_name_en} />
                          <div className="card-body d-flex" style={{ padding: '0 16px 5px' }}>
                            <h4 className="card-title float-start" style={{ color: "#3C3C3C" }}>{city.area_name_ja}</h4>
                          </div>
                          <div className="section-city-list card-body">
                            {
                              city.discription && city.discription.length > 24? (city.discription.slice(0, 25)):(city.discription)
                            }
                          </div>
                        </a>
                      </div>
                    )
                  })
                }
          {isShowMore ? (
            <div className='common-btn-area'style={{marginTop: '30px'}}>
              <button onClick={seeMoreHandleClick}>{seeMore} <img className='common-icon-btn' src={btnIcon} alt="" /></button>
            </div>
            ):('')}

        </div>
      </div>
      ):('')}
    </div>
  );
};

const { string } = PropTypes;

SectionCityList.propTypes = {
  intl: intlShape.isRequired,
  country_code: string
};

export default injectIntl(SectionCityList);

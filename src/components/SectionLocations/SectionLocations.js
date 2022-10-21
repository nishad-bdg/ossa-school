import React, { Component, useState } from 'react';
import PropTypes, { array } from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import classNames from 'classnames';
import {
  FieldSelect,
  BookingDateRangeFilter,
  SchoolFilter,
} from '../../components';

import css from './SectionLocations.module.css';
import style from './Location.module.css';
import locationIcon from './images/locationIcon.svg';
import calanderIcon from './images/calanderIcon.svg';
import controlerIcon from './images/controlIcon.svg';
import btnIcon from '../../containers/AboutUsPage/image/img/btn-icon.svg';
// external
import './SectionLocation.css';
import countryList from '../../json_data/country.json';
import cityList from '../../json_data/city.json';

import config from '../../config';
import { findOptionsForSelectFilter } from '../../util/search';

import { useHistory } from 'react-router-dom';

const courseStartDateOptions = findOptionsForSelectFilter(
  'courseStartDates',
  config.custom.filters
);

const SectionLocations = props => {
  const {
    idPrefix,
    filterConfig,
    rootClassName,
    className,
    intl,
    initialValues,
    getHandleChangedValueFn,
    schools,
    ...rest
  } = props;

  const { id, type, queryParamNames, label, config } = filterConfig;
  const { liveEdit, showAsPopup } = rest;

  const useHistoryPush = liveEdit || showAsPopup;

  const prefix = idPrefix || 'SearchPage';
  const componentId = `${prefix}.${id.toLowerCase()}`;
  const name = id.replace(/\s+/g, '-').toLowerCase();

  const classes = classNames(rootClassName || css.root, className);
  const locationPlaceholder = intl.formatMessage({
    id: 'SectionLocation.locationPlaceholder',
  });
  const calenderPlaceholder = intl.formatMessage({
    id: 'SectionLocation.calenderPlaceholder',
  });
  const searchButton = intl.formatMessage({
    id: 'SectionLocation.searchButton',
  });

  const [selectedCountry, setSelectedCountry] = React.useState('');
  const [cities, setCities] = React.useState([]);
  const [courseDate, setCourseDate] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [labelCity, setLabelCity] = React.useState('都市・語学学校名・予算');
  const [citySchools, setCitySchools] = React.useState([]);
  const [selectedSchoolName, setSelectedSchoolName] = React.useState('');
  let history = useHistory();

  const format = {
    month: 'short',
    day: 'numeric',
  };

  const handleClick = () => {
    const selectElem = document.getElementsByClassName('search-dropdown')[0];
    const bounds = selectElem
      .querySelectorAll('option')
      [selectElem.selectedIndex].getAttribute('data-bound');
    history.push(
      '/s?address=' +
        selectedCountry +
        '&bounds=' +
        bounds +
        '&courseStartDate=' +
        courseDate +
        '&city=' +
        selectedCity +
        '&schoolName=' +
        selectedSchoolName
    );
  };

  const handleCity = data => {
    console.log('data', data);
    setLabelCity('都市・語学学校名・予算');
    setSelectedCity('');
    setSelectedSchoolName('');
    if (data) {
      if (data.cityName && data.schoolName) {
        setSelectedCity(data.cityName);
        setSelectedSchoolName(data.schoolName);
        setLabelCity(`${data.cityName},${data.schoolName}`);
      } else if (data.cityName) {
        setSelectedCity(data.cityName);
        setLabelCity(data.cityName);
      }
    }
  };

  const handleSelectedCountry = e => {
    const targetValue = e.target.value;
    setSelectedCountry(targetValue);
    const country = countryList.find(x => x.country_name_en === targetValue);
    const citiesData = cityList.areas.filter(
      i => i.country_code === country.country_code
    );
    setCities(citiesData);
  };

  const cityNameChanged = cityName => {
    const newSchoolList = schools.filter(
      s => s.attributes.profile.publicData.city === cityName
    );
    setCitySchools(newSchoolList);
  };

  return (
    <div className={style.SectionLocationsContainer}>
      <div className={style.main_div}>
        <div style={{ minWidth: '190px' }} className={style.main_div_child}>
          <div className={style.child_img}>
            <img src={locationIcon} alt="" />
          </div>
          <div className={style.child_text}>
            <select
              className="search-dropdown"
              placeholder="すべての留学できる国"
              value={selectedCountry}
              onChange={handleSelectedCountry}
            >
              <option>すべての留学できる国</option>
              {countryList.map((value, key) => {
                return (
                  <option
                    data-bound={value.bound}
                    value={value.country_name_en}
                    key={key}
                  >
                    {value.country_name_en}
                  </option>
                );
              })}
            </select>
            <div className="line-box">
              <div className="line-2"></div>
            </div>
          </div>
        </div>

        <div style={{ minWidth: '150px' }} className={style.main_div_child}>
          <div className={style.child_img}>
            <img src={calanderIcon} alt="" />
          </div>
          <div className={style.calendar_btn}>
            {/* <BookingDateRangeFilter labelId='date-pick-button' id={componentId} label={labelDate} onSubmit={handleDate}/> */}
            <div className={style.child_text}>
              <select
                className="search-dropdown"
                placeholder="すべての留学できる国"
                value={courseDate}
                onChange={e => setCourseDate(e.target.value)}
              >
                <option>すべての留学できる国</option>
                {courseStartDateOptions.map((value, key) => {
                  return (
                    <option value={value.value} key={key}>
                      {value.label}
                    </option>
                  );
                })}
              </select>
              <div className="line-box">
                <div className="line-2"></div>
              </div>
            </div>
            <div className="line-2"></div>
          </div>
        </div>

        <div style={{ minWidth: '200px' }} className={style.main_div_child}>
          <div className={style.child_img}>
            <img src={controlerIcon} alt="" />
          </div>
          <div className={style.price_btn}>
            <SchoolFilter
              labelId="price-filter-button"
              id={componentId}
              label={labelCity}
              cities={cities}
              citySchools={citySchools}
              onSubmit={handleCity}
              cityNameChanged={cityNameChanged}
              showAsPopup={true}
              {...config}
              {...rest}
            />
            <div className="line-2"></div>
          </div>
        </div>
        <div className={style.main_div_child}>
          <button
            className={style.search_btn}
            disabled={!selectedCountry}
            onClick={handleClick}
          >
            検索
            <img className={style.btn_icon} src={btnIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

const { string } = PropTypes;

SectionLocations.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired,
  schools: array,
};

export default injectIntl(SectionLocations);

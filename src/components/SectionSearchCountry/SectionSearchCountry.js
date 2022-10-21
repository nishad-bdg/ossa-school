import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
// external
import './sectionSearchCountry.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import country from '../../images/country.jpg';
import prevCampain from '../../images/prev.png';
import nextCampain from '../../images/next.png';
import countryjson from '../../json_data/country.json'
const SectionSearchCountry = props => {
  const { rootClassName, className, intl } = props;
  // external
  // const slides = [
  //   {
  //     image: `${country}`,
  //     title: 'SELC Vancouver',
  //     location: 'アメリカ',
  //   },
  //   {
  //     image: `${country}`,
  //     title: 'SELC Vancouver',
  //     location: 'アメリカ',


  //   },
  //   {
  //     image: `${country}`,
  //     title: 'SELC Vancouver',
  //     location: 'アメリカ',


  //   },
  //   {
  //     image: `${country}`,
  //     title: 'SELC Vancouver',
  //     location: 'アメリカ',


  //   }
  //   ,
  //   {
  //     image: `${country}`,
  //     title: 'SELC Vancouver',
  //     location: 'アメリカ',


  //   }
  // ];
  const slideLeftCampain = () => {
    var slider = document.getElementById("sliderCountry");
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  const slideRightCampain = () => {
    var slider = document.getElementById("sliderCountry");
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const title = intl.formatMessage({ id: 'SectionSearchCountry.title' });

  return (
    <div className='text-center' style={{paddingTop: '50px'}}>
      <div className="container-fluid">
        <h2 className='subTitle'>{title}</h2>
        <div className='position-relative '>
          <div id="sliderCountry">
            {
              countryjson.map((slideCountry, indexCampain) => {
                const logo = require(`../../images/country/${slideCountry.thumbnail}`).default;
                return (
                  <a href={'/country/' + slideCountry.country_code } className="card slider-cardRec search-country-slider-card" key={indexCampain}>
                    <img src={logo} className="card-img-top" alt={slideCountry.country_name_en} />
                    <div className="card-body d-flex">
                      <h4 className="card-title float-start">{slideCountry.country_name_ja}</h4>
                    </div>
                  </a>
                )
              })
            }
          </div>
          <div className='d-flex justify-content-between'>
            <div className='position-absolute top-50 translate-middle'>
              <FontAwesomeIcon className='slider-arrow-left' style={{width: '40px', height: '40px', cursor: 'pointer' }} onClick={slideLeftCampain} src={prevCampain} icon={faSquareCaretLeft} />
            </div>
            <div className='position-absolute top-50 start-100 translate-middle'>
              <FontAwesomeIcon className='slider-arrow-right' style={{width: '40px', height: '40px', cursor: 'pointer' }} onClick={slideRightCampain} src={prevCampain} icon={faSquareCaretRight} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

const { string } = PropTypes;

SectionSearchCountry.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired
};

export default injectIntl(SectionSearchCountry);

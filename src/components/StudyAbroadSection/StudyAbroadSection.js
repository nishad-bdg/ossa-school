import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
// external
import css from './studyAbroadSection.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import australia from '../../images/australia.jpg';
import prevCampain from '../../images/prev.png';

const StudyAbroadSection = props => {
  const { intl, country_name } = props;
  // external
  const slides = [
    {
      image: `${australia}`,
      title: 'お名前お名前',
      location: 'メルボルン',
      details: '体験談テキスト体験談テキスト体験談テキスト体験談テキスト体験談テキスト体験談テキスト体験談テキスト'

    },
    {
      image: `${australia}`,
      title: 'お名前お名前',
      location: 'メルボルン',
      details: '体験談テキスト体験談テキスト体験談テキスト体験談テキスト体験談テキスト体験談テキスト体験談テキスト'

    },
    {
      image: `${australia}`,
      title: 'お名前お名前',
      location: 'メルボルン',
      details: '体験談テキスト体験談テキスト体験談テキスト体験談テキスト体験談テキスト体験談テキスト体験談テキスト'

    },
  ];

  const slideLeftCampain = () => {
    var slider = document.getElementById("sliderStudyAbroad");
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  const slideRightCampain = () => {
    var slider = document.getElementById("sliderStudyAbroad");
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const title = intl.formatMessage({ id: 'StudyAbroadSection.title' });
  const seeMore = intl.formatMessage({ id: 'StudyAbroadSection.seeMore' });

  return (
    <div className='mb-5'>
      <div className="container-fluid">
        <h2 className={css.sectionTitle}>{country_name} {title}</h2>
        <div className='position-relative '>
          <div id={css.sliderAbroad}>
            {
              slides.map((slideStudyAbroad, indexCampain) => {
                return (
                  <div className="card mx-3 slider-cardRec" key={indexCampain} style={{ width: "19rem" }}>
                    <img src={slideStudyAbroad.image} className="card-img-top" alt={slideStudyAbroad.title} />
                    <div className="card-body">
                      <h5 className="card-title">{slideStudyAbroad.title}</h5>
                      <p className="card-subtitle mb-2 text-muted"> <FontAwesomeIcon icon={faMapMarker} /> {slideStudyAbroad.location}</p>
                      <p className="card-text text-wrap">{slideStudyAbroad.details}</p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className='d-flex justify-content-center'>
              <button className={css.seeMoreBtn}>{seeMore}</button>
            </div>

        </div>
      </div>
    </div>
  );
};

const { string } = PropTypes;

StudyAbroadSection.propTypes = {
  intl: intlShape.isRequired,
  country_name: string
};

export default injectIntl(StudyAbroadSection);

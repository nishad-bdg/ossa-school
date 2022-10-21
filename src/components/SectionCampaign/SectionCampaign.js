import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
// external
import './sectionCampaign.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';
import campiagn1 from '../../images/campiagn1.jpg';
import campiagn2 from '../../images/campiagn2.jpg';

import prevCampain from '../../images/prev.png';
import nextCampain from '../../images/next.png';

const SectionCampaign = props => {
  const { rootClassName, className, intl } = props;
  // external
  const slidesCampain = [
    {
      image: campiagn1,

    },
    {
      image: campiagn1,

    }
    , {
      image: campiagn2,

    },
    {
      image: campiagn1,

    },
    {
      image: campiagn1,

    }
  ];
  const slideLeftCampain = () => {
    var slider = document.getElementById("sliderCampain");
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  const slideRightCampain = () => {
    var slider = document.getElementById("sliderCampain");
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const title = intl.formatMessage({ id: 'SectionCampiagn.title' });

  return (
    <div className='text-center m-2'>
      <div className="container-fluid">
        <h2 style={{ fontSize: "32px", letterSpacing: "1px" }}>CAMPAIGN</h2>
        <small>{title}</small>

        <div className='position-relative '>
          <div id="sliderCampain">
            {
              slidesCampain.map((slideRecommend, indexCampain) => {
                return (
                  <div className="card mx-3 slider-cardRec" key={indexCampain} style={{ width: "20rem" }}>
                    <img src={slideRecommend.image} className="card-img-top" style={{ height: '150px' }} />
                  </div>
                )
              })
            }
          </div>
          <div className='d-flex justify-content-between'>
            <div className='position-absolute top-50 mx-5 translate-middle'>
              <FontAwesomeIcon style={{ marginRight: '30px', width: '40px', height: '40px' }} onClick={slideLeftCampain} src={prevCampain} icon={faSquareCaretLeft} />
            </div>
            <div className='position-absolute top-50 start-100 translate-middle'>
              <FontAwesomeIcon style={{ marginRight: '30px', width: '40px', height: '40px' }} onClick={slideRightCampain} src={prevCampain} icon={faSquareCaretRight} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const { string } = PropTypes;

SectionCampaign.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired
};

export default injectIntl(SectionCampaign);

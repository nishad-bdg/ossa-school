import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
// external
import './sectionRecommended.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import recommended from '../../images/recommended.jpg';
import prevCampain from '../../images/prev.png';
import nextCampain from '../../images/next.png';

const SectionRecommended = props => {
  const { rootClassName, className, intl} = props;
  // external
  const slides = [
    {
      image: `${recommended}`,
      title: 'SELC Vancouver',
      location: 'カナダ',
      price: '￥24.1万円〜'

    },
    {
      image: `${recommended}`,
      title: 'SELC Vancouver',
      location: 'カナダ',
      price: '￥24.1万円〜'

    },
    {
      image: `${recommended}`,
      title: 'SELC Vancouver',
      location: 'カナダ',
      price: '￥24.1万円〜'

    },
    {
      image: `${recommended}`,
      title: 'SELC Vancouver',
      location: 'カナダ',
      price: '￥24.1万円〜'

    }
    ,
    {
      image: `${recommended}`,
      title: 'SELC Vancouver',
      location: 'カナダ',
      price: '￥24.1万円〜'

    }
  ];

  const slideLeftCampain = () => {
    var slider = document.getElementById("sliderRecommended");
    slider.scrollLeft = slider.scrollLeft + 500;
  }

  const slideRightCampain = () => {
    var slider = document.getElementById("sliderRecommended");
    slider.scrollLeft = slider.scrollLeft - 500;
  }
  const title = intl.formatMessage({ id: 'SectionRecommended.title' });
  
  return (
      <div className='text-center mb-5'>
        <div className="container-fluid">
            <div className="">

            <div className=''>
              <h2 className='float-start' style={{fontSize:"32px", letterSpacing: "1px" }}>{title}</h2>
            </div>
            <div className='position-relative '>
              <div id="sliderRecommended">
                {
                  slides.map((slideRecommend, indexCampain) => {
                    return (
                      <div className="card mx-3 slider-cardRec" key={indexCampain} style={{width: "18rem"}}> 
                      <img src={slideRecommend.image} className="card-img-top" alt={slideRecommend.title}/>
                      <div className="card-body d-flex">
                        <h5 className="card-title float-start">{slideRecommend.title}</h5>
                        
                      </div>
                      <div className="card-body d-flex justify-content-between">
                        <span className="card-link float-start"><FontAwesomeIcon icon={faMapMarker}/> {slideRecommend.location}</span>
                        <span className="card-link float-end">{slideRecommend.price}</span>
                      </div>
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

      </div>
  );
};

const { string } = PropTypes;

SectionRecommended.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired
};

export default injectIntl(SectionRecommended);

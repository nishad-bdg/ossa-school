import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
// external
import './sectionSearchTheme.css';
import purpose from '../../images/purpose.jpg';
const SectionSearchTheme = props => {
  const { intl} = props;
  // external
  const slides = [
    {
      image: `${purpose}`,
      title: 'Resort',
    },
    {
      image: `${purpose}`,
      title: 'Resort',
    },
    {
      image: `${purpose}`,
      title: 'Resort',
    },
    {
      image: `${purpose}`,
      title: 'Resort',
    }
  ];
  const title = intl.formatMessage({ id: 'SectionSearchTheme.title' });
  const seeMore = intl.formatMessage({ id: 'SectionSearchTheme.seeMore' });
  
  return (
      <div className='text-center mb-5'>
        <div className="container-fluid">
            <div className="">

            <div className=''>
              <h2 className='float-start' style={{fontSize:"32px", letterSpacing: "1px" }}>{title}</h2>
            </div>
            <div className='position-relative '>
              <div id="sliderpurpose">
                {
                  slides.map((slideRecommend, indexCampain) => {
                    return (
                      <div className="card mx-3 slider-cardRec" key={indexCampain} style={{width: "18rem"}}> 
                      <img src={slideRecommend.image} className="card-img-top" alt={slideRecommend.title}/>
                      <div className="card-body d-flex">
                        <h4 className="card-title float-start">{slideRecommend.title}</h4>
                        
                      </div>
                    </div>
                    )
                  })
                }
                </div>
                <div className='d-flex justify-content-center'>
                  <button className='btn btn-lg btn-info mx-5'>{seeMore}</button>
                </div>
              
              </div>
          </div>
        </div>

      </div>
  );
};

const { string } = PropTypes;

SectionSearchTheme.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired
};

export default injectIntl(SectionSearchTheme);

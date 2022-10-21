import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import lastpoint from '../../images/lastpoint.png';

// external
import './section3Point.css';
const Section3Point = props => {
  const { intl } = props;
  const slides = [
    {
      image: `${lastpoint}`,
      title: 'キャッチコピーが入ります',
      subTitle: '魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります。魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります。魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります。魅力説明テキストが入ります魅力説明テキストが入ります。'
    },
    {
      image: `${lastpoint}`,
      dateTime: '2022/06/28　12:00',
      title: 'キャッチコピーが入ります',
      subTitle: '魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります。魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります。魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります。魅力説明テキストが入ります魅力説明テキストが入ります。'
    },
    {
      image: `${lastpoint}`,
      dateTime: '2022/06/28　12:00',
      title: 'キャッチコピーが入ります',
      subTitle: '魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります。魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります。魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります魅力説明テキストが入ります。魅力説明テキストが入ります魅力説明テキストが入ります。'
      
    }
  ];
  const title = intl.formatMessage({ id: 'Section3Point.title' });
  return (
    <div className='section3Point mb-5'>
      <div className="container-fluid">
        <div className="mainPart">

          <h2 className='float-start' style={{ fontSize: "32px", letterSpacing: "1px" }}>{title}</h2>
          <div className='position-relative '>
            <div id="sliderpurpose" className='mx-auto d-flex flex-column'>
              {
                slides.map((slideRecommend, indexCampain) => {
                  return (
                    indexCampain+1 == 2?
                    <div className="card border border-white mx-auto" key={indexCampain} style={{width: '780px'}}>
                      <div className="row g-0">
                        <div className="col-md-6">
                          <img src={slideRecommend.image} className="card-img-top" alt={slideRecommend.title} />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <h4 className="card-title text-wrap float-start text-decoration-underline" style={{fontSize: '16px'}}>{slideRecommend.title}</h4>
                            <p className='text-muted text-wrap float-start' style={{fontSize: '12px'}}>{slideRecommend.subTitle}</p>
                          </div>
                        </div>
                      </div>
                    </div> :
                    <div className="card border border-white mx-auto" key={indexCampain} style={{width: '780px'}}>
                      <div className="row g-0">
                        
                        <div className="col-md-6">
                          <div className="card-body">
                            <h4 className="card-title text-wrap float-start text-decoration-underline" style={{fontSize: '16px'}}>{slideRecommend.title}</h4>
                            <p className='text-muted text-wrap float-start' style={{fontSize: '12px'}}>{slideRecommend.subTitle}</p>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <img src={slideRecommend.image} className="card-img-top" alt={slideRecommend.title} />
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

const { string } = PropTypes;

Section3Point.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired
};

export default injectIntl(Section3Point);

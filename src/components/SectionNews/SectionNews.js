import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import Mask from '../../images/Mask.jpg';

// external
import './sectionNews.css';
const SectionNews = props => {
  const { intl } = props;
  const slides = [
    {
      image: `${Mask}`,
      dateTime: '2022/06/28　12:00',
      title: 'お知らせタイトルお知らせタイトルお知らせタイトルお知らせタイトル',
      subTitle: 'お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細'
    },
    {
      image: `${Mask}`,
      dateTime: '2022/06/28　12:00',
      title: 'お知らせタイトルお知らせタイトルお知らせタイトルお知らせタイトル',
      subTitle: 'お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細'
    },
    {
      image: `${Mask}`,
      dateTime: '2022/06/28　12:00',
      title: 'お知らせタイトルお知らせタイトルお知らせタイトルお知らせタイトル',
      subTitle: 'お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細お知らせ詳細'
    }
  ];
  const title1 = intl.formatMessage({ id: 'SectionNews.title1' });
  const title2 = intl.formatMessage({ id: 'SectionNews.title2' });
  const seeMore = intl.formatMessage({ id: 'SectionNews.seeMore' });

  return (
    <div className='sectionNews mb-5'>
      <div className="container-fluid">
        <div className="mainPart">

          <div className=''>
            <h2 className='text-center' style={{ fontSize: "32px", letterSpacing: "1px" }}>{title1}</h2>
            <small>{title2}</small>
          </div>
          <div className='position-relative '>
            <div id="sliderpurpose" className='mx-auto d-flex flex-column'>
              {
                slides.map((slideRecommend, indexCampain) => {
                  return (
                    <div className="card m-3 mx-auto" key={indexCampain} style={{width: '660px'}}>
                      <div className="row g-0">
                        <div className="col-md-6">
                          <img src={slideRecommend.image} className="card-img-top" alt={slideRecommend.title} />
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <p className='text-muted float-start' style={{fontSize: '12px'}}>{slideRecommend.dateTime}</p>
                            <h4 className="card-title text-wrap float-start" style={{fontSize: '16px'}}>{slideRecommend.title}</h4>
                            <p className='text-muted text-wrap float-start' style={{fontSize: '12px'}}>{slideRecommend.subTitle}</p>
                          </div>
                        </div>
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

SectionNews.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired
};

export default injectIntl(SectionNews);

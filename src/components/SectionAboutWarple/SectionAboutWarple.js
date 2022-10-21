import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, injectIntl } from '../../util/reactIntl';
import purpose from '../../images/purpose.jpg';

// external
import './sectionAbout.css';
const SectionAboutWarple = props => {
  const { intl } = props;
  const title = intl.formatMessage({ id: 'SectionAboutWarple.title' });
  const description = intl.formatMessage({ id: 'SectionAboutWarple.description' });

  return (
    <div className='sectionAboutWarple mb-5'>
      <div className="container-fluid">
        <div className="mainPart">
            <h2 className='text-center' style={{ fontSize: "32px", letterSpacing: "1px" }}>{title}</h2>
          <div className='position-relative '>
            <div id="sliderpurpose" className='mx-auto d-flex flex-column'>

              <div className="card mx-auto border border-white" style={{ width: '720px' }}>
                <div className="d-flex flex-column">
                  <p className='text-center text-muted text-wrap float-start mx-auto' style={{ fontSize: '12px', width: '320px' }}>{description}</p>
                  <img src={purpose} className="card-img-top mx-auto" style={{width: '320px'}} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const { string } = PropTypes;

SectionAboutWarple.propTypes = {
  rootClassName: string,
  className: string,
  intl: intlShape.isRequired
};

export default injectIntl(SectionAboutWarple);

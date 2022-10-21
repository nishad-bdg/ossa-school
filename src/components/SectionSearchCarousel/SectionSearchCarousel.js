import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { NamedLink } from '../../components';

import css from './SectionSearchCarousel.module.css';

const SectionSearchCarousel = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={css.howToWorks + ' container p-5'}>
      <div className={css.title + ' text-center '}>
        <span>SEARCH</span>
        <br />
        <p>留学先をさがす</p>
      </div>

      <div className={css.steps + ' text-left'}>
        <div>いまおすすめの語学学校</div>


      </div>
      <div className='d-flex justify-content-center'>
        <button className='btn btn-lg btn-info mx-5'>初めての方へ</button>
      </div>
    </div>
  );
};

SectionSearchCarousel.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionSearchCarousel.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionSearchCarousel;

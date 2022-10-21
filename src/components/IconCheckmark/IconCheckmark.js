import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconCheckMark.module.css';

const SIZE_SMALL = 'small';
const SIZE_BIG = 'big';

const STYLE_RED = 'red';

const IconCheckmark = props => {
  const { rootClassName, className, size, style } = props;
  const classes = classNames(rootClassName || css.root, className);
  if (size === SIZE_SMALL) {
    return (
      <svg className={classes} width="16" height="12" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14 2l-8 8-4-4"
          strokeWidth="2.5"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  } else if (size === SIZE_BIG) {
    return (
      <svg className={classes} strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.6 1.2c-.4-.3-1-.2-1.3.2L7.8 19l-5.2-5c-.4-.4-1-.4-1.3 0-.4.3-.4.8 0 1l6 5.6.6.2s.2 0 .4-.4l14.3-18c.3-.5.2-1-.2-1" />
      </svg>
    );
  } else if (style === STYLE_RED) {
    return (
      <svg className={classes} viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.79508 10.8749L1.62508 6.70492L0.205078 8.11492L5.79508 13.7049L17.7951 1.70492L16.3851 0.294922L5.79508 10.8749Z" fill="#FF4A2B" />
      </svg>
    )
  }
};

IconCheckmark.defaultProps = {
  rootClassName: null,
  className: null,
  size: 'big',
  style: 'red'
};

const { string } = PropTypes;

IconCheckmark.propTypes = {
  rootClassName: string,
  className: string,
  size: string,
  style: string
};

export default IconCheckmark;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconLocation.module.css';

const IconLocation = props => {
    const { className, rootClassName } = props;
    const classes = classNames(rootClassName || css.root, className);

    return (
        <svg className={classes}
            viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.96936 0C4.10928 0 0.987305 3.13 0.987305 7C0.987305 12.25 7.96936 20 7.96936 20C7.96936 20 14.9514 12.25 14.9514 7C14.9514 3.13 11.8294 0 7.96936 0ZM2.98218 7C2.98218 4.24 5.21643 2 7.96936 2C10.7223 2 12.9565 4.24 12.9565 7C12.9565 9.88 10.0839 14.19 7.96936 16.88C5.89469 14.21 2.98218 9.85 2.98218 7Z" fill="black" fillOpacity="0.54" />
            <path d="M7.96936 9.5C9.34653 9.5 10.4629 8.38071 10.4629 7C10.4629 5.61929 9.34653 4.5 7.96936 4.5C6.59219 4.5 5.47577 5.61929 5.47577 7C5.47577 8.38071 6.59219 9.5 7.96936 9.5Z" fill="black" fillOpacity="0.54" />
        </svg>
    )
}

IconLocation.defaultProps = { className: null, rootClassName: null };

const { string } = PropTypes;

IconLocation.propTypes = {
    className: string,
    rootClassName: string
};

export default IconLocation
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconCurrency.module.css';

const IconCurrency = props => {
    const { className, rootClassName } = props;
    const classes = classNames(rootClassName || css.root, className);

    return (
        <svg className={classes}
            viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 0C4.98 0 0.5 4.48 0.5 10C0.5 15.52 4.98 20 10.5 20C16.02 20 20.5 15.52 20.5 10C20.5 4.48 16.02 0 10.5 0ZM11.5 10.5V11.5H14.5V12.5H11.5V15H9.5V12.5H6.5V11.5H9.5V10.5H6.5V9.5H9L6.5 6H8.5L10.5 9.5L12.5 6H14.5L12 9.5H14.5V10.5H11.5Z" fill="black" fillOpacity="0.54" />
        </svg>
    )
}

IconCurrency.defaultProps = { className: null, rootClassName: null };

const { string } = PropTypes;

IconCurrency.propTypes = {
    className: string,
    rootClassName: string
};

export default IconCurrency
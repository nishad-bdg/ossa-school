import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconDate.module.css';

const IconDate = props => {
    const { className, rootClassName } = props;
    const classes = classNames(rootClassName || css.root, className);

    return (
        <svg className={classes}
            viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9H4V11H6V9ZM10 9H8V11H10V9ZM14 9H12V11H14V9ZM16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.00999999 2.9 0.00999999 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 18H2V7H16V18Z" fill="black" fillOpacity="0.54" />
        </svg>
    )
}

IconDate.defaultProps = { className: null, rootClassName: null };

const { string } = PropTypes;

IconDate.propTypes = {
    className: string,
    rootClassName: string
};

export default IconDate
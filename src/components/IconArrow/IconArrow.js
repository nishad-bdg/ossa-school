import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import css from './IconArrow.module.css';

const IconArrow = props => {
    const { className, rootClassName } = props;
    const classes = classNames(rootClassName || css.root, className);

    return (
        <svg className={classes}
            viewBox="0 0 41 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" width="40" height="40" rx="20" fill="black" />
            <g clipPath="url(#clip0_1945_8044)">
                <path d="M20.9164 27.7955L19.2686 26.1619L23.5939 21.8366H13.459V19.4361H23.5939L19.2686 15.1179L20.9164 13.4773L28.0755 20.6364L20.9164 27.7955Z" fill="white" />
            </g>
            <defs>
                <clipPath id="clip0_1945_8044">
                    <rect width="24" height="24" fill="white" transform="translate(8.5 8)" />
                </clipPath>
            </defs>
        </svg>
    )
}

IconArrow.defaultProps = { className: null, rootClassName: null };

const { string } = PropTypes;

IconArrow.propTypes = {
    className: string,
    rootClassName: string
};

export default IconArrow
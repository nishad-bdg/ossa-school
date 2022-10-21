import React from 'react';
import { arrayOf, string, any } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import accomodation from '../../images/accommodation.jpg'
import NoImageIcon from './NoImageIcon';
import css from './ResponsiveImage.module.css';

const ResponsiveImage = props => {
    const { className, rootClassName, alt, noImageMessage, isImage, image, variants, ...rest } = props;
    const classes = classNames(rootClassName || css.root, className);

    if (image == null || variants.length === 0) {
        const noImageClasses = classNames(rootClassName || css.root, css.noImageContainer, className);

        const noImageMessageText = noImageMessage || <FormattedMessage id="ResponsiveImage.noImage" />;
        return (
            <div className={noImageClasses}>
                <div className={css.noImageWrapper}>
                    <NoImageIcon className={css.noImageIcon} />
                    <div className={css.noImageText}>{noImageMessageText}</div>
                </div>
            </div>
        );
    }

    const imageVariants = {
        'default': {
            height: 267,
            name: "landscape-crop",
            url: image && variants.length ? image.attributes.variants.default.url : null,
            width: 400
        },
        'landscape-crop': {
            height: 267,
            name: "landscape-crop",
            url: accomodation,
            width: 400
        },
        'landscape-crop2x': {
            height: 533,
            name: "landscape-crop2x",
            url: accomodation,
            width: 800
        }
    }

    const srcSet = variants
        .map(variantName => {
            const variant = imageVariants[variantName];

            if (!variant) {
                return null;
            }
            return `${variant.url} ${variant.width}w`;
        })
        .filter(v => v != null)
        .join(', ');

    const imgProps = {
        className: classes,
        srcSet,
        ...rest,
    };

    return <img height="100%" alt={alt} {...imgProps} />;
};

ResponsiveImage.defaultProps = {
    className: null,
    rootClassName: null,
    image: null,
    noImageMessage: null,
};

ResponsiveImage.propTypes = {
    className: string,
    rootClassName: string,
    alt: string.isRequired,
    image: any,
    variants: arrayOf(string).isRequired,
    noImageMessage: string,
};

export default ResponsiveImage;

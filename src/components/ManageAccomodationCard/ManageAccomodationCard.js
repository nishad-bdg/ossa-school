import React from 'react';
import PropTypes, { any } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';

import {
  formatMoney,
  unitDivisor,
  convertUnitToSubUnit,
} from '../../util/currency';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_EDIT,
  createSlug,
} from '../../util/urlHelpers';
import { createResourceLocatorString, findRouteByRouteName } from '../../util/routes';
import config from '../../config';
import { types as sdkTypes } from '../../util/sdkLoader';
import ResponsiveImage from './ResponsiveImage';
import {
  InlineTextButton,
  NamedLink,
} from '../../components';
const { Money } = sdkTypes;
import Overlay from './Overlay';
import css from './ManageAccomodationCard.module.css';

// Menu content needs the same padding
const MAX_LENGTH_FOR_WORDS_IN_TITLE = 7;

const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ManageAccomodationCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ManageAccomodationCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

const createListingURL = (routes, listing) => {
  const id = listing.id;
  const slug = createSlug(listing?.description?.title);

  const linkProps = {
    name: 'EditAccomodationPage',
    params: {
      id, slug, type: LISTING_PAGE_PARAM_TYPE_DRAFT, tab: 'arrangmentfee'
    },

  }

  return createResourceLocatorString(linkProps.name, routes, linkProps.params, {});
};

// Cards are not fixed sizes - So, long words in title make flexboxed items to grow too big.
// 1. We split title to an array of words and spaces.
//    "foo bar".split(/([^\s]+)/gi) => ["", "foo", " ", "bar", ""]
// 2. Then we break long words by adding a '<span>' with word-break: 'break-all';
const formatTitle = (title, maxLength) => {
  const nonWhiteSpaceSequence = /([^\s]+)/gi;
  return title.split(nonWhiteSpaceSequence).map((word, index) => {
    return word.length > maxLength ? (
      <span key={index} style={{ wordBreak: 'break-all' }}>
        {word}
      </span>
    ) : (
      word
    );
  });
};

export const ManageAccomodationCardComponent = props => {
  const {
    className,
    rootClassName,
    history,
    intl,
    isMenuOpen,
    listing,
    renderSizes,
  } = props;
  const classes = classNames(rootClassName || css.root, className);
  const currentListing = listing;
  const id = currentListing.id;
  const title = currentListing?.description?.title;
  let price = null
  if (listing?.pricing && listing?.pricing?.normal_season?.amount) {
    price = new Money(
      convertUnitToSubUnit(listing?.pricing?.normal_season?.amount / 100, unitDivisor(listing?.pricing?.normal_season?.currency)),
      listing?.pricing?.normal_season?.currency
    );
  }

  const { formattedPrice, priceTitle } = priceData(price, intl);
  const slug = createSlug(title);
  const isPendingApproval = false//state === LISTING_STATE_PENDING_APPROVAL;
  const isDraft = currentListing?.description &&
    currentListing?.facilities &&
    currentListing?.distance &&
    currentListing?.type &&
    currentListing?.roomfacilities &&
    currentListing?.pricing &&
    currentListing?.arrangmentfee

  const imageIds = images => {
    return images ? JSON.parse(images) : null
  };
  const allImages = currentListing.images ? imageIds(currentListing.images) : null
  const firstImage =
    allImages && allImages.length > 0 ? allImages[0] : null;

  const onOverListingLink = () => {
    const { component: Page } = findRouteByRouteName('AccomodationPage', routeConfiguration());
    if (Page.preload) {
      Page.preload();
    }
  };

  const titleClasses = classNames(css.title, {
    [css.titlePending]: isPendingApproval,
    [css.titleDraft]: isDraft,
  });

  const editListingLinkType = LISTING_PAGE_PARAM_TYPE_EDIT;

  const unitTranslationKey = 'ManageAccomodationCard.perUnit';

  return (
    <div className={classes}>
      <div
        className={css.threeToTwoWrapper}
        tabIndex={0}
        onClick={event => {
          event.preventDefault();
          event.stopPropagation();

          // ManageAccomodationCard contains links, buttons and elements that are working with routing.
          // This card doesn't work if <a> or <button> is used to wrap events that are card 'clicks'.
          //
          // NOTE: It might be better to absolute-position those buttons over a card-links.
          // (So, that they have no parent-child relationship - like '<a>bla<a>blaa</a></a>')
          history.push(createListingURL(routeConfiguration(), listing));
        }}
        onMouseOver={onOverListingLink}
        onTouchStart={onOverListingLink}
      >
        <div className={css.aspectWrapper}>
          <ResponsiveImage
            rootClassName={css.rootForImage}
            alt={title}
            image={firstImage}
            isImage={isDraft}
            variants={['default']}
            sizes={renderSizes}
          />
        </div>
        <div className={classNames(css.menuOverlayWrapper, { [css.menuOverlayOpen]: isMenuOpen })}>
          <div className={classNames(css.menuOverlay)} />
          <div className={css.menuOverlayContent}>
            <FormattedMessage id="ManageAccomodationCard.viewListing" />
          </div>
        </div>
        {!isDraft ? (
          <React.Fragment>
            <div className={classNames({ [css.draftNoImage]: !firstImage })} />
            <Overlay
              message={intl.formatMessage(
                { id: 'ManageAccomodationCard.draftOverlayText' },
                { listingTitle: title }
              )}
            >
              <NamedLink
                className={css.finishListingDraftLink}
                name="EditAccomodationPage"
                params={{ id, slug, type: LISTING_PAGE_PARAM_TYPE_DRAFT, tab: 'arrangmentfee' }}
              >
                <FormattedMessage id="ManageAccomodationCard.finishListingDraft" />
              </NamedLink>
            </Overlay>
          </React.Fragment>
        ) : null}
      </div>

      <div className={css.info}>
        <div className={css.price}>
          {formattedPrice ? (
            <React.Fragment>
              <div className={css.priceValue} title={priceTitle}>
                {formattedPrice}
              </div>
              <div className={css.perUnit}>
                <FormattedMessage id={unitTranslationKey} />
              </div>
            </React.Fragment>
          ) : (
            <div className={css.noPrice}>
              <FormattedMessage id="ManageAccomodationCard.priceNotSet" />
            </div>
          )}
        </div>

        <div className={css.mainInfo}>
          <div className={css.titleWrapper}>
            <InlineTextButton
              rootClassName={titleClasses}
              onClick={event => {
                event.preventDefault();
                event.stopPropagation();
                history.push(createListingURL(routeConfiguration(), listing));
              }}
            >
              {formatTitle(title, MAX_LENGTH_FOR_WORDS_IN_TITLE)}
            </InlineTextButton>
          </div>
        </div>

        <div className={css.manageLinks}>
          <NamedLink
            className={css.manageLink}
            name="EditAccomodationPage"
            params={{ id, slug, type: editListingLinkType, tab: 'description' }}
          >
            <FormattedMessage id="ManageAccomodationCard.editListing" />
          </NamedLink>
        </div>
      </div>
    </div>
  );
};

ManageAccomodationCardComponent.defaultProps = {
  className: null,
  rootClassName: null,
  actionsInProgressListingId: null,
  renderSizes: null,
};

const { bool, func, shape, string } = PropTypes;

ManageAccomodationCardComponent.propTypes = {
  className: string,
  rootClassName: string,
  hasClosingError: bool.isRequired,
  hasOpeningError: bool.isRequired,
  intl: intlShape.isRequired,
  listing: any,
  isMenuOpen: bool.isRequired,
  actionsInProgressListingId: shape({ uuid: string.isRequired }),
  onOpenListing: func.isRequired,
  // Responsive image sizes hint
  renderSizes: string,

  // from withRouter
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default compose(
  withRouter,
  injectIntl
)(ManageAccomodationCardComponent);

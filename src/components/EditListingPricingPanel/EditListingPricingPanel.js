import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingPricingForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';

import css from './EditListingPricingPanel.module.css';

const { Money } = sdkTypes;

const EditListingPricingPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);

  const maxCourseDuration = Number(localStorage.getItem('maxCourseDuration'));
  const maxCoursesArr = [];
  for (let i = 1; i <= maxCourseDuration; i++) {
    maxCoursesArr.push({});
  }
  const { publicData } = currentListing.attributes;

  const pricingAsMoney = publicData.pricing && publicData.pricing.map(x => ({
    tuitionFee: new Money(x.tuitionFee.amount, x.tuitionFee.currency),
    highSeasonTuitionFee: new Money(
      x.highSeasonTuitionFee.amount,
      x.highSeasonTuitionFee.currency
    ),
  }));
  const pricing =
    publicData && publicData.pricing ? pricingAsMoney : maxCoursesArr;
  const isPublished =
    currentListing.id &&
    currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingPricingPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingPricingPanel.createListingTitle" />
  );

  const priceCurrencyValid =
    publicData.tuitionFee instanceof Money
      ? publicData.tuitionFee.currency === config.currency
      : true;
  const form = priceCurrencyValid ? (
    <EditListingPricingForm
      className={css.form}
      initialValues={{
        pricing: pricing,
      }}
      onSubmit={values => {
        const { pricing } = values;
        const dataArr = [];
        const pricingArr = []

        pricing.map(x => {
          const dataTuitionFee = x.tuitionFee;
          const dataHighTuitionFee = x.highSeasonTuitionFee;
          pricingArr.push(dataHighTuitionFee.amount)
          dataArr.push({
            tuitionFee: {
              amount: dataTuitionFee.amount,
              currency: dataTuitionFee.currency,
            },
            highSeasonTuitionFee: {
              amount: dataHighTuitionFee.amount,
              currency: dataHighTuitionFee.currency,
            },
          });
        });
        const minFee = Math.min(...pricingArr)
        const index = pricingArr.indexOf(minFee)
        const minFeeObj = dataArr[index].tuitionFee
        const updatedValues = {
          price: minFeeObj,
          publicData: {
            pricing: dataArr,
          },
        };
        onSubmit(updatedValues);
      }}
      onChange={onChange}
      saveActionMsg={submitButtonText}
      disabled={disabled}
      ready={ready}
      updated={panelUpdated}
      updateInProgress={updateInProgress}
      fetchErrors={errors}
    />
  ) : (
    <div className={css.priceCurrencyInvalid}>
      <FormattedMessage id="EditListingPricingPanel.listingPriceCurrencyInvalid" />
    </div>
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingPricingPanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditListingPricingPanel;

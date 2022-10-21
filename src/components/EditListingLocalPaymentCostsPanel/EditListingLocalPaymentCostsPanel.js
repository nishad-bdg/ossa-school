import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingLocalPaymentCostsForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';

import css from './EditListingLocalPaymentCostsPanel.module.css';

const { Money } = sdkTypes;

const EditListingLocalPaymentCostsPanel = props => {
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
  const { publicData } = currentListing.attributes;
  const ssp = publicData && publicData.ssp ? publicData.ssp : null;

  const sspAsMoney = ssp ? new Money(ssp.amount, ssp.currency) : null;

  // textbook
  const textbook =
    publicData && publicData.textbook ? publicData.textbook : null;

  const textbookAsMoney = textbook
    ? new Money(textbook.amount, textbook.currency)
    : null;
  // textbook

  // acr i-card
  const acrIcard =
    publicData && publicData.acrIcard ? publicData.acrIcard : null;

  const acrIcardAsMoney = acrIcard
    ? new Money(acrIcard.amount, acrIcard.currency)
    : null;
  // acr i-card

  // management fee
  const managementFee =
    publicData && publicData.managementFee ? publicData.managementFee : null;

  const managementFeeAsMoney = managementFee
    ? new Money(managementFee.amount, managementFee.currency)
    : null;
  // management fee

  // electricity fee
  const electricityFee =
    publicData && publicData.electricityFee ? publicData.electricityFee : null;

  const electricityFeeAsMoney = electricityFee
    ? new Money(electricityFee.amount, electricityFee.currency)
    : null;
  // electricity fee

  // deposit
  const deposit = publicData && publicData.deposit ? publicData.deposit : null;

  const depositAsMoney = deposit
    ? new Money(deposit.amount, deposit.currency)
    : null;
  // deposit

  // visa extension fee
  const visaExtensionFee =
    publicData && publicData.visaExtensionFee
      ? publicData.visaExtensionFee
      : null;

  const visaExtensionFeeAsMoney = visaExtensionFee
    ? new Money(visaExtensionFee.amount, visaExtensionFee.currency)
    : null;
  // visa extension fee

  const initialValues = {
    ssp: sspAsMoney,
    textbook: textbookAsMoney,
    acrIcard: acrIcardAsMoney,
    managementFee: managementFeeAsMoney,
    electricityFee: electricityFeeAsMoney,
    deposit: depositAsMoney,
    visaExtensionFee: visaExtensionFeeAsMoney,
  };

  const isPublished =
    currentListing.id &&
    currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingLocalPaymentCostsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingLocalPaymentCostsPanel.createListingTitle" />
  );

  const priceCurrencyValid =
    publicData.ssp instanceof Money
      ? publicData.ssp.currency === config.currency
      : true;

  const form = priceCurrencyValid ? (
    <EditListingLocalPaymentCostsForm
      className={css.form}
      initialValues={initialValues}
      onSubmit={values => {
        const {
          ssp = null,
          textbook = null,
          acrIcard = null,
          managementFee = null,
          electricityFee = null,
          deposit = null,
          visaExtensionFee = null,
        } = values;
        const updateValues = {
          publicData: {
            ssp: {
              amount: ssp.amount,
              currency: ssp.currency,
            },

            textbook: {
              amount: textbook.amount,
              currency: textbook.currency,
            },

            acrIcard: {
              amount: acrIcard.amount,
              currency: acrIcard.currency,
            },

            managementFee: {
              amount: managementFee.amount,
              currency: managementFee.currency,
            },

            electricityFee: {
              amount: electricityFee.amount,
              currency: electricityFee.currency,
            },

            deposit: {
              amount: deposit.amount,
              currency: deposit.currency,
            },

            visaExtensionFee: {
              amount: visaExtensionFee.amount,
              currency: visaExtensionFee.currency,
            },
          },
        };

        onSubmit(updateValues);
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
      <FormattedMessage id="EditListingMaterialFeePanel.listingPriceCurrencyInvalid" />
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

EditListingLocalPaymentCostsPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingLocalPaymentCostsPanel.propTypes = {
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

export default EditListingLocalPaymentCostsPanel;

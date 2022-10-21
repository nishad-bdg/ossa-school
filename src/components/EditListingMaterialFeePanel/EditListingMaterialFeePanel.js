import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '../../components';
import { EditListingMaterialFeeForm } from '../../forms';
import { ensureOwnListing } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import config from '../../config';

import css from './EditListingMaterialFeePanel.module.css';

const { Money } = sdkTypes;

const EditListingMaterialFeePanel = props => {
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
  const materialFeePerWeek =
    publicData && publicData.materialFeePerWeek
      ? publicData.materialFeePerWeek
      : null;

  console.log('material fee', materialFeePerWeek)

  const materialFeePerWeekAsMoney = materialFeePerWeek
    ? new Money(materialFeePerWeek.amount, materialFeePerWeek.currency)
    : null;
  console.log('material fee as money', materialFeePerWeekAsMoney)

  const initialValues = { materialFeePerWeek: materialFeePerWeekAsMoney };

  const isPublished =
    currentListing.id &&
    currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingMaterialFeePanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingMaterialFeePanel.createListingTitle" />
  );

  const priceCurrencyValid =
    publicData.materialFeePerWeek instanceof Money
      ? publicData.materialFeePerWeek.currency === config.currency
      : true;

  const form = priceCurrencyValid ? (
    <EditListingMaterialFeeForm
      className={css.form}
      initialValues={initialValues}
      onSubmit={values => {
        const { materialFeePerWeek = null } = values;
        const updateValues = {
          publicData: {
            materialFeePerWeek: {
              amount: materialFeePerWeek.amount,
              currency: materialFeePerWeek.currency,
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

EditListingMaterialFeePanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingMaterialFeePanel.propTypes = {
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

export default EditListingMaterialFeePanel;

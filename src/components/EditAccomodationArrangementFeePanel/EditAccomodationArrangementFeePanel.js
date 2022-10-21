import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { EditAccomodationArrangementFeeForm } from '../../forms';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  unitDivisor,
  convertUnitToSubUnit,
} from '../../util/currency';
import css from './EditAccomodationArrangementFeePanel.module.css';

const { Money } = sdkTypes;

const EditAccomodationArrangementFeePanel = props => {
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
  if (listing?.id && listing?.arrangmentfee) {
    var fees = new Money(
      convertUnitToSubUnit(listing?.arrangmentfee?.fees?.amount / 100, unitDivisor(listing?.arrangmentfee?.fees?.currency)),
      listing?.arrangmentfee?.fees?.currency
    );
  } else {
    var { fees } = {
      fees: ""
    }
  }



  const isPublished = listing?.id && listing?.arrangmentfee;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditAccomodationArrangementFeePanel.title"
    />
  ) : (
    <FormattedMessage id="EditAccomodationArrangementFeePanel.createListingTitle" />
  );

  //const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  // const form = priceCurrencyValid ? (
  const form = <EditAccomodationArrangementFeeForm
    className={css.form}
    initialValues={{ fees }}
    onSubmit={values => {
      const fees = {
        amount: values?.fees?.amount,
        currency: values?.fees?.currency
      }
      const updatedValues = {
        fees
      }
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
  // ) : (
  //   <div className={css.priceCurrencyInvalid}>
  //     <FormattedMessage id="EditAccomodationArrangementFeePanel.listingPriceCurrencyInvalid" />
  //   </div>
  // );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditAccomodationArrangementFeePanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditAccomodationArrangementFeePanel.propTypes = {
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

export default EditAccomodationArrangementFeePanel;
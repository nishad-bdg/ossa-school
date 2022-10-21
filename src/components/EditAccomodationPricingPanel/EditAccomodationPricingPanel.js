import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { EditAccomodationPricingForm } from '../../forms';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  unitDivisor,
  convertUnitToSubUnit,
} from '../../util/currency';
import css from './EditAccomodationPricingPanel.module.css';

const { Money } = sdkTypes;

const EditAccomodationPricingPanel = props => {
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
  if (listing?.id && listing?.pricing) {

    //var { normal_season, high_season } = listing?.pricing;
    var high_season = new Money(
      convertUnitToSubUnit(listing?.pricing?.high_season?.amount / 100, unitDivisor(listing?.pricing?.high_season?.currency)),
      listing?.pricing?.high_season?.currency
    );

    var normal_season = new Money(
      convertUnitToSubUnit(listing?.pricing?.normal_season?.amount / 100, unitDivisor(listing?.pricing?.normal_season?.currency)),
      listing?.pricing?.normal_season?.currency
    );
  } else {
    var { normal_season, high_season } = {
      normal_season: "", high_season: ""
    }
  }



  const isPublished = listing?.id && listing?.pricing;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditAccomodationPricingPanel.title"
    />
  ) : (
    <FormattedMessage id="EditAccomodationPricingPanel.createListingTitle" />
  );

  //const priceCurrencyValid = price instanceof Money ? price.currency === config.currency : true;
  // const form = priceCurrencyValid ? (
  const form = <EditAccomodationPricingForm
    className={css.form}
    initialValues={{ normal_season, high_season }}
    onSubmit={values => {
      const high_season = {
        amount: values?.high_season?.amount,
        currency: values?.high_season?.currency
      }

      const normal_season = {
        amount: values?.normal_season?.amount,
        currency: values?.normal_season?.currency
      }

      const updatedValues = {
        high_season,
        normal_season
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
  //     <FormattedMessage id="EditAccomodationPricingPanel.listingPriceCurrencyInvalid" />
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

EditAccomodationPricingPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditAccomodationPricingPanel.propTypes = {
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

export default EditAccomodationPricingPanel;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { EditAirportTransferForm } from '../../forms';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  unitDivisor,
  convertUnitToSubUnit,
} from '../../util/currency';
import css from './EditAirportTransferPanel.module.css';

const { Money } = sdkTypes;

const EditAirportTransferPanel = props => {
  const {
    className,
    rootClassName,
    allOptionsSettinsData,
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
  if (allOptionsSettinsData && allOptionsSettinsData?.airporttransfer) {
    var one_way_price = new Money(
      convertUnitToSubUnit(allOptionsSettinsData?.airporttransfer?.one_way_price?.amount / 100, unitDivisor(allOptionsSettinsData?.airporttransfer?.one_way_price?.currency)),
      allOptionsSettinsData?.airporttransfer?.one_way_price?.currency
    );
    var return_route_price = new Money(
      convertUnitToSubUnit(allOptionsSettinsData?.airporttransfer?.return_route_price?.amount / 100, unitDivisor(allOptionsSettinsData?.airporttransfer?.return_route_price?.currency)),
      allOptionsSettinsData?.airporttransfer?.return_route_price?.currency
    );
    var round_trip_price = new Money(
      convertUnitToSubUnit(allOptionsSettinsData?.airporttransfer?.round_trip_price?.amount / 100, unitDivisor(allOptionsSettinsData?.airporttransfer?.round_trip_price?.currency)),
      allOptionsSettinsData?.airporttransfer?.round_trip_price?.currency
    );
  } else {
    var { one_way_price, return_route_price, round_trip_price } = {
      one_way_price: ""
    }
  }
  const panelTitle = 
    <FormattedMessage
      id="EditAirportTransferPanel.title"
    />

  const form = <EditAirportTransferForm
    className={css.form}
    initialValues={{ one_way_price, return_route_price, round_trip_price }}
    onSubmit={values => {
      const one_way_price = {
        amount: values?.one_way_price?.amount,
        currency: values?.one_way_price?.currency
      }

      const return_route_price = {
        amount: values?.return_route_price?.amount,
        currency: values?.return_route_price?.currency
      }
      const round_trip_price = {
        amount: values?.round_trip_price?.amount,
        currency: values?.round_trip_price?.currency
      }
      const updatedValues = {
        one_way_price, return_route_price, round_trip_price
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

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, any, object, string, bool } = PropTypes;

EditAirportTransferPanel.defaultProps = {
  className: null,
  rootClassName: null,
  allOptionsSettinsData: null,
};

EditAirportTransferPanel.propTypes = {
  className: string,
  rootClassName: string,
  allOptionsSettinsData: any,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditAirportTransferPanel;
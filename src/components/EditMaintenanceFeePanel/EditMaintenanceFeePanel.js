import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { EditMaintenanceFeeForm } from '../../forms';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  unitDivisor,
  convertUnitToSubUnit,
} from '../../util/currency';
import css from './EditMaintenanceFeePanel.module.css';

const { Money } = sdkTypes;

const EditMaintenanceFeePanel = props => {
  const {
    className,
    rootClassName,
    allFixedCostData,
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
  if (allFixedCostData && allFixedCostData?.maintenancefee) {
    var fees = new Money(
      convertUnitToSubUnit(allFixedCostData?.maintenancefee?.fees?.amount / 100, unitDivisor(allFixedCostData?.maintenancefee?.fees?.currency)),
      allFixedCostData?.maintenancefee?.fees?.currency
    );
  } else {
    var { fees } = {
      fees: ""
    }
  }
  const panelTitle = 
    <FormattedMessage
      id="EditMaintenanceFeePanel.title"
    />

  const form = <EditMaintenanceFeeForm
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

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      {form}
    </div>
  );
};

const { func, any, object, string, bool } = PropTypes;

EditMaintenanceFeePanel.defaultProps = {
  className: null,
  rootClassName: null,
  allFixedCostData: null,
};

EditMaintenanceFeePanel.propTypes = {
  className: string,
  rootClassName: string,
  allFixedCostData: any,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditMaintenanceFeePanel;
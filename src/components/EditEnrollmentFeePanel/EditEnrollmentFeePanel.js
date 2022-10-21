import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { EditEnrollmentFeeForm } from '../../forms';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  unitDivisor,
  convertUnitToSubUnit,
} from '../../util/currency';
import css from './EditEnrollmentFeePanel.module.css';

const { Money } = sdkTypes;

const EditEnrollmentFeePanel = props => {
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
  if (allFixedCostData && allFixedCostData?.enrollmentfee) {
    var fees = new Money(
      convertUnitToSubUnit(allFixedCostData?.enrollmentfee?.fees?.amount / 100, unitDivisor(allFixedCostData?.enrollmentfee?.fees?.currency)),
      allFixedCostData?.enrollmentfee?.fees?.currency
    );
  } else {
    var { fees } = {
      fees: ""
    }
  }
  const panelTitle = 
    <FormattedMessage
      id="EditEnrollmentFeePanel.title"
    />

  const form = <EditEnrollmentFeeForm
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

EditEnrollmentFeePanel.defaultProps = {
  className: null,
  rootClassName: null,
  allFixedCostData: null,
};

EditEnrollmentFeePanel.propTypes = {
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

export default EditEnrollmentFeePanel;
import React from 'react';
import { bool, func, object, shape, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '..';
import { EditHighSeasonForm } from '../../forms';
import { parseDateFromISO8601, stringifyDateToISO8601 } from '../../util/dates';

import css from './EditHighSeasonPanel.module.css';

const EditHighSeasonPanel = props => {
  const {
    className,
    rootClassName,
    allFixedCostData,
    availability,
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
  if (allFixedCostData && allFixedCostData?.highseason) {
    var highseason = {
      startDate: parseDateFromISO8601(allFixedCostData?.highseason?.startDate),
      endDate: parseDateFromISO8601(allFixedCostData?.highseason?.endDate),
    }
  } else {
    var highseason = {
      startDate: null, endDate: null
    }
  }
  return (
    <div className={classes}>
      <h1 className={css.title}>
          <FormattedMessage id="EditHighSeasonPanel.createListingTitle" />
      </h1>
      <EditHighSeasonForm
        className={css.form}
        initialValues={{highseason : highseason}}
        onSubmit={(values) => {
          if(values?.highseason?.startDate && values?.highseason?.endDate) {
            var highseason = {
              startDate: stringifyDateToISO8601(values?.highseason?.startDate),
              endDate: stringifyDateToISO8601(values?.highseason?.endDate)
            }
          } else {
            var highseason = {
              startDate: null, endDate: null
            }
          }
          const updatedValues = {
            ...highseason
          }
          onSubmit(updatedValues)
          // We save the default availability plan
          // I.e. this listing is available every night.
          // Exceptions are handled with live edit through a calendar,
          // which is visible on this panel.
          // onSubmit({ availabilityPlan });
        }}
        onChange={onChange}
        saveActionMsg={submitButtonText}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateError={errors.updateListingError}
        updateInProgress={updateInProgress}
      />
    </div>
  );
};

EditHighSeasonPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditHighSeasonPanel.propTypes = {
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

export default EditHighSeasonPanel;

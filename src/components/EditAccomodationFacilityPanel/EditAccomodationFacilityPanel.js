import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { EditAccomodationFacilitiesForm } from '../../forms';

import css from './EditAccomodationFacilityPanel.module.css';

const FEATURES_NAME = 'facility';

const EditAccomodationFacilityPanel = props => {
  const {
    rootClassName,
    className,
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
  //const currentListing = ensureListing(listing);
  if (listing.facilities) {

    var { facility } = listing.facilities;
  } else {
    var { facility } = {
      facility: []
    };
  }

  const isPublished = listing.id && listing?.facilities;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditAccomodationFacilityPanel.title"
    />
  ) : (
    <FormattedMessage id="EditAccomodationFacilityPanel.createListingTitle" />
  );

  //const amenities = facility;
  const initialValues = { facility: facility };
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditAccomodationFacilitiesForm
        className={css.form}
        name={FEATURES_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const { facility = [] } = values;
          const updatedValues = {
            facility: facility
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
    </div>
  );
};

EditAccomodationFacilityPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditAccomodationFacilityPanel.propTypes = {
  rootClassName: string,
  className: string,

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

export default EditAccomodationFacilityPanel;

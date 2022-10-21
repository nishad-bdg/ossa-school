import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { EditAccomodationRoomFacilitiesForm } from '../../forms';

import css from './EditAccomodationRoomFacilityPanel.module.css';

const FEATURES_NAME = 'room_facility';

const EditAccomodationRoomFacilityPanel = props => {
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
  if (listing?.roomfacilities) {

    var { room_facility } = listing?.roomfacilities;
  } else {
    var { room_facility } = {
      room_facility: []
    };
  }

  const isPublished = listing.id && listing?.facilities;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditAccomodationRoomFacilityPanel.title"
    />
  ) : (
    <FormattedMessage id="EditAccomodationRoomFacilityPanel.createListingTitle" />
  );

  //const amenities = facility;
  const initialValues = { room_facility: room_facility };
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditAccomodationRoomFacilitiesForm
        className={css.form}
        name={FEATURES_NAME}
        initialValues={initialValues}
        onSubmit={values => {
          const { room_facility = [] } = values;
          const updatedValues = {
            room_facility: room_facility
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

EditAccomodationRoomFacilityPanel.defaultProps = {
  rootClassName: null,
  className: null,
  listing: null,
};

const { bool, func, object, string } = PropTypes;

EditAccomodationRoomFacilityPanel.propTypes = {
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

export default EditAccomodationRoomFacilityPanel;

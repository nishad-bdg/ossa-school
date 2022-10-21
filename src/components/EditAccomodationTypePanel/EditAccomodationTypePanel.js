import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { EditAccomodationTypeForm } from '../../forms';
import config from '../../config';

import css from './EditAccomodationTypePanel.module.css';

const EditAccomodationTypePanel = props => {
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
  //const currentListing = ensureOwnAccomodation(listing);
  if (listing?.type) {
    var { roomType, broadType } = listing?.type;
  } else {
    var { roomType, broadType } = {
      roomType: "", broadType: ""
    };
  }

  const isPublished = listing?.id && listing?.type;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditAccomodationTypePanel.title"
      values={{ listingTitle: " type" }}
    />
  ) : (
    <FormattedMessage id="EditAccomodationTypePanel.createListingTitle" />
  );

  const broadTypeOptions = findOptionsForSelectFilter('broadType', config.custom.filters);
  const roomTypeOptions = findOptionsForSelectFilter('roomType', config.custom.filters);
  
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditAccomodationTypeForm
        className={css.form}
        initialValues={{ roomType, broadType }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { roomType, broadType } = values;
          const updateValues = {
            roomType: roomType.trim(),
            broadType: broadType.trim(),
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        roomTypes={roomTypeOptions}
        broadTypes={broadTypeOptions}
      />
    </div>
  );
};

EditAccomodationTypePanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditAccomodationTypePanel.propTypes = {
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

export default EditAccomodationTypePanel;

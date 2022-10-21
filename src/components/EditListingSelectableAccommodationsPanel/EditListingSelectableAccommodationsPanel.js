import React, { useState } from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { ensureOwnListing } from '../../util/data';
import { findOptionsForSelectFilter } from '../../util/search';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ListingLink } from '..';
import { EditListingSelectableAccommodationsForm } from '../../forms';
import config from '../../config';
import { compose } from 'redux';

import css from './EditListingSelectableAccommodationsPanel.module.css';

const EditListingSelectableAccommodationsPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    currentUser,
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
  const accommodations = publicData && publicData.accommodations ? publicData.accommodations : [{}];
  const isPublished = currentListing.id && currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingDescriptionPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingSelectableAccommodationsPanel.createListingTitle" />
  );

  const accommodationsOptions = findOptionsForSelectFilter('accommodations', config.custom.filters);

  return (
    <div className={classes}>
      {/* <div className={css.headerContainer}>
        <h1 className={css.title}>{panelTitle}</h1>
        <button className={css.increaseBtn} onClick={handleIncreaseClick}>
          +
        </button>
      </div> */}

      <EditListingSelectableAccommodationsForm
        className={css.form}
        saveActionMsg={submitButtonText}
        initialValues={{ accommodations: accommodations }}
        onSubmit={values => {
          const updatedValues = {
            publicData: {
              accommodations: values.accommodations,
            },
          };
          onSubmit(updatedValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        accommodationsOptions={accommodationsOptions}
        panelTitle={panelTitle}
        currentUser={currentUser}
      />
    </div>
  );
};

EditListingSelectableAccommodationsPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
  currentUser: null
};

EditListingSelectableAccommodationsPanel.propTypes = {
  className: string,
  rootClassName: string,
  intl: intlShape.isRequired,
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

// export default EditListingSelectableAccommodationsPanel;
export default compose(injectIntl)(EditListingSelectableAccommodationsPanel);

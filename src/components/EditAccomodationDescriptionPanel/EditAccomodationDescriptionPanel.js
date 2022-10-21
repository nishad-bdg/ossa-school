import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { EditAccomodationDescriptionForm } from '../../forms';
import config from '../../config';

import css from './EditAccomodationDescriptionPanel.module.css';

const EditAccomodationDescriptionPanel = props => {
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
  if (listing?.description) {
    var { description, title, address } = listing?.description;
  } else {
    var { description, title, address } = {
      description: "", title: "", address: ""
    };
  }

  const isPublished = listing?.id && listing?.description;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditAccomodationDescriptionPanel.title"
      values={{ listingTitle: " description" }}
    />
  ) : (
    <FormattedMessage id="EditAccomodationDescriptionPanel.createListingTitle" />
  );

  const categoryOptions = findOptionsForSelectFilter('category', config.custom.filters);
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditAccomodationDescriptionForm
        className={css.form}
        initialValues={{ title, description, address }}
        saveActionMsg={submitButtonText}
        onSubmit={values => {
          const { title, description, address } = values;
          const updateValues = {
            title: title.trim(),
            description,
            address: address.trim(),
          };

          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        categories={categoryOptions}
      />
    </div>
  );
};

EditAccomodationDescriptionPanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditAccomodationDescriptionPanel.propTypes = {
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

export default EditAccomodationDescriptionPanel;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingClassDetailForm } from '../../forms';
import { findOptionsForSelectFilter } from '../../util/search';
import config from '../../config';

import css from './EditListingClassDetailPanel.module.css';

const EditListingClassDetailPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    disabled,
    ready,
    onSubmit,
    onChange,
    panelJSONData,
    submitButtonText,
    panelUpdated,
    updateInProgress,
    errors,
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;
  
  const isPublished =
    currentListing.id &&
    currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingConditionsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingClassDetailPanel.createListingTitle" />
  );
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle} </h1>
      <EditListingClassDetailForm
        className={css.form}
        publicData={publicData}
        initialValues={{
          classesPerWeek: publicData.classesPerWeek,
          classesPerDay: publicData.classesPerDay,
          group: publicData.group,
          option: publicData.option,
          others: publicData.others,
          avgStudentPerClass: publicData.avgStudentPerClass,
          maxStudentPerClass: publicData.maxStudentPerClass
        }}
        onSubmit={values => {
          const {
            classesPerWeek = '',
            classesPerDay = '',
            group = '',
            option= '',
            others='',
            avgStudentPerClass = '',
            maxStudentPerClass = ''
          } = values;
          const updateValues = {
            publicData: {
              classesPerWeek,
              classesPerDay,
              group,
              option,
              others,
              avgStudentPerClass,
              maxStudentPerClass
            },
          };
          onSubmit(updateValues);
        }}
        onChange={onChange}
        disabled={disabled}
        ready={ready}
        saveActionMsg={submitButtonText}
        updated={panelUpdated}
        updateInProgress={updateInProgress}
        fetchErrors={errors}
        panelJSONData={panelJSONData}        
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingClassDetailPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingClassDetailPanel.propTypes = {
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
  panelJSONData: object.isRequired
};

export default EditListingClassDetailPanel;

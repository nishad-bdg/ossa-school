import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { LISTING_STATE_DRAFT } from '../../util/types';
import { ensureOwnListing } from '../../util/data';
import { ListingLink } from '../../components';
import { EditListingConditionsForm } from '../../forms';
import { findOptionsForSelectFilter } from '../../util/search';
import config from '../../config';
import css from './EditListingConditionsPanel.module.css';

const EditListingConditionsPanel = props => {
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
    panelJSONData
  } = props;

  const classes = classNames(rootClassName || css.root, className);
  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;
  const requiredLevelOptions = findOptionsForSelectFilter(
    'requiredLevel',
    config.custom.filters
  );
  const courseStartDateOptions = findOptionsForSelectFilter(
    'courseStartDates',
    config.custom.filters
  );

  const classDaysOptions = findOptionsForSelectFilter(
    'classDays',
    config.custom.filters
  );

  const isPublished =
    currentListing.id &&
    currentListing.attributes.state !== LISTING_STATE_DRAFT;
  const panelTitle = isPublished ? (
    <FormattedMessage
      id="EditListingConditionsPanel.title"
      values={{ listingTitle: <ListingLink listing={listing} /> }}
    />
  ) : (
    <FormattedMessage id="EditListingConditionsPanel.createListingTitle" />
  );

  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <EditListingConditionsForm
        className={css.form}
        publicData={publicData}
        initialValues={{
          requiredLevel: publicData.requiredLevel,
          minReqAge: publicData.minReqAge,
          courseStartDate: publicData.courseStartDate,
          lessionDuration: publicData.lessionDuration,
          classDaysStart: publicData.classDaysStart,
          classDaysEnd: publicData.classDaysEnd
        }}
        onSubmit={values => {
          const {
            requiredLevel = '',
            minReqAge = '',
            courseStartDate = '',
            lessionDuration = '',
            classDaysStart = '',
            classDaysEnd = ''
          } = values;
          const updateValues = {
            publicData: {
              requiredLevel,
              minReqAge,
              courseStartDate,
              lessionDuration,
              classDaysStart,
              classDaysEnd
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
        requiredLevels={requiredLevelOptions}
        courseStartDates={courseStartDateOptions}
        panelJSONData={panelJSONData}
        classDaysOptions={classDaysOptions}
      />
    </div>
  );
};

const { func, object, string, bool } = PropTypes;

EditListingConditionsPanel.defaultProps = {
  className: null,
  rootClassName: null,
  listing: null,
};

EditListingConditionsPanel.propTypes = {
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

export default EditListingConditionsPanel;

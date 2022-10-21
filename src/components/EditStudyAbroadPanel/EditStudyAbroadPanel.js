import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { EditStudyAbroadForm } from '../../forms';

import css from './EditStudyAbroadPanel.module.css';

const STUDYABROAD = 'tags';

const EditStudyAbroadPanel = props => {
  const {
    rootClassName,
    className,
    allTagSettinsData,
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
  //const currentListing = ensureListing(allTagSettinsData);
  if (allTagSettinsData?.studyabroad) {

    var { tags } = allTagSettinsData?.studyabroad;
  } else {
    var { tags } = {
      tags: []
    };
  }

  const panelTitle = <FormattedMessage id="EditStudyAbroadPanel.createListingTitle" />;
  const panelSubTitle = <FormattedMessage id="EditStudyAbroadPanel.createListingSubTitle" />;

  //const amenities = tags;
  const initialValues = { tags: tags };
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <p className="label">{panelSubTitle}</p>

      <EditStudyAbroadForm
        className={css.form}
        name={STUDYABROAD}
        initialValues={initialValues}
        onSubmit={values => {
          const { tags = [] } = values;
          const updatedValues = {
            tags: tags
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

EditStudyAbroadPanel.defaultProps = {
  rootClassName: null,
  className: null,
  allTagSettinsData: null,
};

const { bool, func, object, string } = PropTypes;

EditStudyAbroadPanel.propTypes = {
  rootClassName: string,
  className: string,

  // We cannot use propTypes.allTagSettinsData since the allTagSettinsData might be a draft.
  allTagSettinsData: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditStudyAbroadPanel;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { EditProgramsForm } from '../../forms';

import css from './EditProgramsPanel.module.css';

const PROGRAMS = 'tags';

const EditProgramsPanel = props => {
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
  if (allTagSettinsData?.programs) {

    var { tags } = allTagSettinsData?.programs;
  } else {
    var { tags } = {
      tags: []
    };
  }

  const panelTitle = <FormattedMessage id="EditProgramsPanel.createListingTitle" />;
  const panelSubTitle = <FormattedMessage id="EditProgramsPanel.createListingSubTitle" />;

  //const amenities = tags;
  const initialValues = { tags: tags };
  return (
    <div className={classes}>
      <h1 className={css.title}>{panelTitle}</h1>
      <p className="label">{panelSubTitle}</p>

      <EditProgramsForm
        className={css.form}
        name={PROGRAMS}
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

EditProgramsPanel.defaultProps = {
  rootClassName: null,
  className: null,
  allTagSettinsData: null,
};

const { bool, func, object, string } = PropTypes;

EditProgramsPanel.propTypes = {
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

export default EditProgramsPanel;

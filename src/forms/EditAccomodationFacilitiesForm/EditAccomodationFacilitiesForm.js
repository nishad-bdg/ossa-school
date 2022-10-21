import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import classNames from 'classnames';
import { Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
import config from '../../config';
import { Button, FieldCheckboxGroup, Form } from '../../components';

import css from './EditAccomodationFacilitiesForm.module.css';

const EditAccomodationFacilitiesFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{ ...arrayMutators }}
    render={formRenderProps => {
      const {
        disabled,
        ready,
        rootClassName,
        className,
        name,
        handleSubmit,
        pristine,
        saveActionMsg,
        updated,
        invalid,
        updateInProgress,
        fetchErrors,
        filterConfig,
      } = formRenderProps;
      const classes = classNames(rootClassName || css.root, className);
      const submitReady = ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || submitInProgress;

      const { updateListingError, showListingsError } = fetchErrors || {};
      const errorMessage = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditAccomodationFacilitiesForm.updateFailed" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditAccomodationFacilitiesForm.showListingFailed" />
        </p>
      ) : null;

      const options = findOptionsForSelectFilter('facilities', filterConfig);
      
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessage}
          {errorMessageShowListing}

          <FieldCheckboxGroup className={css.features} id={name} name={name} options={options} twoColumns={true} />

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditAccomodationFacilitiesFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  fetchErrors: null,
  filterConfig: config.custom.filters,
};

EditAccomodationFacilitiesFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  name: string.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  filterConfig: propTypes.filterConfig,
};

const EditAccomodationFacilitiesForm = EditAccomodationFacilitiesFormComponent;

export default EditAccomodationFacilitiesForm;

import React from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { Form, Button } from '../../components';
import CustomHowMuchTimeSelectField from './CustomHowMuchTimeSelectField';
import CustomHowToMoveSelectField from './CustomHowToMoveSelectField';

import css from './EditAccomodationDistanceForm.module.css';

const EditAccomodationDistanceFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        howToMoves,
        howMuchTimes,
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        countNumber,
      } = formRenderProps;

      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditAccomodationDistanceForm.titlePlaceholder',
      });
      const { updateListingError, createListingDraftError, showListingsError } = fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditAccomodationDistanceForm.updateFailed" />
        </p>
      ) : null;
      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditAccomodationDistanceForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditAccomodationDistanceForm.showListingFailed" />
        </p>
      ) : null;

      const classes = classNames(css.root, className);
      const submitReady = ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || submitInProgress;
      const formArray = Array.apply(null, { length: countNumber }).map(Number.call, Number)
      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}

          <label>{titlePlaceholderMessage}</label>
          {formArray.map((item) => (
            <div key={String(item)}>

              <CustomHowToMoveSelectField
                id={"howToMove" + (item + 1)}
                name={"howToMove" + (item + 1)}
                howToMoves={howToMoves}
                countNumber={item + 1}
                intl={intl}
              />

              <CustomHowMuchTimeSelectField
                id={"howMuchTime" + (item + 1)}
                name={"howMuchTime" + (item + 1)}
                howMuchTimes={howMuchTimes}
                countNumber={item + 1}
                intl={intl}
              />
            </div>
          )
          )}

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

EditAccomodationDistanceFormComponent.defaultProps = { className: null, fetchErrors: null };

EditAccomodationDistanceFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  howToMoves: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  howMuchTimes: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(EditAccomodationDistanceFormComponent);

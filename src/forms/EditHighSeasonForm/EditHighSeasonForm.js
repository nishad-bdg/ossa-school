import React, { Component } from 'react';
import { bool, func, object, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { FieldDateRangeController, Form, Button, FilterPopup, FilterPlain } from '../../components';

import css from './EditHighSeasonForm.module.css';

export class EditHighSeasonFormComponent extends Component {
  render() {
    return (
      <FinalForm
        {...this.props}
        render={formRenderProps => {
          const {
            className,
            rootClassName,
            disabled,
            ready,
            handleSubmit,
            invalid,
            pristine,
            saveActionMsg,
            updated,
            updateError,
            updateInProgress,
          } = formRenderProps;

          const errorMessage = updateError ? (
            <p className={css.error}>
              <FormattedMessage id="EditHighSeasonForm.updateFailed" />
            </p>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitReady = ready;
          const submitInProgress = updateInProgress;
          const submitDisabled = invalid || submitInProgress;
          //const { updateListingError, showListingsError } = fetchErrors || {};

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              {errorMessage}
              <div className={css.calendarWrapper}>
                {/* <EditHighSeasonDateRange
                  // availability={availability}
                  // availabilityPlan={availabilityPlan}
                  // listingId={listingId}
                /> */}
                <FieldDateRangeController
                  name="highseason"
                  controllerRef={node => {
                    this.plainControllerRef = node;
                  }}
                />
              </div>

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
  }
}

EditHighSeasonFormComponent.defaultProps = {
  updateError: null,
};

EditHighSeasonFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateError: propTypes.error,
  updateInProgress: bool.isRequired,
};

export default compose(injectIntl)(EditHighSeasonFormComponent);

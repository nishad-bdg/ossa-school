import { arrayOf, bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldSelect } from '../../components';
import css from './EditListingSelectableAccommodationsForm.module.css';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

const TITLE_MAX_LENGTH = 60;

const EditListingSelectableAccommodationsFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{
      ...arrayMutators,
    }}
    render={formRenderProps => {
      const {
        accommodationsOptions,
        className,
        disabled,
        ready,
        handleSubmit,
        currentUser,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
        values,
        panelTitle,
        form: {
          mutators: { push, pop },
        },
      } = formRenderProps;

      const { updateListingError, createListingDraftError, showListingsError } =
        fetchErrors || {};
      const errorMessageUpdateListing = updateListingError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.updateFailed" />
        </p>
      ) : null;

      // This error happens only on first tab (of EditListingWizard)
      const errorMessageCreateListingDraft = createListingDraftError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.createListingDraftError" />
        </p>
      ) : null;

      const errorMessageShowListing = showListingsError ? (
        <p className={css.error}>
          <FormattedMessage id="EditListingDescriptionForm.showListingFailed" />
        </p>
      ) : null;

      // const panelTitle = isPublished ? (
      //   <FormattedMessage
      //     id="EditListingDescriptionPanel.title"
      //     values={{ listingTitle: <ListingLink listing={listing} /> }}
      //   />
      // ) : (
      //   <FormattedMessage id="EditListingSelectableAccommodationsPanel.createListingTitle" />
      // );
      //const panelTitle = 'sdfdsf';

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const titleMessage = intl.formatMessage({
        id: 'EditListingSelectableAccommodationsForm.title',
      });

      const titlePlaceholderMessage = intl.formatMessage({
        id: 'EditListingSelectableAccommodationsForm.titlePlaceholder',
      });

      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingSelectableAccommodationsForm.titleRequired',
      });

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <div className={css.headerContainer}>
            <h1 className={css.title}>{panelTitle}</h1>
            <button
              className={css.increaseBtn}
              onClick={() => push('accommodations', {})}
            >
              +
            </button>
          </div>

          <FieldArray name="accommodations">
            {({ fields }) => (
              <div>
                {fields.map((name, index) => (
                  <div key={name} className={css.inputContainer}>
                    {/* {inputList.map(param => ( */}
                    <FieldSelect
                      className={css.title}
                      id={`accommodations${index}`}
                      name={`${name}.accomodation`}
                      label={titleMessage}
                      key={index}
                      validate={composeValidators(
                        required(titleRequiredMessage)
                      )}
                    >
                      <option value="" disabled>
                        {titlePlaceholderMessage}
                      </option>
                      {currentUser &&
                        currentUser.attributes.profile.publicData
                          .accomodation &&
                        currentUser.attributes.profile.publicData.accomodation.map(
                          (x, index) => (
                            <option key={x.id} value={JSON.stringify(x)}>
                              {x.description.title}
                            </option>
                          )
                        )}
                    </FieldSelect>
                    {fields.length > 0 && (
                      <button
                        className={css.increaseBtn}
                        onClick={() => fields.remove(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        X
                      </button>
                    )}
                    {/* ))} */}
                  </div>
                ))}
              </div>
            )}
          </FieldArray>

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

EditListingSelectableAccommodationsFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
  currentUser: null,
};

EditListingSelectableAccommodationsFormComponent.propTypes = {
  className: string,
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  // inputList: arrayOf(
  //   shape({
  //     accommodations: string.isRequired,
  //   })
  // ),
  fetchErrors: shape({
    createListingDraftError: propTypes.error,
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  accommodationsOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
};

export default compose(injectIntl)(
  EditListingSelectableAccommodationsFormComponent
);

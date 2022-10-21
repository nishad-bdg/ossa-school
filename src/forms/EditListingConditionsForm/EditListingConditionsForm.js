import { arrayOf, bool, func, shape, string, number } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { maxLength, required, composeValidators } from '../../util/validators';
import { Form, Button, FieldSelect } from '../../components';

import css from './EditListingConditionsForm.module.css';

const TITLE_MAX_LENGTH = 60;

const EditListingConditionsFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        panelJSONData,
        courseStartDates,
        classDaysOptions,
        requiredLevels,
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
      } = formRenderProps;

      const requiredLevelTitle = intl.formatMessage({
        id: 'EditListingConditions.requiredLevelTitle',
      });

      const requiredMinAgeTitle = intl.formatMessage({
        id: 'EditListingConditions.requiredMinAgeTitle',
      });

      const requiredStartDateTitle = intl.formatMessage({
        id: 'EditListingConditions.requiredStartDateTitle',
      });

      const requiredLessonDurationTitle = intl.formatMessage({
        id: 'EditListingConditions.requiredLessonDurationTitle',
      });

      const requiredClassDaysStartTitle = intl.formatMessage({
        id: 'EditListingConditions.requiredClassDaysStartTitle',
      });

      const requiredClassDaysEndTitle = intl.formatMessage({
        id: 'EditListingConditions.requiredClassDaysEndTitle',
      });

      const requiredClassDaysStartPlaceholder = intl.formatMessage({
        id: 'EditListingConditions.requiredClassDaysStartPlaceholder',
      });

      const requiredClassDaysEndPlaceholder = intl.formatMessage({
        id: 'EditListingConditions.requiredClassDaysEndPlaceholder',
      });

      const requiredLevelPlaceholder = intl.formatMessage({
        id: 'EditListingConditions.requiredLevelPlaceholder',
      });

      const requiredStartDatePlaceholder = intl.formatMessage({
        id: 'EditListingConditions.requiredStartDatePlaceholder',
      });

      const requiredLessonDurationPlaceholder = intl.formatMessage({
        id: 'EditListingConditions.requiredLessonDurationPlaceholder',
      });

      const titleRequiredMessage = intl.formatMessage({
        id: 'EditListingConditionsForm.titleRequired',
      });

      const titleRequiredMinAgeMessage = intl.formatMessage({
        id: 'EditListingConditionsForm.titleRequiredMinAge',
      });

      const titleRequiredClassDaysStartMessage = intl.formatMessage({
        id: 'EditListingConditionsForm.titleRequiredClassDaysStart',
      });

      const titleRequiredClassDaysEndMessage = intl.formatMessage({
        id: 'EditListingConditionsForm.titleRequiredClassDaysEnd',
      });

      const titleRequiredLessonDurationMessage = intl.formatMessage({
        id: 'EditListingConditionsForm.titleRequiredLessonDuration',
      });

      const titleRequiredStartDateMessage = intl.formatMessage({
        id: 'EditListingConditionsForm.titleRequiredStartDate',
      });

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

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;

      const ageArr = [];
      const lessionDurationsArr = [];

      for (
        let i = panelJSONData.conditions.minAgeRange.min;
        i <= panelJSONData.conditions.minAgeRange.max;
        i++
      ) {
        ageArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      for (
        let i = panelJSONData.conditions.lessionDurationRange.min;
        i <= panelJSONData.conditions.lessionDurationRange.max;
        i++
      ) {
        lessionDurationsArr.push(
          <option key={i} value={i}>
            {i} mins
          </option>
        );
      }

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          <FieldSelect
            className={css.title}
            id="requiredLevel"
            name="requiredLevel"
            label={requiredLevelTitle}
            validate={composeValidators(required(titleRequiredMessage))}
          >
            <option value="" disabled>
              {requiredLevelPlaceholder}
            </option>
            {requiredLevels.map(x => (
              <option key={x.key} value={x.value}>
                {x.label}
              </option>
            ))}
          </FieldSelect>

          <FieldSelect
            className={css.title}
            id="minReqAge"
            name="minReqAge"
            label={requiredMinAgeTitle}
            validate={composeValidators(required(titleRequiredMinAgeMessage))}
          >
            <option value="" disabled>
              {requiredStartDatePlaceholder}
            </option>
            {ageArr}
          </FieldSelect>

          {/* Start Date */}
          <FieldSelect
            className={css.title}
            id="courseStartDate"
            name="courseStartDate"
            label={requiredStartDateTitle}
            validate={composeValidators(
              required(titleRequiredStartDateMessage)
            )}
          >
            <option value="" disabled>
              {requiredStartDatePlaceholder}
            </option>
            {courseStartDates.map(x => (
              <option key={x.key} value={x.value}>
                {x.label}
              </option>
            ))}
          </FieldSelect>
          {/* Start Date */}

          {/* Lession duration */}
          <FieldSelect
            className={css.title}
            id="lessionDuration"
            name="lessionDuration"
            label={requiredLessonDurationTitle}
            validate={composeValidators(
              required(titleRequiredLessonDurationMessage)
            )}
          >
            <option value="" disabled>
              {requiredLessonDurationPlaceholder}
            </option>
            {lessionDurationsArr}
          </FieldSelect>
          {/* Lesson duration */}

          {/* Class Days */}
          <FieldSelect
            className={css.title}
            id="classDaysStart"
            name="classDaysStart"
            label={requiredClassDaysStartTitle}
            validate={composeValidators(
              required(titleRequiredClassDaysStartMessage)
            )}
          >
            <option value="" disabled>
              {requiredClassDaysStartPlaceholder}
            </option>
            {classDaysOptions.map(x => (
              <option key={x.key} value={x.value}>
                {x.label}
              </option>
            ))}
          </FieldSelect>
          {/* Class Days */}
          {/* Class Days End */}
          <FieldSelect
            className={css.title}
            id="classDaysEnd"
            name="classDaysEnd"
            label={requiredClassDaysEndTitle}
            validate={composeValidators(
              required(titleRequiredClassDaysEndMessage)
            )}
          >
            <option value="" disabled>
              {requiredClassDaysEndPlaceholder}
            </option>
            {classDaysOptions.map(x => (
              <option key={x.key} value={x.value}>
                {x.label}
              </option>
            ))}
          </FieldSelect>
          {/* Class days ends */}

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

EditListingConditionsFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
};

EditListingConditionsFormComponent.propTypes = {
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
  requiredLevels: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  lessionDurationRange: shape({
    min: number.isRequired,
    max: number.isRequired,
  }),

  courseStartDates: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  classDaysOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),
  panelJSONData: shape({
    conditions: shape({
      minAgeRange: shape({
        min: number.isRequired,
        max: number.isRequired,
      }),
      lessionDurationRange: shape({
        min: number.isRequired,
        max: number.isRequired,
      }),
    }),
  }),
};

export default compose(injectIntl)(EditListingConditionsFormComponent);

import { arrayOf, bool, func, shape, string, number } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { propTypes } from '../../util/types';
import { required, composeValidators } from '../../util/validators';
import { Form, Button, FieldSelect } from '../../components';

import css from './EditListingClassDetailForm.module.css';

const TITLE_MAX_LENGTH = 60;

const EditListingClassDetailFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        panelJSONData,
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

      const requiredClassPerWeekTitle = intl.formatMessage({
        id: 'EditListingClassDetail.requiredClassesPerWeekTitle',
      });
      const requiredClassPerWeekPlaceholder = intl.formatMessage({
        id: 'EditListingClassDetail.requiredClassPerWeekPlaceholder',
      });
      const requiredClassPerWeekMessage = intl.formatMessage({
        id: 'EditListingClassDetailForm.classesPerWeekTitleRequired',
      });

      const requiredClassPerDayTitle = intl.formatMessage({
        id: 'EditListingClassDetail.requiredClassPerDayTitle',
      });
      const requiredClassPerDayPlaceholder = intl.formatMessage({
        id: 'EditListingClassDetail.requiredClassPerDayPlaceholder',
      });
      const requiredClassPerDayMessage = intl.formatMessage({
        id: 'EditListingClassDetailForm.classesPerDayTitleRequired',
      });

      const requiredGroupTitle = intl.formatMessage({
        id: 'EditListingClassDetail.requiredGroupTitle',
      });
      const requiredClassGroupPlaceholder = intl.formatMessage({
        id: 'EditListingClassDetail.requiredClassGroupPlaceholder',
      });
      const requiredClassGroupMessage = intl.formatMessage({
        id: 'EditListingClassDetailForm.classesGroupTitleRequired',
      });

      const requiredOptionTitle = intl.formatMessage({
        id: 'EditListingClassDetail.requiredOptionTitle',
      });
      const requiredClassOptionPlaceholder = intl.formatMessage({
        id: 'EditListingClassDetail.requiredClassOptionPlaceholder',
      });
      const requiredClassOptionMessage = intl.formatMessage({
        id: 'EditListingClassDetailForm.classesOptionTitleRequired',
      });

      // others
      const requiredOthersTitle = intl.formatMessage({
        id: 'EditListingClassDetail.requiredOthersTitle',
      });
      const requiredClassOthersPlaceholder = intl.formatMessage({
        id: 'EditListingClassDetail.requiredClassOthersPlaceholder',
      });
      const requiredClassOthersMessage = intl.formatMessage({
        id: 'EditListingClassDetailForm.classesOthersTitleRequired',
      });

      //others

      const requiredAvgStudentsPerClassTitle = intl.formatMessage({
        id: 'EditListingClassDetail.requiredAvgStudenstPerClassTitle',
      });
      const requiredClassAvgStudentsPerClassPlaceholder = intl.formatMessage({
        id:
          'EditListingClassDetail.requiredClassAvgStudentsPerClassPlaceholder',
      });
      const requiredClassAvgStudentsPerClassMessage = intl.formatMessage({
        id:
          'EditListingClassDetailForm.classesAvgStudentsPerClassTitleRequired',
      });

      const requiredMaxStudentsPerClassTitle = intl.formatMessage({
        id: 'EditListingClassDetail.requiredMaxStudenstPerClassTitle',
      });
      const requiredClassMaxStudentsPerClassPlaceholder = intl.formatMessage({
        id:
          'EditListingClassDetail.requiredClassMaxStudentsPerClassPlaceholder',
      });
      const requiredClassMaxStudentsPerClassMessage = intl.formatMessage({
        id:
          'EditListingClassDetailForm.classesMaxStudentsPerClassTitleRequired',
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

      const classesPerWeekRangeArr = [];
      const classesPerDayRangeArr = [];
      const groupRangeArr = [];
      const optionRangeArr = [];
      const othersRangeArr = [];
      const avgStudentsPerClassRangeArr = [];
      const maxStudentsPerClassRangeArr = [];

      for (
        let i = panelJSONData.classDetail.perWeekRange.min;
        i <= panelJSONData.classDetail.perWeekRange.max;
        i++
      ) {
        classesPerWeekRangeArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      for (
        let i = panelJSONData.classDetail.perDayRange.min;
        i <= panelJSONData.classDetail.perDayRange.max;
        i++
      ) {
        classesPerDayRangeArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      for (
        let i = panelJSONData.classDetail.groupRange.min;
        i <= panelJSONData.classDetail.groupRange.max;
        i++
      ) {
        groupRangeArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      for (
        let i = panelJSONData.classDetail.optionRange.min;
        i <= panelJSONData.classDetail.optionRange.max;
        i++
      ) {
        optionRangeArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      for (
        let i = panelJSONData.classDetail.avgStudentsPerClassRange.min;
        i <= panelJSONData.classDetail.avgStudentsPerClassRange.max;
        i++
      ) {
        avgStudentsPerClassRangeArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      // others range
      for (
        let i = panelJSONData.classDetail.othersRange.min;
        i <= panelJSONData.classDetail.othersRange.max;
        i++
      ) {
        othersRangeArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      // others range

      for (
        let i = panelJSONData.classDetail.maxStudentsPerClassRange.min;
        i <= panelJSONData.classDetail.maxStudentsPerClassRange.max;
        i++
      ) {
        maxStudentsPerClassRangeArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }

      return (
        <Form className={classes} onSubmit={handleSubmit}>
          {errorMessageCreateListingDraft}
          {errorMessageUpdateListing}
          {errorMessageShowListing}
          {/* Classes per week */}
          <FieldSelect
            className={css.title}
            id="classesPerWeek"
            name="classesPerWeek"
            label={requiredClassPerWeekTitle}
            validate={composeValidators(required(requiredClassPerWeekMessage))}
          >
            <option value="" disabled>
              {requiredClassPerWeekPlaceholder}
            </option>
            {classesPerWeekRangeArr}
          </FieldSelect>
          {/* Classes per week */}

          {/* Classes per day */}
          <FieldSelect
            className={css.title}
            id="classesPerDay"
            name="classesPerDay"
            label={requiredClassPerDayTitle}
            validate={composeValidators(required(requiredClassPerDayMessage))}
          >
            <option value="" disabled>
              {requiredClassPerDayPlaceholder}
            </option>
            {classesPerWeekRangeArr}
          </FieldSelect>
          {/* Classes per day */}

          {/* Groups */}
          <FieldSelect
            className={css.title}
            id="group"
            name="group"
            label={requiredGroupTitle}
            validate={composeValidators(required(requiredClassGroupMessage))}
          >
            <option value="" disabled>
              {requiredClassGroupPlaceholder}
            </option>
            {groupRangeArr}
          </FieldSelect>
          {/* Groups */}

          {/* option range */}
          <FieldSelect
            className={css.title}
            id="option"
            name="option"
            label={requiredOptionTitle}
            validate={composeValidators(required(requiredClassOptionMessage))}
          >
            <option value="" disabled>
              {requiredClassOptionPlaceholder}
            </option>
            {optionRangeArr}
          </FieldSelect>
          {/* option range */}

          {/* others */}
          <FieldSelect
            className={css.title}
            id="others"
            name="others"
            label={requiredOthersTitle}
            validate={composeValidators(required(requiredClassOthersMessage))}
          >
            <option value="" disabled>
              {requiredClassOthersPlaceholder}
            </option>
            {optionRangeArr}
          </FieldSelect>
          {/* others range */}

          {/* average student per class */}
          <FieldSelect
            className={css.title}
            id="avgStudentPerClass"
            name="avgStudentPerClass"
            label={requiredAvgStudentsPerClassTitle}
            validate={composeValidators(
              required(requiredClassAvgStudentsPerClassMessage)
            )}
          >
            <option value="" disabled>
              {requiredClassAvgStudentsPerClassPlaceholder}
            </option>
            {avgStudentsPerClassRangeArr}
          </FieldSelect>
          {/* average student per class */}

          {/* max students per class */}
          <FieldSelect
            className={css.title}
            id="maxStudentPerClass"
            name="maxStudentPerClass"
            label={requiredMaxStudentsPerClassTitle}
            validate={composeValidators(
              required(requiredClassMaxStudentsPerClassMessage)
            )}
          >
            <option value="" disabled>
              {requiredClassMaxStudentsPerClassPlaceholder}
            </option>
            {maxStudentsPerClassRangeArr}
          </FieldSelect>
          {/* max students per class */}

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

EditListingClassDetailFormComponent.defaultProps = {
  className: null,
  fetchErrors: null,
};

EditListingClassDetailFormComponent.propTypes = {
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

  panelJSONData: shape({
    classDetail: shape({
      groupRange: shape({
        min: number.isRequired,
        max: number.isRequired,
      }),
      perDayRange: shape({
        min: number.isRequired,
        max: number.isRequired,
      }),
      perWeekRange: shape({
        min: number.isRequired,
        max: number.isRequired,
      }),
      optionRange: shape({
        min: number.isRequired,
        max: number.isRequired,
      }),
      othersRange: shape({
        min: number.isRequired,
        max: number.isRequired,
      }),
      avgStudentsPerClassRange: shape({
        min: number.isRequired,
        max: number.isRequired,
      }),
      maxStudentsPerClassRange: shape({
        min: number.isRequired,
        max: number.isRequired,
      }),
    }),
  }),
};

export default compose(injectIntl)(EditListingClassDetailFormComponent);

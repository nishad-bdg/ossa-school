import React, { Component } from 'react';
import { string, bool, arrayOf, array, func } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm, FormSpy } from 'react-final-form';
import classNames from 'classnames';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { required, bookingDatesRequired, composeValidators } from '../../util/validators';
import { START_DATE, END_DATE } from '../../util/dates';
import { propTypes } from '../../util/types';
import moment from 'moment';
import { Form, FieldDateRangeInput,FieldDateInput, PrimaryButton } from '../../components';
import CustomSelectField from './CustomSelectField'
import config from '../../config';
import { findOptionsForSelectFilter } from '../../util/search';

import css from './ApplicationFlowForm.module.css';
const identity = v => v;

export class ApplicationFlowFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { focusedInput: null, selectedRoomType: "" };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.onFocusedInputChange = this.onFocusedInputChange.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  // Function that can be passed to nested components
  // so that they can notify this component when the
  // focused input changes.
  onFocusedInputChange(focusedInput) {
    this.setState({ focusedInput });
  }

  // In case start or end date for the booking is missing
  // focus on that input, otherwise continue with the
  // default handleSubmit function.
  handleFormSubmit(e) {
    const { startDate, endDate } = e.bookingDates || {};
    if (!startDate) {
      e.preventDefault();
      this.setState({ focusedInput: START_DATE });
    } else if (!endDate) {
      e.preventDefault();
      this.setState({ focusedInput: END_DATE });
    } else {
      this.props.onSubmit(e);
    }
  }

  // When the values of the form are updated we need to fetch
  // lineItems from FTW backend for the EstimatedTransactionMaybe
  // In case you add more fields to the form, make sure you add
  // the values here to the bookingData object.
  handleOnChange(formValues) {
    const { startDate, endDate } =
      formValues.values && formValues.values.bookingDates ? formValues.values.bookingDates : {};
    const listingId = this.props.listingId;
    const isOwnListing = this.props.isOwnListing;

    if (startDate && endDate && !this.props.fetchLineItemsInProgress) {
      this.props.onFetchTransactionLineItems({
        bookingData: { startDate, endDate },
        listingId,
        isOwnListing,
      });
    }
  }

  render() {
    const { rootClassName, className,listing, ...rest } = this.props;
    const classes = classNames(rootClassName || css.root, className);
    const roomTypeOptions = findOptionsForSelectFilter('roomType', config.custom.filters);
    const airportTransportOptions = [
      {key: 'one_way_outbound', label:"One way (outbound)"},
      {key: 'one_way_return_route', label:"One way (return route)"},
      {key: 'round_trip', label:"Round trip"},]
    const localSupportOptions = [
      {key: 'option_1', label:"なし"},
      {key: 'oprion_2', label:"あり-4週間"},
      {key: 'option_3', label:"あり-4週間"},]
    const minWeeks = Number(listing?.attributes?.publicData?.minDuration)
    const maxWeeks = Number(listing?.attributes?.publicData?.maxDuration)
    const weeksOptions = []

    for(let i=minWeeks; i<=maxWeeks; i++){
      weeksOptions.push({ key: i+'_weeks', label: i+' Weeks'})
    }

    return (
      <FinalForm
        {...rest}
        onSubmit={this.handleFormSubmit}
        render={fieldRenderProps => {
          const {
            endDatePlaceholder,
            startDatePlaceholder,
            formId,
            titleClasses,
            className,
            handleSubmit,
            intl,
            isOwnListing,
            submitButtonWrapperClassName,
            unitType,
            values,
            fetchTimeSlotsError,
            timeSlots,
            lineItems,
            fetchLineItemsInProgress,
            fetchLineItemsError,
          } = fieldRenderProps;
          
          // This is the place to collect breakdown estimation data.
          // Note: lineItems are calculated and fetched from FTW backend
          // so we need to pass only booking data that is needed otherwise
          // If you have added new fields to the form that will affect to pricing,
          // you need to add the values to handleOnChange function
          const { startDate, endDate } = values && values.bookingDates ? values.bookingDates : {};

          const schoolStartLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingStartTitle',
          });
          const schoolEndLabel = intl.formatMessage({
            id: 'BookingDatesForm.bookingEndTitle',
          });
          const startDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidStartDate',
          });
          const endDateErrorMessage = intl.formatMessage({
            id: 'FieldDateRangeInput.invalidEndDate',
          });
          const timeSlotsError = fetchTimeSlotsError ? (
            <p className={css.sideBarError}>
              <FormattedMessage id="BookingDatesForm.timeSlotsError" />
            </p>
          ) : null;
          const midleTitle = intl.formatMessage({ id: 'ApplicationFlowPanel.midleTitle' })
          const submitButtonClasses = classNames(
            submitButtonWrapperClassName || css.submitButtonWrapper
          );

          const dateFormatOptions = {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          };

          const now = moment();
          const today = now.startOf('day').toDate();
          const tomorrow = now
            .startOf('day')
            .add(1, 'days')
            .toDate();
          const startDatePlaceholderText =
            startDatePlaceholder || intl.formatDate(today, dateFormatOptions);
          const endDatePlaceholderText =
            endDatePlaceholder || intl.formatDate(tomorrow, dateFormatOptions);

          return (
            <Form onSubmit={handleSubmit} className={classes} enforcePagePreloadFor="CheckoutPage">
              <FormSpy
                subscription={{ values: true }}
                onChange={values => {
                  this.handleOnChange(values);
                }}
              />

              <CustomSelectField
                  id="noOfWeeks"
                  name="noOfWeeks"
                  placeholder={intl.formatMessage({
                    id: 'ApplicationFlowForm.noWeeksPlaceholder',
                  })}
                  requiredMessage={
                    intl.formatMessage({
                      id: 'ApplicationFlowForm.requiredMessage',
                    })}
                  label={intl.formatMessage({
                      id: 'ApplicationFlowForm.noWeeksLabel',
                    })}
                  options={weeksOptions}
                  intl={intl}
                />

              {/* <FieldDateRangeInput
                className={css.bookingDates}
                name="schoolStartDates"
                unitType={unitType}
                startDateId={`${formId}.schoolStartDate`}
                startDateLabel={schoolStartLabel}
                startDatePlaceholderText={startDatePlaceholderText}
                endDateId={`${formId}.schoolEndDate`}
                endDateLabel={null}
                endDatePlaceholderText={endDatePlaceholderText}
                focusedInput={this.state.focusedInput}
                onFocusedInputChange={this.onFocusedInputChange}
                format={identity}
                timeSlots={timeSlots}
                useMobileMargins
                validate={composeValidators(
                  required(intl.formatMessage({
                    id: 'ApplicationFlowForm.requiredMessage',
                  })),
                  bookingDatesRequired(startDateErrorMessage, endDateErrorMessage)
                )}
                disabled={fetchLineItemsInProgress}
              /> */}
              <FieldDateInput
                  name="schoolStartDate"
                  label={intl.formatMessage({
                    id: 'ApplicationFlowForm.schoolStartLabel',
                  })}
                  id={`${formId}.schoolStartDate`}
                  format={identity}
                  placeholderText={intl.formatMessage({
                    id: 'ApplicationFlowForm.schoolStartPlaceholder',
                  })}
                  timeSlots={timeSlots}
                  controllerRef={node => {
                    this.plainControllerRef = node;
                  }}
                />
              <CustomSelectField
                  id="roomTypes"
                  name="roomTypes"
                  handleOnchange={values => {
                    this.setState({ selectedRoomType: values });
                  }}
                  placeholder={intl.formatMessage({
                    id: 'ApplicationFlowForm.roomTypesPlaceholder',
                  })}
                  requiredMessage={
                    intl.formatMessage({
                      id: 'ApplicationFlowForm.requiredMessage',
                    })}
                  label={intl.formatMessage({
                      id: 'ApplicationFlowForm.roomTypesLabel',
                    })}
                  options={roomTypeOptions}
                  intl={intl}
                />
                {this.state.selectedRoomType === 'single_room' &&
                <CustomSelectField
                  id="weeksOfStay"
                  name="weeksOfStay"
                  placeholder={intl.formatMessage({
                    id: 'ApplicationFlowForm.weeksOfStayPlaceholder',
                  })}
                  requiredMessage={
                    intl.formatMessage({
                      id: 'ApplicationFlowForm.requiredMessage',
                    })}
                  label={intl.formatMessage({
                      id: 'ApplicationFlowForm.weeksOfStayLabel',
                    })}
                  options={weeksOptions}
                  intl={intl}
                />
                  }
                {this.state.selectedRoomType === 'double_room' &&
                <FieldDateInput
                  name="startDayStayDate"
                  label={intl.formatMessage({
                    id: 'ApplicationFlowForm.startDayOfStayLabel',
                  })}
                  id={`${formId}.startDayStayDate`}
                  format={identity}
                  placeholderText={intl.formatMessage({
                    id: 'ApplicationFlowForm.startDayOfStayPlaceholder',
                  })}
                  timeSlots={timeSlots}
                  controllerRef={node => {
                    this.plainControllerRef = node;
                  }}
                />
                }
                <div>
                  <br/>
                  <h2 className={titleClasses}>{midleTitle}</h2>
                </div>
                <CustomSelectField
                  id="airportTransport"
                  name="airportTransport"
                  placeholder={intl.formatMessage({
                    id: 'ApplicationFlowForm.airportTransportPlaceholder',
                  })}
                  requiredMessage={
                    intl.formatMessage({
                      id: 'ApplicationFlowForm.requiredMessage',
                    })}
                  label={intl.formatMessage({
                      id: 'ApplicationFlowForm.airportTransportLabel',
                    })}
                  options={airportTransportOptions}
                  intl={intl}
                />
                
                <CustomSelectField
                  id="localSupport"
                  name="localSupport"
                  placeholder={intl.formatMessage({
                    id: 'ApplicationFlowForm.localSupportPlaceholder',
                  })}
                  requiredMessage={
                    intl.formatMessage({
                      id: 'ApplicationFlowForm.requiredMessage',
                    })}
                  label={intl.formatMessage({
                      id: 'ApplicationFlowForm.localSupportLabel',
                    })}
                  options={localSupportOptions}
                  intl={intl}
                />
                
              <div className={submitButtonClasses}>
                <PrimaryButton type="submit">
                  <FormattedMessage id="ApplicationFlowPanel.requestToBook" />
                </PrimaryButton>
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

ApplicationFlowFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  submitButtonWrapperClassName: null,
  isOwnListing: false,
  startDatePlaceholder: null,
  endDatePlaceholder: null,
  timeSlots: null,
  lineItems: null,
  fetchLineItemsError: null,
};

ApplicationFlowFormComponent.propTypes = {
  rootClassName: string,
  className: string,
  submitButtonWrapperClassName: string,

  unitType: propTypes.bookingUnitType.isRequired,
  isOwnListing: bool,
  timeSlots: arrayOf(propTypes.timeSlot),

  onFetchTransactionLineItems: func.isRequired,
  lineItems: array,
  fetchLineItemsInProgress: bool.isRequired,
  fetchLineItemsError: propTypes.error,

  // from injectIntl
  intl: intlShape.isRequired,

  // for tests
  startDatePlaceholder: string,
  endDatePlaceholder: string,
};

const ApplicationFlowForm = compose(injectIntl)(ApplicationFlowFormComponent);
ApplicationFlowForm.displayName = 'BookingDatesForm';

export default ApplicationFlowForm;

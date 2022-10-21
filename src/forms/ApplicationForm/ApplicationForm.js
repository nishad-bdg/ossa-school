import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import moment from 'moment';
import { propTypes } from '../../util/types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm, Field } from 'react-final-form';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import config from '../../config';
import * as validators from '../../util/validators';
import getCountryCodes from '../../translations/countryCodes';
import { isDate } from '../../util/dates';
import {
	nonEmptyArray,
	composeValidators,
	required,
	bookingDateRequired
} from '../../util/validators';

import {
	Form,
	PrimaryButton,
	FieldTextInput,
	FieldDateInput,
	FieldSelect,
	FieldPhoneNumberInput,
	ValidationError,
	FieldCheckbox,
	PricePanel
} from '../../components';

import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { OnChange } from 'react-final-form-listeners';

import css from './ApplicationForm.module.css';

const identity = v => v;
const KEY_CODE_ENTER = 13;

const ApplicationFormComponent = props => {

	return (
		<FinalForm
			{...props}
			mutators={{
				...arrayMutators
			}}
			render={fieldRenderProps => {
				const {
					form,
					currentUser,
					rootClassName,
					className,
					countryCitizenOptions,
					sexOptions,
					englishLevelOptions,
					questionFamilyOptions,
					questionSmokerOptions,
					questionPetsOptions,
					destinationOptions,
					visaTypeOptions,
					paymentOptions,
					formId,
					handleSubmit,
					invalid,
					intl,
					onOpenTermsOfService,
					lineItemsData,
					form: {
						mutators: { push, pop },
					},
				} = fieldRenderProps;

		


				
				const handleTermsKeyUp = e => {
					// Allow click action with keyboard like with normal links
					if (e.keyCode === KEY_CODE_ENTER) {
						onOpenTermsOfService();
					}
				};
				const termsLink = (
					<span
						className={css.termsLink}
						onClick={onOpenTermsOfService}
						role="button"
						tabIndex="0"
						onKeyUp={handleTermsKeyUp}
					>
						<FormattedMessage id="ApplicationForm.termsAndConditionsLinkText" />
					</span>
				);


				const formatIntlKey = (key, field) => {
					return intl.formatMessage({ id: key }, { idName: field })
				}

				const user = ensureCurrentUser(currentUser);

				// Intl Keys
				// name
				const nameLabel = formatIntlKey('ApplicationForm.nameLabel');
				const namePlaceholder = formatIntlKey('ApplicationForm.namePlaceholder');
				const nameRequiredMessage = formatIntlKey('ApplicationForm.nameRequired');
				// surname
				const surnameLabel = formatIntlKey('ApplicationForm.surnameLabel');
				const surnamePlaceholder = formatIntlKey('ApplicationForm.surnamePlaceholder');
				const surnameRequiredMessage = formatIntlKey('ApplicationForm.surnameRequired');
				// daybirth
				const dayBirthLabel = formatIntlKey('ApplicationForm.dayBirthLabel');
				const dayBirthPlaceholder = formatIntlKey('ApplicationForm.dayBirthPlaceholder');
				const dayBirthRequiredMessage = formatIntlKey('ApplicationForm.dayBirthRequired');
				const dayBirthInvalidMessage = formatIntlKey('ApplicationForm.dayBirthInvalid');
				// email
				const emailLabel = formatIntlKey('ApplicationForm.emailLabel');
				const emailPlaceholder = formatIntlKey('ApplicationForm.emailPlaceholder');
				const emailRequiredMessage = formatIntlKey('ApplicationForm.emailRequired');
				const emailInvalidMessage = formatIntlKey('ApplicationForm.emailInvalid');
				// country citizenship
				const countryCitizenLabel = formatIntlKey('ApplicationForm.countryCitizenLabel');
				const countryCitizenPlaceholder = formatIntlKey('ApplicationForm.countryCitizenPlaceholder');
				const countryCitizenRequiredMessage = formatIntlKey('ApplicationForm.countryCitizenRequiredMessage');
				// sex select
				const sexLabel = formatIntlKey('ApplicationForm.sexLabel');
				const sexPlaceholder = formatIntlKey('ApplicationForm.sexPlaceholder');
				const sexRequiredMessage = formatIntlKey('ApplicationForm.sexRequiredMessage');
				// address 
				const addressLabel = formatIntlKey('ApplicationForm.addressLabel');
				const addressLine1Placeholder = formatIntlKey('ApplicationForm.addressLine1Placeholder');
				const addressLine2Placeholder = formatIntlKey('ApplicationForm.addressLine2Placeholder');
				const addressLine3Placeholder = formatIntlKey('ApplicationForm.addressLine3Placeholder');
				const addressLine4Placeholder = formatIntlKey('ApplicationForm.addressLine4Placeholder');
				const addressLine5Placeholder = formatIntlKey('ApplicationForm.addressLine5Placeholder');
				const addressRequiredMessage = formatIntlKey('ApplicationForm.addressRequiredMessage');
				// phone
				const phoneNoLabel = formatIntlKey('ApplicationForm.phoneNoLabel');
				const phoneNoPlaceholder = formatIntlKey('ApplicationForm.phoneNoPlaceholder');
				const phoneNoRequiredMessage = formatIntlKey('ApplicationForm.phoneNoRequiredMessage');
				// english level
				const englishLabel = formatIntlKey('ApplicationForm.englishLabel');
				const englishPlaceholder = formatIntlKey('ApplicationForm.englishPlaceholder');
				const englishRequiredMessage = formatIntlKey('ApplicationForm.englishRequiredMessage');
				// emergency contact name
				const emerContactNameLabel = formatIntlKey('ApplicationForm.emerContactNameLabel');
				const emerContactNamePlaceholder = formatIntlKey('ApplicationForm.emerContactNamePlaceholder');
				const emerContactNameRequiredMessage = formatIntlKey('ApplicationForm.emerContactNameRequiredMessage');
				// emergency contact phone number
				const emerContactNumberLabel = formatIntlKey('ApplicationForm.emerContactNumberLabel');
				const emerContactNumberPlaceholder = formatIntlKey('ApplicationForm.emerContactNumberPlaceholder');
				const emerContactNumberRequiredMessage = formatIntlKey('ApplicationForm.emerContactNumberRequiredMessage');
				// allergy
				const allergyLabel = formatIntlKey('ApplicationForm.allergyLabel');
				const allergyPlaceholder = formatIntlKey('ApplicationForm.allergyPlaceholder');
				const allergyRequiredMessage = formatIntlKey('ApplicationForm.allergyRequiredMessage');
				// questions family cbildrens
				const questionFamilyLabel = formatIntlKey('ApplicationForm.questionFamilyLabel');
				const questionFamilyPlaceholder = formatIntlKey('ApplicationForm.questionFamilyPlaceholder');
				const questionFamilyRequiredMessage = formatIntlKey('ApplicationForm.questionFamilyRequiredMessage');
				// questions smokers
				const questionSmokerLabel = formatIntlKey('ApplicationForm.questionSmokerLabel');
				const questionSmokerPlaceholder = formatIntlKey('ApplicationForm.questionSmokerPlaceholder');
				const questionSmokerRequiredMessage = formatIntlKey('ApplicationForm.questionSmokerRequiredMessage');
				// questions pets
				const questionPetsLabel = formatIntlKey('ApplicationForm.questionPetsLabel');
				const questionPetsPlaceholder = formatIntlKey('ApplicationForm.questionPetsPlaceholder');
				const questionPetsRequiredMessage = formatIntlKey('ApplicationForm.questionPetsRequiredMessage');
				// request to hosts
				const requestHostLabel = formatIntlKey('ApplicationForm.requestHostLabel');
				const requestHostPlaceholder = formatIntlKey('ApplicationForm.requestHostPlaceholder');
				const requestHostRequiredMessage = formatIntlKey('ApplicationForm.requestHostRequiredMessage');
				// destination
				const destinationLabel = formatIntlKey('ApplicationForm.destinationLabel');
				const destinationPlaceholder = formatIntlKey('ApplicationForm.destinationPlaceholder');
				const destinationRequiredMessage = formatIntlKey('ApplicationForm.destinationRequiredMessage');
				// visa types
				const visatypeLabel = formatIntlKey('ApplicationForm.visatypeLabel');
				const visatypePlaceholder = formatIntlKey('ApplicationForm.visatypePlaceholder');
				const visatypeRequiredMessage = formatIntlKey('ApplicationForm.visatypeRequiredMessage');
				// payment methods
				const paymethodLabel = formatIntlKey('ApplicationForm.paymethodLabel');
				const paymethodPlaceholder = formatIntlKey('ApplicationForm.paymethodPlaceholder');
				const paymethodRequiredMessage = formatIntlKey('ApplicationForm.paymethodRequiredMessage');
				// inquiry
				const inquirytLabel = formatIntlKey('ApplicationForm.inquirytLabel');
				const inquiryPlaceholder = formatIntlKey('ApplicationForm.inquiryPlaceholder');


				// check terms 
				const checkboxTermsLabel = formatIntlKey('ApplicationForm.termsAndConditionsAcceptText', termsLink);
				// Validators
				const nameRequired = validators.required(nameRequiredMessage);
				const surnameRequired = validators.required(surnameRequiredMessage);
				const dayBirthRequired = validators.required(dayBirthRequiredMessage);
				const dayBirthValid = validators.dateFormatValid(dayBirthInvalidMessage);
				const addressRequired = validators.required(addressRequiredMessage);
				const cityRequired = validators.required(formatIntlKey('ApplicationForm.fieldRequiredMessage', 'City'));
				const stateRequired = validators.required(formatIntlKey('ApplicationForm.fieldRequiredMessage', 'State/Province'));
				const zipCodeRequired = validators.required(formatIntlKey('ApplicationForm.fieldRequiredMessage', 'Zipcode'));
				const countryRequired = validators.required(formatIntlKey('ApplicationForm.fieldRequiredMessage', 'Country'));
				const emailRequired = validators.required(emailRequiredMessage);
				const emailValid = validators.emailFormatValid(emailInvalidMessage);
				const phoneRequired = validators.required(phoneNoRequiredMessage);
				const emerContactNameRequired = validators.required(emerContactNameRequiredMessage);
				const emerContactNumberRequired = validators.required(emerContactNumberRequiredMessage);

				const allergyRequired = validators.required(allergyRequiredMessage);
				const requestHostRequired = validators.required(requestHostRequiredMessage);


				const emailValidators = validators.composeValidators(
					emailRequired,
					emailValid
				)

				const dayBirthValidators = validators.composeValidators(
					dayBirthRequired,
					dayBirthValid
				)

				const classes = classNames(rootClassName || css.root, className);
				const submitDisabled = invalid;

				return (
					<Form className={classes} onSubmit={handleSubmit}>
						<h3 className={css.subTitle}>
							<FormattedMessage id="ApplicationPage.subTitle" />
						</h3>
						<div className={css.formContainer}>
							<div className={css.colfields}>
								<div className={css.rowFields}>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.name` : 'name'}
										name="name"
										autoComplete="given-name"
										label={nameLabel}
										placeholder={namePlaceholder}
										validate={nameRequired}
									/>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.surname` : 'surname'}
										name="surname"
										autoComplete="given-surname"
										label={surnameLabel}
										placeholder={surnamePlaceholder}
										validate={surnameRequired}
									/>

									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.dayBirth` : 'dayBirth'}
										name="dayBirth"
										autoComplete="dayBirth"
										label={dayBirthLabel}
										placeholder={dayBirthPlaceholder}
										validate={dayBirthValidators}
									/>

								</div>
								<div className={css.rowFields}>
									<FieldSelect
										className={css.select}
										id="countryCitizen"
										name="countryCitizen"
										label={countryCitizenLabel}
										validate={composeValidators(
											required(countryCitizenRequiredMessage)
										)}
										type="select"
									>
										<option value={''} disabled>
											{countryCitizenPlaceholder}
										</option>
										{countryCitizenOptions.map(country => {
											return (
												<option key={country.code} value={country.en}>
													{country.en}
												</option>
											);
										})}
									</FieldSelect>
									{ /** Select col */}
									<FieldSelect
										className={css.select}
										id="sexGender"
										name="sexGender"
										label={sexLabel}
										validate={composeValidators(
											required(sexRequiredMessage)
										)}
										type="select"
									>
										<option value="" disabled>
											{sexPlaceholder}
										</option>
										{sexOptions.map((sexOption) => {
											return (
												<option key={sexOption.key} value={sexOption.label}>
													{sexOption.label}
												</option>
											);
										})}
									</FieldSelect>
								</div>
								<div className={css.rowFields__full}>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.address` : 'address'}
										name="address"
										label={addressLabel}
										autoComplete="address"
										placeholder={addressLine1Placeholder}
										validate={addressRequired}
									/>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.addressCity` : 'addressCity'}
										name="addressCity"
										autoComplete="addressCity"
										placeholder={addressLine2Placeholder}
										validate={cityRequired}
									/>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.addressState` : 'addressState'}
										name="addressState"
										autoComplete="addressState"
										placeholder={addressLine3Placeholder}
										validate={stateRequired}
									/>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.addressZipcode` : 'addressZipcode'}
										name="addressZipcode"
										autoComplete="addressZipcode"
										placeholder={addressLine4Placeholder}
										validate={zipCodeRequired}
									/>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.addressCountry` : 'addressCountry'}
										name="addressCountry"
										autoComplete="addressCountry"
										placeholder={addressLine5Placeholder}
										validate={countryRequired}
									/>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.email` : 'email'}
										name="email"
										label={emailLabel}
										autoComplete="email"
										placeholder={emailPlaceholder}
										validate={emailValidators}
									/>
								</div>
								<div className={css.rowFields__md}>
									<FieldPhoneNumberInput
										className={css.input}
										id={`${formId}.phone`}
										name="phone"
										label={phoneNoLabel}
										placeholder={phoneNoPlaceholder}
										validate={phoneRequired}
									/>
								</div>
								<div className={css.rowFields}>
									<FieldSelect
										className={css.select}
										id="englishLevel"
										name="englishLevel"
										label={englishLabel}
										validate={composeValidators(
											required(englishRequiredMessage)
										)}
										type="select"
									>
										<option value="" disabled>
											{englishPlaceholder}
										</option>
										{englishLevelOptions.map((engOption) => {
											return (
												<option key={engOption.key} value={engOption.key}>
													{engOption.label}
												</option>
											);
										})}
									</FieldSelect>
								</div>
								<div className={css.rowFields__md}>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.emerContactName` : 'emerContactName'}
										name="emerContactName"
										label={emerContactNameLabel}
										autoComplete="emerContactName"
										placeholder={emerContactNamePlaceholder}
										validate={emerContactNameRequired}
									/>
									<FieldPhoneNumberInput
										className={css.input}
										id={`${formId}.emerContactNumber`}
										name="emerContactNumber"
										label={emerContactNumberLabel}
										placeholder={emerContactNumberPlaceholder}
										validate={emerContactNumberRequired}
									/>
								</div>
								<div className={css.rowFields__full}>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.allergy` : 'allergy'}
										name="allergy"
										label={allergyLabel}
										autoComplete="allergy"
										placeholder={allergyPlaceholder}
										validate={allergyRequired}
									/>
								</div>
								<div className={css.rowFields__md}>
									<FieldSelect
										className={css.select}
										id="questionFamily"
										name="questionFamily"
										label={questionFamilyLabel}
										validate={composeValidators(
											required(questionFamilyRequiredMessage)
										)}
										type="select"
									>
										<option value="" disabled>
											{questionFamilyPlaceholder}
										</option>
										{questionFamilyOptions.map((qfamilyOption) => {
											return (
												<option key={qfamilyOption.key} value={qfamilyOption.key}>
													{qfamilyOption.label}
												</option>
											);
										})}
									</FieldSelect>
									<FieldSelect
										className={css.select}
										id="questionSmoker"
										name="questionSmoker"
										label={questionSmokerLabel}
										validate={composeValidators(
											required(questionSmokerRequiredMessage)
										)}
										type="select"
									>
										<option value="" disabled>
											{questionSmokerPlaceholder}
										</option>
										{questionSmokerOptions.map((qsmokerOption) => {
											return (
												<option key={qsmokerOption.key} value={qsmokerOption.key}>
													{qsmokerOption.label}
												</option>
											);
										})}
									</FieldSelect>
									<FieldSelect
										className={css.select}
										id="questionPets"
										name="questionPets"
										label={questionPetsLabel}
										validate={composeValidators(
											required(questionPetsRequiredMessage)
										)}
										type="select"
									>
										<option value="" disabled>
											{questionPetsPlaceholder}
										</option>
										{questionPetsOptions.map((qpetsOption) => {
											return (
												<option key={qpetsOption.key} value={qpetsOption.key}>
													{qpetsOption.label}
												</option>
											);
										})}
									</FieldSelect>
								</div>
								<div className={css.rowFields__full}>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.requestHost` : 'requestHost'}
										name="requestHost"
										label={requestHostLabel}
										autoComplete="requestHost"
										placeholder={requestHostPlaceholder}
										validate={requestHostRequired}
									/>
								</div>
								<div className={css.rowFields}>
									<FieldSelect
										className={css.select}
										id="destination"
										name="destination"
										label={destinationLabel}
										validate={composeValidators(
											required(destinationRequiredMessage)
										)}
										type="select"
									>
										<option value="" disabled>
											{destinationPlaceholder}
										</option>
										{destinationOptions.map((country) => {
											return (
												<option key={country.code} value={country.en}>
													{country.en}
												</option>
											);
										})}
									</FieldSelect>
									<FieldSelect
										className={css.select}
										id="visatype"
										name="visatype"
										label={visatypeLabel}
										validate={composeValidators(
											required(visatypeRequiredMessage)
										)}
										type="select"
									>
										<option value="" disabled>
											{visatypePlaceholder}
										</option>
										{visaTypeOptions.map((vtOption) => {
											return (
												<option key={vtOption.key} value={vtOption.label}>
													{vtOption.label}
												</option>
											);
										})}
									</FieldSelect>
								</div>
								<div className={css.rowFields__md}>
									<FieldSelect
										className={css.select}
										id="paymethod"
										name="paymethod"
										label={paymethodLabel}
										validate={composeValidators(
											required(paymethodRequiredMessage)
										)}
										type="select"
									>
										<option value="" disabled>
											{paymethodPlaceholder}
										</option>
										{paymentOptions.map((payOption) => {
											return (
												<option key={payOption.key} value={payOption.label}>
													{payOption.label}
												</option>
											);
										})}
									</FieldSelect>
								</div>
								<div className={css.rowFields__full}>
									<FieldTextInput
										className={css.input}
										type="text"
										id={formId ? `${formId}.inquiry` : 'inquiry'}
										name="inquiry"
										label={inquirytLabel}
										autoComplete="inquiry"
										placeholder={inquiryPlaceholder}
										maxLength="200"
									/>
								</div>
								<div className={css.bottomWrapper}>
									<p className={css.boxTerms}>
										<FieldCheckbox id="checkboxTerms" label={checkboxTermsLabel} name="checkboxTerms" value={''} className={css.checkInput} />
										{ /**
									 * <FieldCheckbox id="checkboxTerms" name="checkboxTerms" label={checkboxTermsLabel} value={'Accepted'} /> 
									**/ }
									</p>
								</div>
								<div className={css.buttonWrapper}>
									<PrimaryButton
										type="submit"
										disabled={submitDisabled}
										className={css.sendButton}
									>
										<FormattedMessage id="ApplicationPage.submitButtonText" />
									</PrimaryButton>
								</div>


							</div>
							<div className={css.colform}>
								<h3 className={css.titleDetails}>
									<FormattedMessage id="ApplicationPage.details" />
								</h3>
								<div className={css.holdPricings}>
									<PricePanel lineItems={lineItemsData} />
								</div>
							</div>
						</div>
					</Form>
				);
			}}
		/>
	)

};

ApplicationFormComponent.defaultProps = {

};

const { bool, func, shape, array, arrayOf, string, number } = PropTypes;

ApplicationFormComponent.propTypes = {
	// from injectIntl
	intl: intlShape.isRequired,

	countryCitizenOptions: arrayOf(
		shape({
			code: string.isRequired,
			en: string.isRequired,
			fr: string.isRequired,
			es: string.isRequired,
			de: string.isRequired,
		})
	),
	sexOptions: arrayOf(
		shape({
			key: string.isRequired,
			label: string.isRequired
		})
	),
	englishLevelOptions: arrayOf(
		shape({
			key: string.isRequired,
			label: string.isRequired
		})
	),
	questionFamilyOptions: arrayOf(
		shape({
			key: string.isRequired,
			label: string.isRequired
		})
	),
	questionSmokerOptions: arrayOf(
		shape({
			key: string.isRequired,
			label: string.isRequired
		})
	),
	questionPetsOptions: arrayOf(
		shape({
			key: string.isRequired,
			label: string.isRequired
		})
	),
	destinationOptions: arrayOf(
		shape({
			code: string.isRequired,
			en: string.isRequired,
			fr: string.isRequired,
			es: string.isRequired,
			de: string.isRequired,
		})
	),
	visaTypeOptions: arrayOf(
		shape({
			key: string.isRequired,
			label: string.isRequired
		})
	),
	paymentOptions: arrayOf(
		shape({
			key: string.isRequired,
			label: string.isRequired
		})
	)
};

const ApplicationForm = compose(injectIntl)(ApplicationFormComponent);
ApplicationForm.displayName = 'ApplicationForm';

export default ApplicationForm;

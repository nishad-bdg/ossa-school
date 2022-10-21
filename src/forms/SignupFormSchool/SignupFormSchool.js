import React, { Component } from 'react';
import PropTypes, { object } from 'prop-types';
import { compose } from 'redux';
import { propTypes } from '../../util/types';
import config from '../../config';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Form as FinalForm, Field } from 'react-final-form';
import { formatMoney } from '../../util/currency';
import classNames from 'classnames';
import * as validators from '../../util/validators';
import {
  autocompleteSearchRequired,
  autocompletePlaceSelected,
} from '../../util/validators';
import { composeValidators, required } from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import { types as sdkTypes } from '../../util/sdkLoader';

import {
  Form,
  PrimaryButton,
  FieldTextInput,
  AddImages,
  ImageFromFile,
  FieldSelect,
  FieldRadioButton,
  FieldPhoneNumberInput,
  FieldCurrencyInput,
  LocationAutocompleteInputField,
  IconSpinner,
  Avatar,
} from '../../components';

import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { OnChange } from 'react-final-form-listeners';
import uniqueId from 'lodash/uniqueId';
import findIndex from 'lodash/findIndex';
import css from './SignupFormSchool.module.css';
import FileField from '../../components/FileField/FileField';

const KEY_CODE_ENTER = 13;
const { UUID } = sdkTypes;
const { Money } = sdkTypes;

const getId = () => {
  return uniqueId();
};

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset

const identity = v => v;

class SignupFormSchoolComponent extends Component {
  // constructor(props, state) {
  // super(props, state);
  // this.state = { imageUploadRequested: false };
  // this.uploadDelayTimeoutId = null;
  // this.state = { uploadDelay: false, staffPhoto: null, images: [] };
  // this.submittedValues = {};
  // this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
  // }
  constructor(props) {
    super(props);

    this.uploadDelayTimeoutId = null;
    this.state = { uploadDelay: false };
    this.submittedValues = {};
  }

  componentDidUpdate(prevProps) {
    // Upload delay is additional time window where Avatar is added to the DOM,
    // but not yet visible (time to load image URL from srcset)
    if (prevProps.uploadInProgress && !this.props.uploadInProgress) {
      this.setState({ uploadDelay: true });
      this.uploadDelayTimeoutId = window.setTimeout(() => {
        this.setState({ uploadDelay: false });
      }, UPLOAD_CHANGE_DELAY);
    }
  }

  componentWillUnmount() {
    window.clearTimeout(this.uploadDelayTimeoutId);
  }

  // onImageUploadHandler(file) {
  //   this.setState({ imageUploadRequested: true });
  //   const fileId = getId();
  //   const imageData = { file, id: fileId, imageId: null };
  //   // this.props.onImageUpload(imageData);
  //   // Show loading overlay
  //   this.setState({
  //     images: this.state.images.concat([imageData]),
  //   });

  //   // Fake image uploaded state: show image thumbnail
  //   setTimeout(() => {
  //     this.setState(prevState => {
  //       const images = prevState.images;
  //       const imageIndex = findIndex(images, i => i.id === fileId);
  //       const updatedImage = { ...imageData, imageId: new UUID(fileId) };
  //       const updatedImages = [
  //         ...images.slice(0, imageIndex),
  //         updatedImage,
  //         ...images.slice(imageIndex + 1),
  //       ];
  //       return {
  //         images: updatedImages,
  //       };
  //     });
  //   }, 1000);
  // }

  // removeImageFromArray(imageId) {
  //   const imageArr = this.state.images;
  //   const index = findIndex(imageArr, i => i.id === imageId);
  //   imageArr.splice(index, 1);
  //   this.setState({ images: imageArr });
  // }


  render() {
    return (
      <FinalForm
        {...this.props}
        onImageUploadHandler={this.onImageUploadHandler}
        imageUploadRequested={this.state.imageUploadRequested}
        mutators={{
          ...arrayMutators,
        }}
        render={fieldRenderProps => {
          const {
            form,
            editSchoolProfile,
            profileImage,
            countryCodes,
            cities,
            onImageUpload,
            pristine,
            onImageUploadHandler,
            imageUploadRequested,
            rootClassName,
            classroomEquipmentsOptions,
            schoolSizeOptions,
            schoolActivitiesOptions,
            className,
            formId,
            schoolFacilitiesOptions,
            handleSubmit,
            languages,
            images,
            onRemoveImage,
            fetchErrors,
            inProgress,
            invalid,
            intl,
            values,
            user,
            onOpenTermsOfService,
            updateInProgress,
            updateProfileError,
            uploadImageError,
            uploadInProgress,
            form: {
              mutators: { push, pop },
            },
          } = fieldRenderProps;

          //school name
          const schoolNameLabel = intl.formatMessage({
            id: 'SignupForm.schoolNameLabel',
          });
          const schoolNamePlaceholder = intl.formatMessage({
            id: 'SignupForm.schoolNamePlaceholder',
          });
          const schoolNameRequiredMessage = intl.formatMessage({
            id: 'SignupForm.schoolNameRequired',
          });
          const schoolNameRequired = validators.required(
            schoolNameRequiredMessage
          );

          // school name

          // email
          const emailLabel = intl.formatMessage({
            id: 'SignupForm.emailLabel',
          });
          const emailPlaceholder = intl.formatMessage({
            id: 'SignupForm.emailPlaceholder',
          });
          const emailRequiredMessage = intl.formatMessage({
            id: 'SignupForm.emailRequired',
          });
          const emailRequired = validators.required(emailRequiredMessage);
          const emailInvalidMessage = intl.formatMessage({
            id: 'SignupForm.emailInvalid',
          });
          const emailValid = validators.emailFormatValid(emailInvalidMessage);

          // password
          const passwordLabel = intl.formatMessage({
            id: 'SignupForm.passwordLabel',
          });
          const passwordPlaceholder = intl.formatMessage({
            id: 'SignupForm.passwordPlaceholder',
          });
          const passwordRequiredMessage = intl.formatMessage({
            id: 'SignupForm.passwordRequired',
          });
          const passwordMinLengthMessage = intl.formatMessage(
            {
              id: 'SignupForm.passwordTooShort',
            },
            {
              minLength: validators.PASSWORD_MIN_LENGTH,
            }
          );
          const passwordMaxLengthMessage = intl.formatMessage(
            {
              id: 'SignupForm.passwordTooLong',
            },
            {
              maxLength: validators.PASSWORD_MAX_LENGTH,
            }
          );
          const passwordMinLength = validators.minLength(
            passwordMinLengthMessage,
            validators.PASSWORD_MIN_LENGTH
          );
          const passwordMaxLength = validators.maxLength(
            passwordMaxLengthMessage,
            validators.PASSWORD_MAX_LENGTH
          );
          const passwordRequired = validators.requiredStringNoTrim(
            passwordRequiredMessage
          );
          const passwordValidators = validators.composeValidators(
            passwordRequired,
            passwordMinLength,
            passwordMaxLength
          );

          // description
          const descriptionLabel = intl.formatMessage({
            id: 'SignupForm.descriptionLabel',
          });
          const descriptionPlaceholder = intl.formatMessage({
            id: 'SignupForm.descriptionPlaceholder',
          });
          const descriptionRequiredMessage = intl.formatMessage({
            id: 'SignupForm.descriptionRequired',
          });
          const descriptionRequired = validators.required(
            descriptionRequiredMessage
          );
          // description

          // image upload
          const chooseImageText = (
            <span className={css.chooseImageText}>
              <span className={css.chooseImage}>
                <FormattedMessage id="EditListingPhotosForm.chooseImage" />
              </span>
              <span className={css.imageTypes}>
                <FormattedMessage id="EditListingPhotosForm.imageTypes" />
              </span>
            </span>
          );

          const imageRequiredMessage = intl.formatMessage({
            id: 'EditListingPhotosForm.imageRequired',
          });

          const { publishListingError, showListingsError, updateListingError } =
            fetchErrors || {};
          const uploadOverLimit = isUploadImageOverLimitError(uploadImageError);

          if (uploadOverLimit) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadOverLimit" />
              </p>
            );
          } else if (uploadImageError) {
            uploadImageFailed = (
              <p className={css.error}>
                <FormattedMessage id="EditListingPhotosForm.imageUploadFailed.uploadFailed" />
              </p>
            );
          }
          // image upload

          // video link
          const videoLinkLabel = intl.formatMessage({
            id: 'SignupForm.videoLinkLabel',
          });
          const videoLinkPlaceholder = intl.formatMessage({
            id: 'SignupForm.videoLinkPlaceholder',
          });
          const videoLinkRequiredMessage = intl.formatMessage({
            id: 'SignupForm.videoLinkRequired',
          });
          const videoLinkRequired = validators.required(
            videoLinkRequiredMessage
          );

          // video link

          // school location
          const schoolLocationLabel = intl.formatMessage({
            id: 'SignupForm.schoolLocationLabel',
          });
          const schoolLocationCountryPlaceholder = intl.formatMessage({
            id: 'SignupForm.schoolLocationCountryPlaceholder',
          });
          const schoolLocationCountryRequiredMessage = intl.formatMessage({
            id: 'SignupForm.schoolLocationCountryRequired',
          });
          const schoolLocationCountryRequired = validators.required(
            schoolLocationCountryRequiredMessage
          );
          // school location

          // city
          const schoolLocationCityPlaceholder = intl.formatMessage({
            id: 'SignupForm.schoolLocationCityPlaceholder',
          });
          const schoolLocationCityRequiredMessage = intl.formatMessage({
            id: 'SignupForm.schoolLocationCityRequired',
          });
          const schoolLocationCityRequired = validators.required(
            schoolLocationCityRequiredMessage
          );
          // city

          // school photos
          const schoolPhotosLabel = intl.formatMessage({
            id: 'SignupForm.schoolPhotosLabel',
          });
          //school photos

          // address line 1
          const addressRequiredMessage = intl.formatMessage({
            id: 'EditListingLocationForm.addressRequired',
          });
          const addressNotRecognizedMessage = intl.formatMessage({
            id: 'EditListingLocationForm.addressNotRecognized',
          });

          const addressLabel = intl.formatMessage({
            id: 'SignupForm.addressLabel',
          });
          const addressPlaceholder = intl.formatMessage({
            id: 'SignupForm.addressPlaceholder',
          });
          const schoolAddressRequiredMessage = intl.formatMessage({
            id: 'SignupForm.addressRequired',
          });
          // address line 1

          // phone no
          const phoneNoLabel = intl.formatMessage({
            id: 'SignupForm.phoneNoLabel',
          });
          const phoneNoPlaceholder = intl.formatMessage({
            id: 'SignupForm.phoneNoPlaceholder',
          });
          const phoneNoRequiredMessage = intl.formatMessage({
            id: 'SignupForm.phoneNoRequired',
          });
          const phoneNoRequired = validators.required(phoneNoRequiredMessage);
          // phone no

          // postal code
          const postalCodeLabel = intl.formatMessage({
            id: 'SignupForm.postalCodeLabel',
          });
          const postalCodePlaceholder = intl.formatMessage({
            id: 'SignupForm.postalCodePlaceholder',
          });
          const postalCodeRequiredMessage = intl.formatMessage({
            id: 'SignupForm.postalCodeRequired',
          });
          const postalCodeRequired = validators.required(
            postalCodeRequiredMessage
          );
          // postal code

          // language
          const languageLabel = intl.formatMessage({
            id: 'SignupForm.languageLabel',
          });
          const languagePlaceholder = intl.formatMessage({
            id: 'SignupForm.languagePlaceholder',
          });
          const languageRequiredMessage = intl.formatMessage({
            id: 'SignupForm.languageRequired',
          });
          const languageRequired = validators.required(languageRequiredMessage);

          // language

          // student support staff name
          const supportStaffLabel = intl.formatMessage({
            id: 'SignupForm.supportStaffLabel',
          });
          const supportStaffPlaceholder = intl.formatMessage({
            id: 'SignupForm.supportStaffPlaceholder',
          });
          const supportStaffRequiredMessage = intl.formatMessage({
            id: 'SignupForm.supportStaffRequired',
          });
          const supportStaffRequired = validators.required(
            supportStaffRequiredMessage
          );
          // student support staff name

          // message from the staff
          const messageFromStaffLabel = intl.formatMessage({
            id: 'SignupForm.messageFromStaffLabel',
          });
          const messageFromStaffPlaceholder = intl.formatMessage({
            id: 'SignupForm.messageFromStaffPlaceholder',
          });
          const messageFromStaffRequiredMessage = intl.formatMessage({
            id: 'SignupForm.messageFromStaffRequired',
          });
          const messageFromStaffRequired = validators.required(
            messageFromStaffRequiredMessage
          );
          // message from the staff

          // support staff photo
          const supportStaffPhotoLabel = intl.formatMessage({
            id: 'SignupForm.supportStaffPhotoLabel',
          });
          const supportStaffPhotoPlaceholder = intl.formatMessage({
            id: 'SignupForm.supportStaffPhotoPlaceholder',
          });
          const supportStaffPhotoRequiredMessage = intl.formatMessage({
            id: 'SignupForm.supportStaffPhotoRequired',
          });
          const supportStaffPhotoRequired = validators.required(
            supportStaffPhotoRequiredMessage
          );
          // support staff photo

          // 3rd flex
          // school size
          const schoolSizeLabel = intl.formatMessage({
            id: 'SignupForm.schoolSizeLabel',
          });
          const schoolSizePlaceholder = intl.formatMessage({
            id: 'SignupForm.schoolSizePlaceholder',
          });
          const schoolSizeRequiredMessage = intl.formatMessage({
            id: 'SignupForm.schoolSizeRequired',
          });
          const schoolSizeRequired = validators.required(
            schoolSizeRequiredMessage
          );
          // school size

          // Activities
          const activitiesLabel = intl.formatMessage({
            id: 'SignupForm.activitiesLabel',
          });
          const activitiesPlaceholder = intl.formatMessage({
            id: 'SignupForm.activitiesPlaceholder',
          });
          const activitiesRequiredMessage = intl.formatMessage({
            id: 'SignupForm.activitiesRequired',
          });
          const activitiesRequired = validators.required(
            activitiesRequiredMessage
          );
          // activities

          // top student nationalities
          const topStudentNationalitiesLabel = intl.formatMessage({
            id: 'SignupForm.topStudentNationalitiesLabel',
          });
          const topStudentNationalitiesPlaceholder = intl.formatMessage({
            id: 'SignupForm.topStudentNationalitiesPlaceholder',
          });
          const topStudentNationalitiesRequiredMessage = intl.formatMessage({
            id: 'SignupForm.topStudentNationalitiesRequired',
          });

          const topStudentNationalitiesRequired = validators.required(
            topStudentNationalitiesRequiredMessage
          );

          const numberOfPeoplePlaceholder = intl.formatMessage({
            id: 'SignupForm.numberOfPeoplePlaceholder',
          });
          const numberOfPeopleRequiredMessage = intl.formatMessage({
            id: 'SignupForm.numberOfPeopleRequired',
          });
          const numberOfPeopleRequired = validators.required(
            numberOfPeopleRequiredMessage
          );
          // top student nationalities

          // school facilities
          const schoolFacilitiesLabel = intl.formatMessage({
            id: 'SignupForm.schoolFacilitiesLabel',
          });
          const schoolFacilitiesPlaceholder = intl.formatMessage({
            id: 'SignupForm.schoolFacilitiesPlaceholder',
          });
          const schoolFacilitiesRequiredMessage = intl.formatMessage({
            id: 'SignupForm.schoolFacilitiesRequired',
          });
          // school facilities

          // class room equipement
          const classRoomEquipementsLabel = intl.formatMessage({
            id: 'SignupForm.classRoomEquipmentsLabel',
          });
          const classRoomEquipementsPlaceholder = intl.formatMessage({
            id: 'SignupForm.classRoomEquipmentsPlaceholder',
          });
          // class room equipment
          // Minimum Charge Per Week
          const minimumChargeLabel = intl.formatMessage({
            id: 'EditEnrollmentFeeForm.minimunChargePerUnit',
          });
          const pricePlaceholderMessage = intl.formatMessage({
            id: 'EditListingPricingForm.priceInputPlaceholder',
          });

          const priceRequired = validators.required(
            intl.formatMessage({
              id: 'EditListingPricingForm.priceRequired',
            })
          );
          const minPrice = new Money(
            config.listingMinimumPriceSubUnits,
            config.currency
          );
          const minPriceRequired = validators.moneySubUnitAmountAtLeast(
            intl.formatMessage(
              {
                id: 'EditListingPricingForm.priceTooLow',
              },
              {
                minPrice: formatMoney(intl, minPrice),
              }
            ),
            config.listingMinimumPriceSubUnits
          );
          const priceValidators = config.listingMinimumPriceSubUnits
            ? validators.composeValidators(priceRequired, minPriceRequired)
            : priceRequired;
          // Minimum Charge Per Week
          // 3rd flex

          // staff photo upload
          const uploadingOverlay =
            uploadInProgress || this.state.uploadDelay ? (
              <div className={css.uploadingImageOverlay}>
                <IconSpinner />
              </div>
            ) : null;

          const hasUploadError = !!uploadImageError && !uploadInProgress;
          const errorClasses = classNames({
            [css.avatarUploadError]: hasUploadError,
          });
          const transientUserProfileImage =
            (profileImage && profileImage.uploadedImage) ||
            (user && user.profileImage);
          const transientUser = {
            ...user,
            profileImage: transientUserProfileImage,
          };

          // Ensure that file exists if imageFromFile is used
          const fileExists = profileImage ? !!profileImage.file : null;
          const fileUploadInProgress = uploadInProgress && fileExists;
          const delayAfterUpload = profileImage
            ? profileImage.imageId && this.state.uploadDelay
            : null;
          const imageFromFile =
            fileExists && (fileUploadInProgress || delayAfterUpload) ? (
              <ImageFromFile
                id={profileImage.id}
                className={errorClasses}
                rootClassName={css.uploadingImage}
                aspectRatioClassName={css.squareAspectRatio}
                file={profileImage.file}
              >
                {uploadingOverlay}
              </ImageFromFile>
            ) : null;

          // Avatar is rendered in hidden during the upload delay
          // Upload delay smoothes image change process:
          // responsive img has time to load srcset stuff before it is shown to user.
          const avatarClasses = classNames(errorClasses, css.avatar, {
            [css.avatarInvisible]: this.state.uploadDelay,
          });
          const avatarComponent =
            !fileUploadInProgress && profileImage && profileImage.imageId ? (
              <Avatar
                className={avatarClasses}
                renderSizes="(max-width: 767px) 96px, 240px"
                user={transientUser}
                disableProfileLink
              />
            ) : null;

          const chooseAvatarLabel =
            (profileImage && profileImage.imageId) || fileUploadInProgress ? (
              <div className={css.avatarContainer}>
                {imageFromFile}
                {avatarComponent}
                <div className={css.changeAvatar}>
                  <FormattedMessage id="ProfileSettingsForm.changeAvatar" />
                </div>
              </div>
            ) : (
              <div className={css.avatarPlaceholder}>
                <div className={css.avatarPlaceholderText}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePicture" />
                </div>
                <div className={css.avatarPlaceholderTextMobile}>
                  <FormattedMessage id="ProfileSettingsForm.addYourProfilePictureMobile" />
                </div>
              </div>
            );

          // staff photo upload

          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = updateInProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit =
            submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled =
            invalid ||
            pristine ||
            pristineSinceLastSubmit ||
            uploadInProgress ||
            submitInProgress;

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
              <FormattedMessage id="SignupForm.termsAndConditionsLinkText" />
            </span>
          );

          return (
            <Form className={classes} onSubmit={handleSubmit}>
              <div className={css.formContainer}>
                {/* school name */}
                <FieldTextInput
                  className={css.schoolName}
                  type="text"
                  id={formId ? `${formId}.schoolName` : 'schoolName'}
                  name="schoolName"
                  autoComplete="given-name"
                  label={schoolNameLabel}
                  placeholder={schoolNamePlaceholder}
                  validate={schoolNameRequired}
                />
                {/* school name */}
                {!editSchoolProfile && (
                  <>
                    <FieldTextInput
                      type="email"
                      id={formId ? `${formId}.email` : 'email'}
                      name="email"
                      autoComplete="email"
                      label={emailLabel}
                      placeholder={emailPlaceholder}
                      validate={validators.composeValidators(
                        emailRequired,
                        emailValid
                      )}
                    />

                    <FieldTextInput
                      className={css.password}
                      type="password"
                      id={formId ? `${formId}.password` : 'password'}
                      name="password"
                      autoComplete="new-password"
                      label={passwordLabel}
                      placeholder={passwordPlaceholder}
                      validate={passwordValidators}
                    />
                  </>
                )}
                {/* description */}
                <FieldTextInput
                  className={css.password}
                  type="textarea"
                  id={formId ? `${formId}.description` : 'description'}
                  name="description"
                  autoComplete="given-name"
                  label={descriptionLabel}
                  placeholder={descriptionPlaceholder}
                  validate={descriptionRequired}
                />
                {/* description */}
                {/* video link  */}
                <FieldArray name="videoLinks">
                  {({ fields }) => (
                    <div>
                      {fields.map((name, index) => (
                        <div key={name} className={css.schoolSizeContainer}>
                          <FieldTextInput
                            className={css.videoLink}
                            type="url"
                            id={
                              formId
                                ? `${formId}.videoLink${index}`
                                : `videoLink${index}`
                            }
                            name={`${name}`}
                            label={videoLinkLabel}
                            placeholder={videoLinkPlaceholder}
                          />
                          {index < 1 ? (
                            <button
                              className={css.btnRemove}
                              type="button"
                              onClick={() => push('videoLinks', '')}
                            >
                              +
                            </button>
                          ) : (
                            <button
                              className={css.btnRemove}
                              type="button"
                              onClick={() => fields.remove(index)}
                            >
                              X
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>

                {/* video link */}

                {/* school location */}
                <label className={css.password}>{schoolLocationLabel}</label>
                <div className={css.schoolLocation}>
                  <FieldSelect
                    className={css.title}
                    id="country"
                    name="country"
                    validate={composeValidators(
                      required(schoolLocationCountryRequiredMessage)
                    )}
                  >
                    <option value="" disabled>
                      {schoolLocationCountryPlaceholder}
                    </option>
                    {countryCodes.map(country => (
                      <option value={country.en} key={country.code}>
                        {country.en}
                      </option>
                    ))}
                  </FieldSelect>

                  <FieldSelect
                    className={css.city}
                    id="city"
                    name="city"
                    validate={composeValidators(
                      required(schoolLocationCityRequiredMessage)
                    )}
                  >
                    <option value="" disabled>
                      {schoolLocationCityPlaceholder}
                    </option>
                    {cities.areas.map((city, index) => (
                      <option value={city.area_name_en} key={index}>
                        {city.area_name_en}
                      </option>
                    ))}
                  </FieldSelect>
                </div>

                {/* school location */}

                {/* address line 1 */}
                <label className={css.password}>{addressLabel}</label>
                <LocationAutocompleteInputField
                  className={css.locationAddress}
                  inputClassName={css.locationAutocompleteInput}
                  iconClassName={css.locationAutocompleteInputIcon}
                  predictionsClassName={css.predictionsRoot}
                  validClassName={css.validLocation}
                  name="location"
                  placeholder={addressPlaceholder}
                  useDefaultPredictions={false}
                  format={identity}
                  valueFromForm={values.location}
                  validate={composeValidators(
                    autocompleteSearchRequired(schoolAddressRequiredMessage),
                    autocompletePlaceSelected(addressNotRecognizedMessage)
                  )}
                />
                {/* address line 1 */}

                {/* phone no */}
                <FieldPhoneNumberInput
                  className={css.password}
                  type="text"
                  id={formId ? `${formId}.phoneNo` : 'phoneNo'}
                  name="phoneNo"
                  autoComplete="new-video-link"
                  label={phoneNoLabel}
                  placeholder={phoneNoPlaceholder}
                  validate={phoneNoRequired}
                />

                {/* phone no */}
                {/* Postal code */}

                <FieldTextInput
                  className={css.password}
                  type="text"
                  id={formId ? `${formId}.postalCode` : 'postalCode'}
                  name="postalCode"
                  autoComplete="new-video-link"
                  label={postalCodeLabel}
                  placeholder={postalCodePlaceholder}
                  validate={postalCodeRequired}
                />
                {/* postal code */}

                {/* 2nd flex */}
                <FieldSelect
                  className={css.password}
                  id="language"
                  name="language"
                  label={languageLabel}
                  validate={composeValidators(
                    required(languageRequiredMessage)
                  )}
                >
                  <option value="" disabled>
                    {languagePlaceholder}
                  </option>
                  {languages.map((lang, index) => (
                    <option value={lang.name} key={index}>
                      {lang.name}
                    </option>
                  ))}
                </FieldSelect>

                <OnChange name="language">
                  {value => {
                    push('languagesSpokenByStaff', value);
                  }}
                </OnChange>

                {/* selected languages */}
                <div className={css.languageContainer}>
                  <FieldArray name="languagesSpokenByStaff">
                    {({ fields }) => (
                      <div>
                        {fields.map((name, index) => (
                          <div key={name} className={css.schoolSizeContainer}>
                            <FieldTextInput
                              className={css.password}
                              type="text"
                              id={
                                formId
                                  ? `${formId}.languagesSpokenByStaff${index}`
                                  : `languagesSpokenByStaff${index}`
                              }
                              name={`${name}`}
                              disabled={true}
                            />
                            <button
                              className={css.btnRemove}
                              type="button"
                              onClick={() => fields.remove(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>
                {/* selected langugaes */}

                {/* support staff name */}
                <FieldTextInput
                  className={css.password}
                  type="text"
                  id={
                    formId ? `${formId}.supportStaffName` : 'supportStaffName'
                  }
                  name="supportStaffName"
                  autoComplete="given-name"
                  label={supportStaffLabel}
                  placeholder={supportStaffPlaceholder}
                  validate={supportStaffRequired}
                />
                {/* support staff name */}

                {/* support staff photo */}
                {editSchoolProfile && (
                  <>
                    <label className={css.password}>
                      {supportStaffPhotoLabel}
                    </label>
                    <Field
                  accept={ACCEPT_IMAGES}
                  id="profileImage"
                  name="profileImage"
                  label={chooseAvatarLabel}
                  type="file"
                  form={null}
                  uploadImageError={uploadImageError}
                  disabled={uploadInProgress}
                >
                  {fieldProps => {
                    const { accept, id, input, label, disabled, uploadImageError } = fieldProps;
                    const { name, type } = input;
                    const onChange = e => {
                      const file = e.target.files[0];
                      form.change(`profileImage`, file);
                      form.blur(`profileImage`);
                      if (file != null) {
                        const tempId = `${file.name}_${Date.now()}`;
                        onImageUpload({ id: tempId, file });
                      }
                    };

                    let error = null;

                    if (isUploadImageOverLimitError(uploadImageError)) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailedFileTooLarge" />
                        </div>
                      );
                    } else if (uploadImageError) {
                      error = (
                        <div className={css.error}>
                          <FormattedMessage id="ProfileSettingsForm.imageUploadFailed" />
                        </div>
                      );
                    }

                    return (
                      <div className={css.uploadAvatarWrapper}>
                        <label className={css.label} htmlFor={id}>
                          {label}
                        </label>
                        <input
                          accept={accept}
                          id={id}
                          name={name}
                          className={css.uploadAvatarInput}
                          disabled={disabled}
                          onChange={onChange}
                          type={type}
                        />
                        {error}
                      </div>
                    );
                  }}
                </Field>
                  </>
                )}

                {/* support staff photo  */}

                {/* Message from the staff */}
                <FieldTextInput
                  className={css.password}
                  type="textarea"
                  id={
                    formId
                      ? `${formId}.messageFromTheStaff`
                      : 'messageFromTheStaff'
                  }
                  name="messageFromTheStaff"
                  autoComplete="given-name"
                  label={messageFromStaffLabel}
                  placeholder={messageFromStaffPlaceholder}
                />
                {/* Message from the staff */}

                {/* 2nd flex */}

                {/* 3rd flex */}
                {/* School size */}
                <label className={css.password}>{schoolSizeLabel}</label>
                <div className={css.schoolSizeContainer}>
                  {schoolSizeOptions.map((size, index) => (
                    <FieldRadioButton
                      className={css.schoolSize}
                      key={index}
                      id={`${index}-schoolSize-id1`}
                      name="schoolSize"
                      label={size.label}
                      value={size.key}
                      validate={messageFromStaffRequired}
                    />
                  ))}
                </div>

                {/* school size */}

                {/* Activities */}
                <FieldSelect
                  className={css.password}
                  id="activity"
                  name="activity"
                  label={activitiesLabel}
                >
                  <option value="" disabled>
                    {activitiesPlaceholder}
                  </option>
                  {schoolActivitiesOptions.map((value, index) => (
                    <option value={value.label} key={index}>
                      {value.label}
                    </option>
                  ))}
                </FieldSelect>
                <OnChange name="activity">
                  {value => {
                    push('schoolActivities', value);
                  }}
                </OnChange>

                {/* selected languages */}
                <div className={css.languageContainer}>
                  <FieldArray name="schoolActivities">
                    {({ fields }) => (
                      <div>
                        {fields.map((name, index) => (
                          <div key={name} className={css.schoolSizeContainer}>
                            <Field
                              className={css.password}
                              component="input"
                              id={
                                formId
                                  ? `${formId}.schoolActivities${index}`
                                  : `schoolActivities${index}`
                              }
                              name={`${name}`}
                              disabled
                            />
                            <button
                              className={css.btnRemove}
                              type="button"
                              onClick={() => fields.remove(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>
                {/* selected langugaes */}

                {/* Activities */}

                {/* Top student nationalities */}
                <FieldSelect
                  className={css.password}
                  id="topStudentNationality"
                  name="topStudentNationality"
                  label={topStudentNationalitiesLabel}
                >
                  <option value="" disabled>
                    {topStudentNationalitiesPlaceholder}
                  </option>
                  {countryCodes.map(country => (
                    <option value={country.en} key={country.code}>
                      {country.en}
                    </option>
                  ))}
                </FieldSelect>

                <OnChange name="topStudentNationality">
                  {value => {
                    push('topStudentNationalities', {
                      nationality: value,
                      numberOfPeople: '',
                    });
                  }}
                </OnChange>

                <div className={css.languageContainer}>
                  <FieldArray name="topStudentNationalities">
                    {({ fields }) => (
                      <div>
                        {fields.map((name, index) => (
                          <div key={name} className={css.schoolSizeContainer}>
                            <Field
                              className={css.password}
                              component="input"
                              id={
                                formId
                                  ? `${formId}.topStudentNationalities${index}`
                                  : `topStudentNationalities${index}`
                              }
                              name={`${name}.nationality`}
                              disabled
                            />

                            <FieldTextInput
                              className={css.nationality}
                              type="number"
                              id={
                                formId
                                  ? `${formId}.topStudentNationalities${index}`
                                  : `topStudentNationalities${index}`
                              }
                              name={`${name}.numberOfPeople`}
                              autoComplete="given-name"
                              placeholder={numberOfPeoplePlaceholder}
                              validate={numberOfPeopleRequired}
                            />
                            <button
                              className={css.btnRemove}
                              type="button"
                              onClick={() => fields.remove(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>
                {/* Top student nationalities */}

                {/* School facilities */}
                <FieldSelect
                  className={css.password}
                  id="schoolFacility"
                  name="schoolFacility"
                  label={schoolFacilitiesLabel}
                >
                  <option value="" disabled>
                    {schoolFacilitiesPlaceholder}
                  </option>
                  {schoolFacilitiesOptions.map((facility, index) => (
                    <option value={facility.key} key={index}>
                      {facility.label}
                    </option>
                  ))}
                </FieldSelect>

                <OnChange name="schoolFacility">
                  {value => {
                    push('schoolFacilities', value);
                  }}
                </OnChange>

                <div className={css.languageContainer}>
                  <FieldArray name="schoolFacilities">
                    {({ fields }) => (
                      <div>
                        {fields.map((name, index) => (
                          <div key={name} className={css.schoolSizeContainer}>
                            <Field
                              className={css.password}
                              component="input"
                              id={
                                formId
                                  ? `${formId}.schoolFacilities${index}`
                                  : `schoolFacilities${index}`
                              }
                              name={`${name}`}
                              disabled
                            />
                            <button
                              className={css.btnRemove}
                              type="button"
                              onClick={() => fields.remove(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* school facilities */}

                {/* class equipment  */}
                <FieldSelect
                  className={css.password}
                  id="classRoomEquipment"
                  name="classRoomEquipment"
                  label={classRoomEquipementsLabel}
                >
                  <option value="" disabled>
                    {classRoomEquipementsPlaceholder}
                  </option>
                  {classroomEquipmentsOptions.map((equipment, index) => (
                    <option value={equipment.key} key={index}>
                      {equipment.label}
                    </option>
                  ))}
                </FieldSelect>
                <OnChange name="classRoomEquipment">
                  {value => {
                    push('classroomEquipments', value);
                  }}
                </OnChange>

                <div className={css.languageContainer}>
                  <FieldArray name="classroomEquipments">
                    {({ fields }) => (
                      <div>
                        {fields.map((name, index) => (
                          <div key={name} className={css.schoolSizeContainer}>
                            <Field
                              className={css.password}
                              component="input"
                              id={
                                formId
                                  ? `${formId}.classroomEquipments${index}`
                                  : `classroomEquipments${index}`
                              }
                              name={`${name}`}
                              disabled
                            />
                            <button
                              className={css.btnRemove}
                              type="button"
                              onClick={() => fields.remove(index)}
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </FieldArray>
                </div>
                {/* class equipment */}
                {/* Minimum Charge */}
                <FieldCurrencyInput
                  id="price"
                  name="price"
                  className={css.password}
                  label={minimumChargeLabel}
                  placeholder={pricePlaceholderMessage}
                  currencyConfig={config.currencyConfig}
                  validate={priceValidators}
                />

                {/* Minimum Charge */}
                <PrimaryButton
                  className={css.password}
                  type="submit"
                  inProgress={submitInProgress}
                  disabled={submitDisabled}
                  ready={pristineSinceLastSubmit}
                >
                  <FormattedMessage id="SignupForm.signUp" />
                </PrimaryButton>

                {/* 3rd flex */}
              </div>
            </Form>
          );
        }}
      />
    );
  }
}

SignupFormSchoolComponent.defaultProps = {
  inProgress: false,
  uploadImageError: null,
  uploadInProgress: false,
  editSchoolProfile: false,
  user: null,
};

const { bool, func, shape, array, arrayOf, string, number } = PropTypes;

SignupFormSchoolComponent.propTypes = {
  inProgress: bool,

  onOpenTermsOfService: func,

  // from injectIntl
  intl: intlShape.isRequired,
  images: array,
  uploadImageError: propTypes.error,
  uploadInProgress: bool,
  updateInProgress: bool,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,
  uploadInProgress: bool,
  fetchErrors: shape({
    publishListingError: propTypes.error,
    showListingsError: propTypes.error,
    uploadImageError: propTypes.error,
    updateListingError: propTypes.error,
  }),
  onRemoveImage: func, // must be required
  countryCodes: arrayOf(
    shape({
      code: string.isRequired,
      en: string.isRequired,
      fr: string.isRequired,
      es: string.isRequired,
      de: string.isRequired,
    })
  ),
  cities: shape({
    areas: arrayOf(
      shape({
        id: number,
        country_code: string,
        area_name_ja: string,
        area_name_en: string,
        thumbnail: string,
        description: string,
      })
    ),
  }),
  schoolSizeOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),

  schoolActivitiesOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),

  schoolFacilitiesOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),

  classroomEquipmentsOptions: arrayOf(
    shape({
      key: string.isRequired,
      label: string.isRequired,
    })
  ),

  languages: arrayOf(
    shape({
      name: string.isRequired,
      code: string.isRequired,
    })
  ),
  editSchoolProfile: bool,
  user: object,
};

const SignupForm = compose(injectIntl)(SignupFormSchoolComponent);
SignupForm.displayName = 'SignupForm';

export default SignupForm;

import React, { Component } from 'react';
import { bool, string } from 'prop-types';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { Field, Form as FinalForm } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { OnChange } from 'react-final-form-listeners';
import { FieldArray } from 'react-final-form-arrays';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';
import { ensureCurrentUser } from '../../util/data';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { isUploadImageOverLimitError } from '../../util/errors';
import { composeValidators, required } from '../../util/validators';
import { Form, Avatar, Button, ImageFromFile, IconSpinner, FieldTextInput, FieldSelect } from '../../components';

import css from './ProfileSettingsForm.module.css';

const ACCEPT_IMAGES = 'image/*';
const UPLOAD_CHANGE_DELAY = 2000; // Show spinner so that browser has time to load img srcset

class ProfileSettingsFormComponent extends Component {
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

  render() {
    return (
      <FinalForm
        {...this.props}
		mutators={{
          ...arrayMutators,
        }}
        render={fieldRenderProps => {
          const {
            className,
            currentUser,
            handleSubmit,
            intl,
            invalid,
            onImageUpload,
            pristine,
            profileImage,
			countryCodes,
            rootClassName,
            updateInProgress,
            updateProfileError,
            uploadImageError,
            uploadInProgress,
			form: {
              mutators: { push, pop },
            },
            values,
          } = fieldRenderProps;

          const user = ensureCurrentUser(currentUser);

          // First name
          const firstNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameLabel',
          });
          const firstNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNamePlaceholder',
          });
          const firstNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.firstNameRequired',
          });
          const firstNameRequired = validators.required(firstNameRequiredMessage);

          // Last name
          const lastNameLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameLabel',
          });
          const lastNamePlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNamePlaceholder',
          });
          const lastNameRequiredMessage = intl.formatMessage({
            id: 'ProfileSettingsForm.lastNameRequired',
          });
          const lastNameRequired = validators.required(lastNameRequiredMessage);

          // Bio
          const bioLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.bioLabel',
          });
          const bioPlaceholder = intl.formatMessage({
            id: 'ProfileSettingsForm.bioPlaceholder',
          });
		  
		  const englishLevelLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.englishLevels.label',
          });
		  
		  const studyAbroadBudgetLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.studyAbroadBudget.label',
          });
		  
		  const studyAbroadDestinationLabel = intl.formatMessage({
            id: 'ProfileSettingsForm.studyAbroadDestination.label',
          });
		  
		  const dateOfBirthDayRequiredMsg = intl.formatMessage({
            id: 'ProfileSettingsForm.dateOfBirth.requiredMsg.day',
          });
		  
		  const dateOfBirthMonthRequiredMsg = intl.formatMessage({
            id: 'ProfileSettingsForm.dateOfBirth.requiredMsg.month',
          });
		  
		  const dateOfBirthYearRequiredMsg = intl.formatMessage({
            id: 'ProfileSettingsForm.dateOfBirth.requiredMsg.year',
          });
		  
          const uploadingOverlay =
            uploadInProgress || this.state.uploadDelay ? (
              <div className={css.uploadingImageOverlay}>
                <IconSpinner />
              </div>
            ) : null;

          const hasUploadError = !!uploadImageError && !uploadInProgress;
          const errorClasses = classNames({ [css.avatarUploadError]: hasUploadError });
          const transientUserProfileImage = profileImage.uploadedImage || user.profileImage;
          const transientUser = { ...user, profileImage: transientUserProfileImage };

          // Ensure that file exists if imageFromFile is used
          const fileExists = !!profileImage.file;
          const fileUploadInProgress = uploadInProgress && fileExists;
          const delayAfterUpload = profileImage.imageId && this.state.uploadDelay;
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
            !fileUploadInProgress && profileImage.imageId ? (
              <Avatar
                className={avatarClasses}
                renderSizes="(max-width: 767px) 96px, 240px"
                user={transientUser}
                disableProfileLink
              />
            ) : null;

          const chooseAvatarLabel =
            profileImage.imageId || fileUploadInProgress ? (
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

          const submitError = updateProfileError ? (
            <div className={css.error}>
              <FormattedMessage id="ProfileSettingsForm.updateProfileFailed" />
            </div>
          ) : null;

          const classes = classNames(rootClassName || css.root, className);
          const submitInProgress = updateInProgress;
          const submittedOnce = Object.keys(this.submittedValues).length > 0;
          const pristineSinceLastSubmit = submittedOnce && isEqual(values, this.submittedValues);
          const submitDisabled = invalid || pristine || pristineSinceLastSubmit || uploadInProgress || submitInProgress;

				  //year list array generate
				  let max = new Date().getFullYear()
				  let min = max - 75
				  let years = []
				  for (let i = max; i >= min; i--) {
					years.push(i)
				  }
				  //year list array generate
				  
				  const englishLevelList = ['beginner','elementary','preIntermediate','intermediate','upperIntermediate','advanced'];
		  
          return (
            <Form
              className={classes}
              onSubmit={e => {
                this.submittedValues = values;
                handleSubmit(e);
              }}
            >
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourProfilePicture" />
                </h3>
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
                <div className={css.tip}>
                  <FormattedMessage id="ProfileSettingsForm.tip" />
                </div>
                <div className={css.fileInfo}>
                  <FormattedMessage id="ProfileSettingsForm.fileInfo" />
                </div>
              </div>
              <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.yourName" />
                </h3>
                <div className={css.nameContainer}>
                  <FieldTextInput
                    className={css.firstName}
                    type="text"
                    id="firstName"
                    name="firstName"
                    label={firstNameLabel}
                    placeholder={firstNamePlaceholder}
                    validate={firstNameRequired}
                  />
                  <FieldTextInput
                    className={css.lastName}
                    type="text"
                    id="lastName"
                    name="lastName"
                    label={lastNameLabel}
                    placeholder={lastNamePlaceholder}
                    validate={lastNameRequired}
                  />
                </div>
              </div>
              <div className={classNames(css.sectionContainer, css.lastSection)}>
                <h3 className={css.sectionTitle}>
                  <FormattedMessage id="ProfileSettingsForm.bioHeading" />
                </h3>
                <FieldTextInput
                  type="textarea"
                  id="bio"
                  name="bio"
                  label={bioLabel}
                  placeholder={bioPlaceholder}
                />
                <p className={css.bioInfo}>
                  <FormattedMessage id="ProfileSettingsForm.bioInfo" />
                </p>
              </div>
			  <div className={css.sectionContainer}>
                <h3 className={css.sectionTitle}>
                  Date of Birth
                </h3>
                <div className={css.nameContainer}>
				  <FieldSelect
                    className={css.title}
                    id="dobDay"
                    name="dobDay"
					label={'Day'}
					validate={composeValidators(
                      required(dateOfBirthDayRequiredMsg)
                    )}
                  >
                    <option value="">
                      {'--Select--'}
                    </option>
                    {
						Array.from(Array(31), (e, i) => {
							let day = i+1;
							return <option value={day}>{day}</option>
						})
					}
                  </FieldSelect>
				  <FieldSelect
                    className={css.title}
                    id="dobMonth"
                    name="dobMonth"
					label={'Month'}
					validate={composeValidators(
                      required(dateOfBirthMonthRequiredMsg)
                    )}
                  >
                    <option value="">
                      {'--Select--'}
                    </option>
                    {
						Array.from(Array(12), (e, i) => {
							let month = i+1;
							return <option value={month}>{month}</option>
						})
					}
                  </FieldSelect>
				  <FieldSelect
                    className={css.title}
                    id="dobYear"
                    name="dobYear"
					label={'Year'}
					validate={composeValidators(
                      required(dateOfBirthYearRequiredMsg)
                    )}
                  >
                    <option value="">
                      {'--Select--'}
                    </option>
                    {
						Array.from(years, (e, i) => {
							return <option value={e}>{e}</option>
						})
					}
                  </FieldSelect>
                </div>
              </div>
			  <div className={classNames(css.sectionContainer, css.lastSection)}>
				<FieldSelect
                  className={css.password}
                  id="englishLevel"
                  name="englishLevel"
                  label={englishLevelLabel}
                >
                  <option value="">
                    {'--Select--'}
                  </option>
                  {englishLevelList.map((level,k) => (
                    <option value={level} key={k}>
                      {intl.formatMessage({id: `ProfileSettingsForm.englishLevels.option.${level}`})}
                    </option>
                  ))}
                </FieldSelect>
              </div>
			  <div className={classNames(css.sectionContainer, css.lastSection)}>
                <FieldTextInput
                  type="text"
                  id="abroadBudget"
                  name="abroadBudget"
                  label={studyAbroadBudgetLabel}
                  placeholder={studyAbroadBudgetLabel}
                />
              </div>
			  {/* studyAbroadDestination */}
                <FieldSelect
                  className={css.password}
                  id="studyAbroadDestination"
                  name="studyAbroadDestination"
                  label={studyAbroadDestinationLabel}
                >
                  <option value="" disabled>
                    {'--Select--'}
                  </option>
                  {countryCodes.map(country => (
                    <option value={country.en} key={country.code}>
					  {country.en}
                    </option>
                  ))}
                </FieldSelect>
                <OnChange name="studyAbroadDestination">
                  {value => {
                    push('studyAbroadDestinations', value);
                  }}
                </OnChange>
                <div className={css.languageContainer}>
                  <FieldArray name="studyAbroadDestinations">
                    {({ fields }) => (
                      <div>
                        {fields.map((name, index) => (
                          <div key={name} className={css.fieldArraySection}>
                            <Field
                              className={css.password}
                              component="input"
                              id={
                                `studyAbroadDestinations${index}`
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
                {/* studyAbroadDestination */}
              {submitError}
              <Button
                className={css.submitButton}
                type="submit"
                inProgress={submitInProgress}
                disabled={submitDisabled}
                ready={pristineSinceLastSubmit}
              >
                <FormattedMessage id="ProfileSettingsForm.saveChanges" />
              </Button>
            </Form>
          );
        }}
      />
    );
  }
}

ProfileSettingsFormComponent.defaultProps = {
  rootClassName: null,
  className: null,
  uploadImageError: null,
  updateProfileError: null,
  updateProfileReady: false,
};

ProfileSettingsFormComponent.propTypes = {
  rootClassName: string,
  className: string,

  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  updateProfileReady: bool,

  // from injectIntl
  intl: intlShape.isRequired,
};

const ProfileSettingsForm = compose(injectIntl)(ProfileSettingsFormComponent);

ProfileSettingsForm.displayName = 'ProfileSettingsForm';

export default ProfileSettingsForm;

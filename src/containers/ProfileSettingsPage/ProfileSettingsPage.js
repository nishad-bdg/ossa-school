import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink,
} from '../../components';
import { ProfileSettingsForm } from '../../forms';
import { TopbarContainer } from '../../containers';
import config from '../../config';
import { findOptionsForSelectFilter } from '../../util/search';
import { SignupFormSchool } from '../../forms';
import {
  updateProfile,
  uploadImage,
  updateSchoolProfile,
} from './ProfileSettingsPage.duck';
import css from './ProfileSettingsPage.module.css';
import languages from '../../json_data/languages.json';
import { countryCodes } from '../../translations/countryCodes';
import cities from '../../json_data/city.json';

const { LatLng, Money } = sdkTypes;

const onImageUploadHandler = (values, fn) => {
  const { id, imageId, file } = values;
  if (file) {
    fn({ id, imageId, file });
  }
};

export class ProfileSettingsPageComponent extends Component {
  constructor(props) {
    super(props);

    this.getInitialValues = this.getInitialValues.bind(this);

    this.state = {
      initialValues: this.getInitialValues(),
    };
  }

  getInitialValues() {
    const { currentUser } = this.props;
    const userData = ensureCurrentUser(currentUser);
    const { publicData } = userData.attributes.profile;

    // Only render current search if full place object is available in the URL params
    // TODO bounds are missing - those need to be queried directly from Google Places
    const locationFieldsPresent =
      publicData &&
      publicData.location &&
      publicData.location.address &&
      publicData.geolocation;
    const location =
      publicData && publicData.location ? publicData.location : {};
    const { address } = location;

    return {
      location: locationFieldsPresent
        ? {
            search: address,
            selectedPlace: {
              address,
              origin: new LatLng(
                publicData.geolocation.lat,
                publicData.geolocation.lng
              ),
            },
          }
        : null,
    };
  }
  render() {
    const {
      currentUser,
      image,
      onImageUpload,
      onUpdateProfile,
      onUpdateSchoolProfile,
      scrollingDisabled,
      updateInProgress,
      updateProfileError,
      uploadImageError,
      uploadInProgress,
      intl,
    } = this.props;

    const handleSubmit = values => {
      const { firstName, lastName, bio: rawBio, ...rest } = values;
      // Ensure that the optional bio is a string
      const bio = rawBio || '';

      const profile = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        bio,
		publicData:{
			dateOfBirth:{
				dobDay:rest.dobDay,
				dobMonth:rest.dobMonth,
				dobYear:rest.dobYear
			},
			englishLevel:rest.englishLevel,
			abroadBudget:rest.abroadBudget,
			studyAbroadDestinations:rest.studyAbroadDestinations
		}
      };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? { ...profile, profileImageId: uploadedImage.imageId }
          : profile;
      onUpdateProfile(updatedValues);
    };

    const handleSchoolSubmit = values => {
      const { price, location, ...rest } = values;

      const {
        selectedPlace: { address, origin },
      } = location;

      const profile = {
        price: {
          amount: price.amount,
          currency: price.currency,
        },
        geolocation: origin,
        location: { address },
        ...rest,
      };
      const uploadedImage = this.props.image;

      // Update profileImage only if file system has been accessed
      const updatedValues =
        uploadedImage && uploadedImage.imageId && uploadedImage.file
          ? { ...profile, profileImageId: uploadedImage.imageId }
          : profile;
      this.setState({
        initialValues: {
          location: { search: address, selectedPlace: { address, origin } },
        },
      });
      onUpdateSchoolProfile(updatedValues);
    };

    const user = ensureCurrentUser(currentUser);
    const { firstName, lastName, bio } = user.attributes.profile;
    const profileImageId = user.profileImage ? user.profileImage.id : null;
    const profileImage = image || { imageId: profileImageId };

    const schoolSizeOptions = findOptionsForSelectFilter(
      'schoolSize',
      config.custom.filters
    );
    const schoolActivitiesOptions = findOptionsForSelectFilter(
      'schoolActivities',
      config.custom.filters
    );
    const schoolFacilitiesOptions = findOptionsForSelectFilter(
      'schoolFacilities',
      config.custom.filters
    );
    const classroomEquipmentsOptions = findOptionsForSelectFilter(
      'classroomEquipments',
      config.custom.filters
    );
	
	const { publicData } = currentUser.attributes.profile.publicData
      ? currentUser.attributes.profile
      : null;

    const profileSettingsForm = user.id ? (
      <ProfileSettingsForm
        className={css.form}
        currentUser={currentUser}
        initialValues={{
          firstName,
          lastName,
          bio,
		  dobDay: typeof publicData.dateOfBirth != 'undefined'?publicData.dateOfBirth.dobDay:'',
		  dobMonth: typeof publicData.dateOfBirth != 'undefined'?publicData.dateOfBirth.dobMonth:'',
		  dobYear: typeof publicData.dateOfBirth != 'undefined'?publicData.dateOfBirth.dobYear:'',
		  englishLevel: publicData.englishLevel,
		  abroadBudget: publicData.abroadBudget,
		  studyAbroadDestinations: publicData.studyAbroadDestinations,
          profileImage: user.profileImage,
        }}
        user={user}
		countryCodes={countryCodes}
        profileImage={profileImage}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
        onSubmit={handleSubmit}
      />
    ) : null;

    // School Profile Settings
    const editSchoolProfile = true;

    const priceAsMoney =
      currentUser.attributes.profile.publicData.type === 'school'
        ? new Money(publicData.price.amount, publicData.price.currency)
        : null;

    const initialValues = {
      schoolName: publicData.schoolName,
      email: currentUser.attributes.email,
      description: publicData.description,
      country: publicData.country,
      city: publicData.city,
      phoneNo: publicData.phoneNo,
      postalCode: publicData.postalCode,
      schoolSize: publicData.schoolSize,
      videoLinks: publicData.videoLinks,
      supportStaffName: publicData.supportStaffName,
      language: publicData.language,
      languagesSpokenByStaff: publicData.languagesSpokenByStaff,
      messageFromTheStaff: publicData.messageFromTheStaff,
      schoolActivities: publicData.schoolActivities,
      topStudentNationalities: publicData.topStudentNationalities,
      schoolFacilities: publicData.schoolFacilities,
      classroomEquipments: publicData.classroomEquipments,
      price: priceAsMoney,
      profileImage: user.profileImage,
      ...this.state.initialValues,
    };

    const schoolProfileSettingsForm = (
      <SignupFormSchool
        className={css.signupForm}
        initialValues={initialValues}
        onSubmit={handleSchoolSubmit}
        editSchoolProfile={editSchoolProfile}
        countryCodes={countryCodes}
        schoolSizeOptions={schoolSizeOptions}
        schoolActivitiesOptions={schoolActivitiesOptions}
        schoolFacilitiesOptions={schoolFacilitiesOptions}
        classroomEquipmentsOptions={classroomEquipmentsOptions}
        currentUser={currentUser}
        user={user}
        cities={cities}
        languages={languages}
        profileImage={profileImage}
        onImageUpload={e => onImageUploadHandler(e, onImageUpload)}
        uploadInProgress={uploadInProgress}
        updateInProgress={updateInProgress}
        uploadImageError={uploadImageError}
        updateProfileError={updateProfileError}
      />
    );
    //School profile settings

    const title = intl.formatMessage({ id: 'ProfileSettingsPage.title' });
    return (
      <Page
        className={css.root}
        title={title}
        scrollingDisabled={scrollingDisabled}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ProfileSettingsPage" />
            <UserNav selectedPageName="ProfileSettingsPage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.content}>
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="ProfileSettingsPage.heading" />
                </h1>
                {user.id ? (
                  <NamedLink
                    className={css.profileLink}
                    name="ProfilePage"
                    params={{ id: user.id.uuid }}
                  >
                    <FormattedMessage id="ProfileSettingsPage.viewProfileLink" />
                  </NamedLink>
                ) : null}
              </div>
              {currentUser &&
              currentUser.attributes.profile.publicData.type !== 'school'
                ? profileSettingsForm
                : schoolProfileSettingsForm}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ProfileSettingsPageComponent.defaultProps = {
  currentUser: null,
  uploadImageError: null,
  updateProfileError: null,
  image: null,
};

const { bool, func, object, shape, string } = PropTypes;

ProfileSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  image: shape({
    id: string,
    imageId: propTypes.uuid,
    file: object,
    uploadedImage: propTypes.image,
  }),
  onImageUpload: func.isRequired,
  onUpdateProfile: func.isRequired,
  onUpdateSchoolProfile: func.isRequired,
  scrollingDisabled: bool.isRequired,
  updateInProgress: bool.isRequired,
  updateProfileError: propTypes.error,
  uploadImageError: propTypes.error,
  uploadInProgress: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    image,
    uploadImageError,
    uploadInProgress,
    updateInProgress,
    updateProfileError,
  } = state.ProfileSettingsPage;
  return {
    currentUser,
    image,
    scrollingDisabled: isScrollingDisabled(state),
    updateInProgress,
    updateProfileError,
    uploadImageError,
    uploadInProgress,
  };
};

const mapDispatchToProps = dispatch => ({
  onImageUpload: data => dispatch(uploadImage(data)),
  onUpdateProfile: data => dispatch(updateProfile(data)),
  onUpdateSchoolProfile: data => dispatch(updateSchoolProfile(data)),
});

const ProfileSettingsPage = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(ProfileSettingsPageComponent);

export default ProfileSettingsPage;

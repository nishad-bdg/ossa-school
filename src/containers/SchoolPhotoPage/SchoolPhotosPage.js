import React from 'react';
import { func, object, shape } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from '../../util/reactIntl';
import { connect } from 'react-redux';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';

import { Page, UserNav } from '../../components';
import { TopbarContainer } from '..';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import { EditAccomodationPhotosForm } from '../../forms';

import {
  updateSchoolPhotos,
  clearUpdatedTab,
  requestImageUpload,
  updateImageOrder,
  removeListingImage,
} from './SchoolPhotosPage.duck';

import css from './SchoolPhotosPage.module.css';

// N.B. All the presentational content needs to be extracted to their own components
export const SchoolPhotosPageComponent = props => {
  const {
    currentUser,
    history,
    intl,
    onUpdateSchoolPhotos,
    onChange,
    page,
    onImageUpload,
    onRemoveListingImage,
    onUpdateImageOrder,
    scrollingDisabled,
  } = props;

  
  const ensuredCurrentUser = ensureCurrentUser(currentUser);
  const currentSchoolPhotos = ensuredCurrentUser?.attributes?.profile?.publicData?.schoolPhotos

    const imageIdsParse = images => {
      return JSON.parse(images)
    };
  const currentImages = currentSchoolPhotos && currentSchoolPhotos.images ? imageIdsParse(currentSchoolPhotos.images) : [];

  const imageIds = images => {
    return images ? JSON.stringify(images.map((data)=>{
      return data.original??data
    })) : null;
  };
  const onSubmitData = (values) => {
      const { images: updatedImages, ...otherValues } = values;
    const imageProperty =
      typeof updatedImages !== 'undefined' ? { images: imageIds(updatedImages)??{} } : {};
      const updateValuesWithImages = { ...otherValues, ...imageProperty };
      onUpdateSchoolPhotos(updateValuesWithImages).then((r) => {

        window.location.reload();
      })
  };

  const {
    createListingDraftError = null,
    publishListingError = null,
    updateListingError = null,
    showListingsError = null,
  } = page;
  const errors = {
    createListingDraftError,
    publishListingError,
    updateListingError,
    showListingsError,
  };
  // Show form if user is posting a new listing or editing existing one
  const disableForm = page.redirectToListing && !showListingsError;
  const classes = classNames(css.root, css.panel);

    // Images not yet connected to the listing
    const imageOrder = page.imageOrder || [];
    const unattachedImages = imageOrder.map(i => page.images[i]);
    const allImages = currentImages.concat(unattachedImages);
    const removedImageIds = page.removedImageIds || [];
    const images = allImages.filter(img => {
      return !removedImageIds.includes(img.id);
    });

  const title = intl.formatMessage({ id: 'SchoolPhotosPage.title' });
  const submitButton = intl.formatMessage({ id: 'EditAccomodationWizard.saveNewPhotos' });
  const panelTitle = <FormattedMessage id="EditAccomodationPhotosPanel.createListingTitle" />;
  return (
    <Page title={title} scrollingDisabled={false}>
      <TopbarContainer
        className={css.topbar}
        mobileRootClassName={css.mobileTopbar}
        desktopClassName={css.desktopTopbar}
        mobileClassName={css.mobileTopbar}
      />
      <UserNav selectedPageName="SchoolPhotoPage" />
      <div className={classes}>
      <div className={css.nav}>
        <h1 className={css.title}>{panelTitle}</h1>
      <EditAccomodationPhotosForm
          className={css.form}
          disabled={false}
          inavlid={false}
          ready={page.updateInProgress}
          fetchErrors={errors}
          initialValues={{ images }}
          images={images}
          onImageUpload={onImageUpload}
          onSubmit={values => {
            const { addImage, ...updateValues } = values;
            onSubmitData(updateValues);
          }}
          onChange={onChange}
          onUpdateImageOrder={onUpdateImageOrder}
          onRemoveImage={onRemoveListingImage}
          saveActionMsg={submitButton}
          updated={true}
          updateInProgress={page.updateInProgress}
        />
        </div>
        </div>
     
    </Page>
  );
};

SchoolPhotosPageComponent.defaultProps = {
  currentUser: null,
  currentUserHasOrders: null,
  listingDraft: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

SchoolPhotosPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  onUpdateSchoolPhotos: func.isRequired,
  onChange: func.isRequired,
  page: object.isRequired,

  /* from withRouter */
  history: shape({
    push: func.isRequired,
  }).isRequired,

  /* from injectIntl */
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const page = state.SchoolPhotosPage;
  const { currentUser } = state.user;
  return {
    currentUser,
    page,
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateSchoolPhotos: (values) => dispatch(updateSchoolPhotos(values)),
  onChange: () => dispatch(clearUpdatedTab()),
  onImageUpload: data => dispatch(requestImageUpload(data)),
  onUpdateImageOrder: imageOrder => dispatch(updateImageOrder(imageOrder)),
  onRemoveListingImage: imageId => dispatch(removeListingImage(imageId)),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const SchoolPhotosPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(injectIntl(SchoolPhotosPageComponent));

export default SchoolPhotosPage;

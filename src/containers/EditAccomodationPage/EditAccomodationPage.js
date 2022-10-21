import React from 'react';
import { func, object, shape, string, oneOf } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from '../../util/reactIntl';
import { connect } from 'react-redux';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES
} from '../../util/urlHelpers';
import { propTypes } from '../../util/types';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';

import { EditAccomodationWizard, Page, UserNav } from '../../components';
import { TopbarContainer } from '../../containers';

import {
  updateAccomodation,
  clearUpdatedTab,
  requestImageUpload,
  updateImageOrder,
  removeListingImage,
} from './EditAccomodationPage.duck';

import css from './EditAccomodationPage.module.css';

// N.B. All the presentational content needs to be extracted to their own components
export const EditAccomodationPageComponent = props => {
  const {
    currentUser,
    history,
    intl,
    onUpdateAccomodation,
    onManageDisableScrolling,
    onChange,
    page,
    params,
    onImageUpload,
    onRemoveListingImage,
    onUpdateImageOrder,
    scrollingDisabled,
  } = props;

  const { type } = params;
  const isNewURI = type === LISTING_PAGE_PARAM_TYPE_NEW;
  const isDraftURI = type === LISTING_PAGE_PARAM_TYPE_DRAFT;
  const isNewListingFlow = isNewURI || isDraftURI;

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


  const title = isNewListingFlow
    ? intl.formatMessage({ id: 'EditAccomodationPage.titleCreateListing' })
    : intl.formatMessage({ id: 'EditAccomodationPage.titleEditListing' });

  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <TopbarContainer
        className={css.topbar}
        mobileRootClassName={css.mobileTopbar}
        desktopClassName={css.desktopTopbar}
        mobileClassName={css.mobileTopbar}
      />
      <UserNav selectedPageName="EditAccomodationPage"/>
      <EditAccomodationWizard
        id="EditListingWizard"
        className={css.wizard}
        params={params}
        page={page}
        disabled={disableForm}
        errors={errors}
        history={history}
        newListingPublished={false}
        onUpdateAccomodation={onUpdateAccomodation}
        onChange={onChange}
        currentUser={currentUser}
        onImageUpload={onImageUpload}
        onUpdateImageOrder={onUpdateImageOrder}
        onRemoveImage={onRemoveListingImage}
        onManageDisableScrolling={onManageDisableScrolling}
        updateInProgress={page.updateInProgress}
      />
    </Page>
  );
};

EditAccomodationPageComponent.defaultProps = {
  currentUser: null,
  currentUserHasOrders: null,
  listingDraft: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

EditAccomodationPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  onManageDisableScrolling: func.isRequired,
  onUpdateAccomodation: func.isRequired,
  onChange: func.isRequired,
  page: object.isRequired,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: string.isRequired,
  }).isRequired,

  /* from withRouter */
  history: shape({
    push: func.isRequired,
  }).isRequired,

  /* from injectIntl */
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const page = state.EditAccomodationPage;
  const { currentUser } = state.user;

  const getOwnListing = id => {
    const listings = getMarketplaceEntities(state, [{ id, type: 'ownListing' }]);

    return listings.length === 1 ? listings[0] : null;
  };
  return {
    currentUser,
    getOwnListing,
    page,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateAccomodation: (tab, values, id) => dispatch(updateAccomodation(tab, values, id)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
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
const EditAccomodationPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(injectIntl(EditAccomodationPageComponent));

export default EditAccomodationPage;

import React from 'react';
import { func, object, shape, string, oneOf } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from '../../util/reactIntl';
import { connect } from 'react-redux';
import { propTypes } from '../../util/types';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';

import { EditTagSettingsWizard, Page, UserNav } from '../../components';
import { TopbarContainer } from '..';

import {
  updateTagSettings,
  clearUpdatedTab,
} from './EditTagSettingsPage.duck';

import css from './EditTagSettingsPage.module.css';

// N.B. All the presentational content needs to be extracted to their own components
export const EditTagSettingsPageComponent = props => {
  const {
    currentUser,
    history,
    intl,
    onUpdateTagSettings,
    onManageDisableScrolling,
    onChange,
    page,
    params,
    scrollingDisabled,
  } = props;

  const {
    publishListingError = null,
    updateListingError = null,
    showListingsError = null,
  } = {
    publishListingError: null,
    updateListingError: null,
    showListingsError: null,
  };
  const errors = {
    publishListingError,
    updateListingError,
    showListingsError,
  };
  // TODO: is this dead code? (shouldRedirect is checked before)
  const newListingPublished = false;

  // Show form if user is posting a new listing or editing existing one
  const disableForm = true;


  const title = intl.formatMessage({ id: 'EditTagSettingsPage.titleCreateListing' })
  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <TopbarContainer
        className={css.topbar}
        mobileRootClassName={css.mobileTopbar}
        desktopClassName={css.desktopTopbar}
        mobileClassName={css.mobileTopbar}
      />
      <UserNav selectedPageName="TagSettingsPage" />
      <EditTagSettingsWizard
        id="EditTagSettingsWizard"
        className={css.wizard}
        params={params}
        disabled={disableForm}
        errors={errors}
        newListingPublished={newListingPublished}
        history={history}
        onUpdateTagSettings={onUpdateTagSettings}
        onChange={onChange}
        currentUser={currentUser}
        onManageDisableScrolling={onManageDisableScrolling}
        updateInProgress={page.updateInProgress}
      />
    </Page>
  );
};

EditTagSettingsPageComponent.defaultProps = {
  currentUser: null,
  currentUserHasOrders: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

EditTagSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  onManageDisableScrolling: func.isRequired,
  onUpdateTagSettings: func.isRequired,
  onChange: func.isRequired,
  params: shape({
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
  const page = state.EditTagSettingsPage;
  const { currentUser } = state.user;
  return {
    currentUser,
    page,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateTagSettings: (values) => dispatch(updateTagSettings(values)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onChange: () => dispatch(clearUpdatedTab()),
});
const EditTagSettingsPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(injectIntl(EditTagSettingsPageComponent));

export default EditTagSettingsPage;

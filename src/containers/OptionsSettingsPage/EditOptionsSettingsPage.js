import React from 'react';
import { func, object, shape, string, oneOf } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from '../../util/reactIntl';
import { connect } from 'react-redux';
import { propTypes } from '../../util/types';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';

import { EditOptionsSettingsWizard, Page, UserNav } from '../../components';
import { TopbarContainer } from '..';

import {
  updateOptionsSettings,
  clearUpdatedTab,
} from './EditOptionsSettingsPage.duck';

import css from './EditOptionsSettingsPage.module.css';

// N.B. All the presentational content needs to be extracted to their own components
export const EditOptionsSettingsPageComponent = props => {
  const {
    currentUser,
    history,
    intl,
    onUpdateOptionsSettings,
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


  const title = intl.formatMessage({ id: 'EditOptionsSettingsPage.titleCreateListing' })
  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <TopbarContainer
        className={css.topbar}
        mobileRootClassName={css.mobileTopbar}
        desktopClassName={css.desktopTopbar}
        mobileClassName={css.mobileTopbar}
      />
      <UserNav selectedPageName="OptionsSettingsPage" />
      <EditOptionsSettingsWizard
        id="EditOptionsSettingsWizard"
        className={css.wizard}
        params={params}
        disabled={disableForm}
        errors={errors}
        newListingPublished={newListingPublished}
        history={history}
        onUpdateOptionsSettings={onUpdateOptionsSettings}
        onChange={onChange}
        currentUser={currentUser}
        onManageDisableScrolling={onManageDisableScrolling}
        updateInProgress={page.updateInProgress}
      />
    </Page>
  );
};

EditOptionsSettingsPageComponent.defaultProps = {
  currentUser: null,
  currentUserHasOrders: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

EditOptionsSettingsPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  onManageDisableScrolling: func.isRequired,
  onUpdateOptionsSettings: func.isRequired,
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
  const page = state.EditOptionsSettingsPage;
  const { currentUser } = state.user;
  return {
    currentUser,
    page,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateOptionsSettings: (values) => dispatch(updateOptionsSettings(values)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onChange: () => dispatch(clearUpdatedTab()),
});
const EditOptionsSettingsPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(injectIntl(EditOptionsSettingsPageComponent));

export default EditOptionsSettingsPage;

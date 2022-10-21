import React from 'react';
import { func, object, shape, string, oneOf } from 'prop-types';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { intlShape, injectIntl } from '../../util/reactIntl';
import { connect } from 'react-redux';
import { propTypes } from '../../util/types';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';

import { EditFixedCostWizard, Page, UserNav } from '../../components';
import { TopbarContainer } from '../../containers';

import {
  updateFixedCost,
  clearUpdatedTab,
} from './EditFixedCostPage.duck';

import css from './EditFixedCostPage.module.css';

// N.B. All the presentational content needs to be extracted to their own components
export const EditFixedCostPageComponent = props => {
  const {
    currentUser,
    history,
    intl,
    onUpdateFixedCost,
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


  const title = intl.formatMessage({ id: 'EditFixedCostPage.titleCreateListing' })
  return (
    <Page title={title} scrollingDisabled={scrollingDisabled}>
      <TopbarContainer
        className={css.topbar}
        mobileRootClassName={css.mobileTopbar}
        desktopClassName={css.desktopTopbar}
        mobileClassName={css.mobileTopbar}
      />
      <UserNav selectedPageName="FixedCostSettingsPage" />
      <EditFixedCostWizard
        id="EditFixedCostWizard"
        className={css.wizard}
        params={params}
        disabled={disableForm}
        errors={errors}
        newListingPublished={newListingPublished}
        history={history}
        onUpdateFixedCost={onUpdateFixedCost}
        onChange={onChange}
        currentUser={currentUser}
        onManageDisableScrolling={onManageDisableScrolling}
        updateInProgress={page.updateInProgress}
      />
    </Page>
  );
};

EditFixedCostPageComponent.defaultProps = {
  currentUser: null,
  currentUserHasOrders: null,
  notificationCount: 0,
  sendVerificationEmailError: null,
};

EditFixedCostPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  onManageDisableScrolling: func.isRequired,
  onUpdateFixedCost: func.isRequired,
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
  const page = state.EditFixedCostPage;
  const { currentUser } = state.user;
  return {
    currentUser,
    page,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const mapDispatchToProps = dispatch => ({
  onUpdateFixedCost: (values) => dispatch(updateFixedCost(values)),
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onChange: () => dispatch(clearUpdatedTab()),
});
const EditFixedCostPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(injectIntl(EditFixedCostPageComponent));

export default EditFixedCostPage;

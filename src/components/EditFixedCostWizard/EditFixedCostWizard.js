import React, { Component } from 'react';
import { func, number, object, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { withViewport } from '../../util/contextHelpers';
import { propTypes } from '../../util/types';
import { ensureCurrentUser } from '../../util/data';
import { NamedRedirect, Tabs } from '..';

import EditFixedCostWizardTab, {
  ENROLLMENTFEE,
  //MAINTENANCEFEE,
  HIGHSEASON
} from './EditFixedCostWizardTab';
import css from './EditFixedCostWizard.module.css';

export const TABS = [
  ENROLLMENTFEE,
  //MAINTENANCEFEE,
  HIGHSEASON
];
// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

const tabLabel = (intl, tab) => {
  let key = null;
  if (tab === ENROLLMENTFEE) {
    key = 'EditFixedCostWizard.tabLabelEnrollmentFee';
  // } else if (tab === MAINTENANCEFEE) {
  //   key = 'EditFixedCostWizard.tabLabelMaintenanceFee';
  } else if (tab === HIGHSEASON) {
    key = 'EditFixedCostWizard.tabLabelHighSeason';
  }

  return intl.formatMessage({ id: key });
};

const tabCompleted = (tab, fixedCost) => {
  switch (tab) {
    case ENROLLMENTFEE:
      return fixedCost && Object.keys(fixedCost).length && typeof fixedCost.enrollmentfee !== 'undefined';
    // case MAINTENANCEFEE:
    //   return fixedCost && Object.keys(fixedCost).length && typeof fixedCost.maintenancefee !== 'undefined';
    case HIGHSEASON:
      return fixedCost && Object.keys(fixedCost).length && typeof fixedCost.highseason !== 'undefined';
    default:
      return false;
  }
};

const tabsActive = (isNew, allFixedCostData) => {
  return TABS.reduce((fixedCost, tab) => {
    const previousTabIndex = TABS.findIndex(t => t === tab) - 1;

    const isActive =
      previousTabIndex >= 0 ? !isNew || tabCompleted(TABS[previousTabIndex], allFixedCostData) : true;
    return { ...fixedCost, [tab]: isActive };
  }, {});
};





const scrollToTab = (tabPrefix, tabId) => {
  const el = document.querySelector(`#${tabPrefix}_${tabId}`);
  if (el) {
    el.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    });
  }
};

// Create a new or edit listing through EditListingWizard
class EditFixedCostWizard extends Component {
  constructor(props) {
    super(props);

    // Having this info in state would trigger unnecessary rerendering
    this.hasScrolledToTab = false;

    this.handleCreateFlowTabScrolling = this.handleCreateFlowTabScrolling.bind(this);
  }

  handleCreateFlowTabScrolling(shouldScroll) {
    this.hasScrolledToTab = shouldScroll;
  }
  render() {
    const {
      id,
      className,
      rootClassName,
      params,
      viewport,
      intl,
      errors,
      onManageDisableScrolling,
      currentUser,
      ...rest
    } = this.props;
    const selectedTab =  params.tab
    const isNewFlow = true;
    const rootClasses = rootClassName || css.root;
    const classes = classNames(rootClasses, className);

    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const allPublicData = ensuredCurrentUser?.attributes?.profile?.publicData
    const allFixedCostData = allPublicData?.fixedCost ?? {}
    const tabsStatus = tabsActive(isNewFlow, allFixedCostData);

    // If selectedTab is not active, redirect to the beginning of wizard
    if (!tabsStatus[selectedTab]) {
      const currentTabIndex = TABS.indexOf(selectedTab);
      const nearestActiveTab = TABS.slice(0, currentTabIndex)
        .reverse()
        .find(t => tabsStatus[t]);

      return <NamedRedirect name="EditFixedCostSettingsPage" params={{ tab: nearestActiveTab }} />;
    }

    const { width } = viewport;
    const hasViewport = width > 0;
    const hasHorizontalTabLayout = hasViewport && width <= MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasVerticalTabLayout = hasViewport && width > MAX_HORIZONTAL_NAV_SCREEN_WIDTH;
    const hasFontsLoaded =
      hasViewport && document.documentElement.classList.contains('fontsLoaded');

    // Check if scrollToTab call is needed (tab is not visible on mobile)
    if (hasVerticalTabLayout) {
      this.hasScrolledToTab = true;
    } else if (hasHorizontalTabLayout && !this.hasScrolledToTab && hasFontsLoaded) {
      const tabPrefix = id;
      scrollToTab(tabPrefix, selectedTab);
      this.hasScrolledToTab = true;
    }

    const tabLink = tab => {
      return { name: 'EditFixedCostSettingsPage', params: { ...params, tab } };
    };
    return (
      <div className={classes}>
        <Tabs
          rootClassName={css.tabsContainer}
          navRootClassName={css.nav}
          tabRootClassName={css.tab}
        >
          {TABS.map(tab => {
            return (
              <EditFixedCostWizardTab
                {...rest}
                key={tab}
                tabId={`${id}_${tab}`}
                tabLabel={tabLabel(intl, tab)}
                tabLinkProps={tabLink(tab)}
                selected={selectedTab === tab}
                disabled={isNewFlow && !tabsStatus[tab]}
                tab={tab}
                intl={intl}
                params={params}
                marketplaceTabs={TABS}
                errors={errors}
                allFixedCostData={allFixedCostData}
                handleCreateFlowTabScrolling={this.handleCreateFlowTabScrolling}
              />
            );
          })}
        </Tabs>
      </div>
    );
  }
}

EditFixedCostWizard.defaultProps = {
  className: null,
  currentUser: null,
  rootClassName: null,
  allFixedCostData: null,
  updateInProgress: false,
};

EditFixedCostWizard.propTypes = {
  id: string.isRequired,
  className: string,
  currentUser: propTypes.currentUser,
  rootClassName: string,
  params: shape({
    tab: oneOf(TABS).isRequired,
  }).isRequired,
  errors: shape({
    createListingDraftError: object,
    updateListingError: object,
    publishListingError: object,
    showListingsError: object,
  }).isRequired,
  allFixedCostData: object,
  onManageDisableScrolling: func.isRequired,
  // from withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,
  // from injectIntl
  intl: intlShape.isRequired,
};

export default compose(
  withViewport,
  injectIntl
)(EditFixedCostWizard);

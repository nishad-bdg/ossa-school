import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import {
  EditMaintenanceFeePanel,
  EditEnrollmentFeePanel,
  EditHighSeasonPanel
} from '..';
import css from './EditFixedCostWizard.module.css';
export const HIGHSEASON = 'highseason';
//export const MAINTENANCEFEE = 'maintenancefee';
export const ENROLLMENTFEE = 'enrollmentfee';

// EditFixedCostWizardTab component supports these tabs
export const SUPPORTED_TABS = [
  //MAINTENANCEFEE,
  HIGHSEASON,
  ENROLLMENTFEE
];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

// When user has update draft listing, he should be redirected to next EditFixedCostWizardTab
const redirectAfterDraftUpdate = (params, tab, marketplaceTabs, history) => {
  const currentPathParams = {
    ...params};
  const routes = routeConfiguration();
  // Redirect to next tab
  const nextPathParams = pathParamsToNextTab(currentPathParams, tab, marketplaceTabs);
  if (tab == 'highseason') {
    var to = createResourceLocatorString('FixedCostSettingsPage', routes, nextPathParams, {});
    history.push(to);
  } else {
    var to = createResourceLocatorString('EditFixedCostSettingsPage', routes, nextPathParams, {});
    history.push(to);
  }
};

const EditFixedCostWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    history,
    allFixedCostData,
    onUpdateFixedCost,
    onChange,
    updatedTab,
    updateInProgress,
    intl,
  } = props;

  const onCompleteEditFixedCostWizardTab = (tab, values) => {
    const newUpdateValues = {...allFixedCostData, 
      [tab]: values
    }
    // redirectAfterDraftUpdate(params, tab, marketplaceTabs, history);
  onUpdateFixedCost(newUpdateValues).then((r) => {

      redirectAfterDraftUpdate(params, tab, marketplaceTabs, history);
    
    })
  };

  const panelProps = tab => {
    return {
      className: css.panel,
      errors,
      allFixedCostData,
      onChange,
      panelUpdated: updatedTab === tab,
      updateInProgress,
      ready: false,
      disabled: false,
    };
  };

  switch (tab) {
    case ENROLLMENTFEE: {
      const submitButtonTranslationKey = 'EditFixedCostWizard.saveNewEnrollment';
      return (
        <EditEnrollmentFeePanel
          {...panelProps(ENROLLMENTFEE)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditFixedCostWizardTab(tab, values);
          }}
        />
      );
    }
    
    // case MAINTENANCEFEE: {
    //   const submitButtonTranslationKey = 'EditFixedCostWizard.saveNewMainteance';
    //   return (
    //     <EditMaintenanceFeePanel
    //       {...panelProps(MAINTENANCEFEE)}
    //       submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
    //       onSubmit={values => {
    //         onCompleteEditFixedCostWizardTab(tab, values);
    //       }}
    //     />
    //   );
    // }
    
    case HIGHSEASON: {
      const submitButtonTranslationKey = 'EditFixedCostWizard.saveNewHighSeason';
      return (
        <EditHighSeasonPanel
          {...panelProps(HIGHSEASON)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditFixedCostWizardTab(tab, values);
          }}
        />
      );
    }
    default:
      return null;
  }
};

EditFixedCostWizardTab.defaultProps = {
  allFixedCostData: null,
  updatedTab: null,
};

const { bool, func, object, shape, string } = PropTypes;

EditFixedCostWizardTab.propTypes = {
  newListingPublished: bool.isRequired,
  history: shape({
    push: func.isRequired,
    replace: func.isRequired,
  }).isRequired,
  allFixedCostData: object,
  handleCreateFlowTabScrolling: func.isRequired,
  onUpdateFixedCost: func.isRequired,
  onChange: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,
  intl: intlShape.isRequired,
};

export default EditFixedCostWizardTab;

import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { EditAirportTransferPanel } from '..';
import css from './EditOptionsSettingsWizard.module.css';
export const AIRPORTTRANSFER = 'airporttransfer';

// EditOptionsSettingsWizardTab component supports these tabs
export const SUPPORTED_TABS = [
  AIRPORTTRANSFER
];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

// When user has update draft listing, he should be redirected to next EditOptionsSettingsWizardTab
const redirectAfterDraftUpdate = (params, tab, marketplaceTabs, history) => {
  const currentPathParams = {
    ...params
  };
  const routes = routeConfiguration();
  // Redirect to next tab
  const nextPathParams = pathParamsToNextTab(currentPathParams, tab, marketplaceTabs);
  if (tab == 'airporttransfer') {
    var to = createResourceLocatorString('OptionsSettingsPage', routes, nextPathParams, {});
    history.push(to);
  } else {
    var to = createResourceLocatorString('EditOptionsSettingsPage', routes, nextPathParams, {});
    history.push(to);
  }
};

const EditOptionsSettingsWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    history,
    allOptionsSettinsData,
    onUpdateOptionsSettings,
    onChange,
    updatedTab,
    updateInProgress,
    intl,
  } = props;

  
  const onCompleteEditOptionsSettingsWizardTab = (tab, values) => {
    const newUpdateValues = {
      ...allOptionsSettinsData,
      [tab]: values
    }
    onUpdateOptionsSettings(newUpdateValues).then((r) => {

      redirectAfterDraftUpdate(params, tab, marketplaceTabs, history);

    })
  };

  const panelProps = tab => {
    return {
      className: css.panel,
      errors,
      allOptionsSettinsData,
      onChange,
      panelUpdated: updatedTab === tab,
      updateInProgress,
      ready: false,
      disabled: false,
    };
  };

  switch (tab) {
    case AIRPORTTRANSFER: {
      const submitButtonTranslationKey = 'EditOptionsSettingsWizard.saveNewAirport';
      return (
        <EditAirportTransferPanel
          {...panelProps(AIRPORTTRANSFER)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditOptionsSettingsWizardTab(tab, values);
          }}
        />
      );
    }
    default:
      return null;
  }
};

EditOptionsSettingsWizardTab.defaultProps = {
  allOptionsSettinsData: null,
  updatedTab: null,
};

const { bool, func, object, shape, string } = PropTypes;

EditOptionsSettingsWizardTab.propTypes = {
  newListingPublished: bool.isRequired,
  history: shape({
    push: func.isRequired,
    replace: func.isRequired,
  }).isRequired,
  allOptionsSettinsData: object,
  handleCreateFlowTabScrolling: func.isRequired,
  onUpdateOptionsSettings: func.isRequired,
  onChange: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,
  intl: intlShape.isRequired,
};

export default EditOptionsSettingsWizardTab;

import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';
import { createResourceLocatorString } from '../../util/routes';
import { EditStudyAbroadPanel, EditProgramsPanel, EditTagFeaturesPanel} from '..';
import css from './EditTagSettingsWizard.module.css';
export const STUDYABROAD = 'studyabroad';
export const PROGRAMS = 'programs';
export const FEATURES = 'features';


// EditTagSettingsWizardTab component supports these tabs
export const SUPPORTED_TABS = [
  STUDYABROAD, PROGRAMS, FEATURES
];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

// When user has update draft listing, he should be redirected to next EditTagSettingsWizardTab
const redirectAfterDraftUpdate = (params, tab, marketplaceTabs, history) => {
  const currentPathParams = {
    ...params
  };
  const routes = routeConfiguration();
  // Redirect to next tab
  const nextPathParams = pathParamsToNextTab(currentPathParams, tab, marketplaceTabs);
  if (tab == 'features') {
    var to = createResourceLocatorString('TagSettingsPage', routes, nextPathParams, {});
    history.push(to);
  } else {
    var to = createResourceLocatorString('EditTagSettingsPage', routes, nextPathParams, {});
    history.push(to);
  }
};

const EditTagSettingsWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    history,
    allTagSettinsData,
    onUpdateTagSettings,
    onChange,
    updatedTab,
    updateInProgress,
    intl,
  } = props;

  const onCompleteEditTagSettingsWizardTab = (tab, values) => {
    const newUpdateValues = {
      ...allTagSettinsData,
      [tab]: values
    }
    onUpdateTagSettings(newUpdateValues).then((r) => {

      redirectAfterDraftUpdate(params, tab, marketplaceTabs, history);

    })
  };

  const panelProps = tab => {
    return {
      className: css.panel,
      errors,
      allTagSettinsData,
      onChange,
      panelUpdated: updatedTab === tab,
      updateInProgress,
      ready: false,
      disabled: false,
    };
  };

  switch (tab) {
    case STUDYABROAD: {
      const submitButtonTranslationKey = 'EditTagSettingsWizard.saveNewStudyAbroad';
      return (
        <EditStudyAbroadPanel
          {...panelProps(STUDYABROAD)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditTagSettingsWizardTab(tab, values);
          }}
        />
      );
    }
    case PROGRAMS: {
      const submitButtonTranslationKey = 'EditTagSettingsWizard.saveNewPrograms';
      return (
        <EditProgramsPanel
          {...panelProps(PROGRAMS)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditTagSettingsWizardTab(tab, values);
          }}
        />
      );
    }
    case FEATURES: {
      const submitButtonTranslationKey = 'EditTagSettingsWizard.saveNewFeatures';
      return (
        <EditTagFeaturesPanel
          {...panelProps(FEATURES)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditTagSettingsWizardTab(tab, values);
          }}
        />
      );
    }
    default:
      return null;
  }
};

EditTagSettingsWizardTab.defaultProps = {
  allTagSettinsData: null,
  updatedTab: null,
};

const { bool, func, object, shape, string } = PropTypes;

EditTagSettingsWizardTab.propTypes = {
  newListingPublished: bool.isRequired,
  history: shape({
    push: func.isRequired,
    replace: func.isRequired,
  }).isRequired,
  allTagSettinsData: object,
  handleCreateFlowTabScrolling: func.isRequired,
  onUpdateTagSettings: func.isRequired,
  onChange: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,
  intl: intlShape.isRequired,
};

export default EditTagSettingsWizardTab;

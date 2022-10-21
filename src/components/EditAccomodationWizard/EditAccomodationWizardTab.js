import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from '../../util/reactIntl';
import routeConfiguration from '../../routeConfiguration';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers';
import { createResourceLocatorString } from '../../util/routes';
import {
  EditAccomodationDescriptionPanel,
  EditAccomodationFacilityPanel,
  EditAccomodationTypePanel,
  EditAccomodationArrangementFeePanel,
  EditAccomodationDistancePanel,
  EditAccomodationRoomFacilityPanel,
  EditAccomodationPricingPanel,
  EditAccomodationPhotosPanel,
} from '..';
import { v4 as uuidv4 } from 'uuid';
import css from './EditAccomodationWizard.module.css';
export const ROOMFACILITIES = 'roomfacilities';
export const DESCRIPTION = 'description';
export const FACILITIES = 'facilities';
export const DISTANCE = 'distance';
export const TYPE = 'type';
export const PRICING = 'pricing';
export const ARRANGEMENTFEE = 'arrangmentfee';
export const PHOTOS = 'photos';


// EditAccomodationWizardTab component supports these tabs
export const SUPPORTED_TABS = [
  DESCRIPTION,
  FACILITIES,
  DISTANCE,
  TYPE,
  PRICING,
  ROOMFACILITIES,
  ARRANGEMENTFEE,
  PHOTOS
];

const pathParamsToNextTab = (params, tab, marketplaceTabs) => {
  const nextTabIndex = marketplaceTabs.findIndex(s => s === tab) + 1;
  const nextTab =
    nextTabIndex < marketplaceTabs.length
      ? marketplaceTabs[nextTabIndex]
      : marketplaceTabs[marketplaceTabs.length - 1];
  return { ...params, tab: nextTab };
};

// When user has update draft listing, he should be redirected to next EditAccomodationWizardTab
const redirectAfterDraftUpdate = (listingId, params, tab, marketplaceTabs, history) => {
  const currentPathParams = {
    ...params,
    type: LISTING_PAGE_PARAM_TYPE_DRAFT,
    id: listingId,
  };
  const routes = routeConfiguration();

  // Replace current "new" path to "draft" path.
  // Browser's back button should lead to editing current draft instead of creating a new one.
  if (params.type === LISTING_PAGE_PARAM_TYPE_NEW) {
    const draftURI = createResourceLocatorString('EditAccomodationPage', routes, currentPathParams, {});
    history.replace(draftURI);
  }

  // Redirect to next tab
  const nextPathParams = pathParamsToNextTab(currentPathParams, tab, marketplaceTabs);
  if (tab == 'photos') {
    var to = createResourceLocatorString('AccomodationPage', routes, nextPathParams, {});
    history.push(to);
  } else {
    var to = createResourceLocatorString('EditAccomodationPage', routes, nextPathParams, {});
    history.push(to);
  }
};

const EditAccomodationWizardTab = props => {
  const {
    tab,
    marketplaceTabs,
    params,
    errors,
    newListingPublished,
    history,
    listing,
    onUpdateAccomodation,
    onChange,
    updatedTab,
    allAccomodationData,
    updateInProgress,
    intl,
    images,
    onImageUpload,
    onRemoveImage,
    onImageUploadHandler,
    onUpdateImageOrder,
    removeImageFromArray
  } = props;

  const { type, id } = params;
  const isNewURI = type === LISTING_PAGE_PARAM_TYPE_NEW;
  const isDraftURI = type === LISTING_PAGE_PARAM_TYPE_DRAFT;
  const isNewListingFlow = isNewURI || isDraftURI;

  const imageIds = images => {
    images
    return images ? JSON.stringify(images.map((data)=>{
      return data.original
    })) : null;
  };
  const onCompleteEditAccomodationWizardTab = (tab, values) => {
    var accomodation_id = id
    if (id == '00000000-0000-0000-0000-000000000000') {
      accomodation_id = uuidv4()
    }
    if(tab == 'photos') {
      const { images: updatedImages, ...otherValues } = values;
    const imageProperty =
      typeof updatedImages !== 'undefined' ? { images: imageIds(updatedImages)??{} } : {};
      const updateValuesWithImages = { ...otherValues, ...imageProperty };
      const newUpdateValues = {
        ...listing, id: accomodation_id, ...updateValuesWithImages
      }
      
      onUpdateAccomodation(tab, newUpdateValues, allAccomodationData).then((r) => {

        redirectAfterDraftUpdate(accomodation_id, params, tab, marketplaceTabs, history);
      })
    } else {

      const newUpdateValues = {
        ...listing, id: accomodation_id, [tab]: values
      }

      
    onUpdateAccomodation(tab, newUpdateValues, allAccomodationData).then((r) => {

      redirectAfterDraftUpdate(accomodation_id, params, tab, marketplaceTabs, history);
    })
    }
  };

  const panelProps = tab => {
    return {
      className: css.panel,
      errors,
      listing,
      onChange,
      panelUpdated: updatedTab === tab,
      updateInProgress,
      // newListingPublished and fetchInProgress are flags for the last wizard tab
      ready: newListingPublished,
      disabled: false,
      images,
      onRemoveImage,
      onImageUpload,
      onUpdateImageOrder,
      onImageUploadHandler,
      removeImageFromArray
    };
  };

  switch (tab) {
    case DESCRIPTION: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditAccomodationWizard.saveNewDescription'
        : 'EditAccomodationWizard.saveNewDescription';
      return (
        <EditAccomodationDescriptionPanel
          {...panelProps(DESCRIPTION)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditAccomodationWizardTab(tab, values);
          }}
        />
      );
    }
    case FACILITIES: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditAccomodationWizard.saveNewFacilities'
        : 'EditAccomodationWizard.saveNewFacilities';
      return (
        <EditAccomodationFacilityPanel
          {...panelProps(FACILITIES)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditAccomodationWizardTab(tab, values);
          }}
        />
      );
    }
    case DISTANCE: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditAccomodationWizard.saveNewDistance'
        : 'EditAccomodationWizard.saveNewDistance';
      return (
        <EditAccomodationDistancePanel
          {...panelProps(DISTANCE)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditAccomodationWizardTab(tab, values);
          }}
        />
      );
    }
    case TYPE: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditAccomodationWizard.saveNewType'
        : 'EditAccomodationWizard.saveNewType';
      return (
        <EditAccomodationTypePanel
          {...panelProps(TYPE)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditAccomodationWizardTab(tab, values);
          }}
        />
      );
    }

    case ROOMFACILITIES: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditAccomodationWizard.saveNewRoomFacilities'
        : 'EditAccomodationWizard.saveNewRoomFacilities';
      return (
        <EditAccomodationRoomFacilityPanel
          {...panelProps(ROOMFACILITIES)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditAccomodationWizardTab(tab, values);
          }}
        />
      );
    }
    case PRICING: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditAccomodationWizard.saveNewPricing'
        : 'EditAccomodationWizard.saveNewPricing';
      return (
        <EditAccomodationPricingPanel
          {...panelProps(PRICING)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditAccomodationWizardTab(tab, values);
          }}
        />
      );
    }
    case ARRANGEMENTFEE: {
      const submitButtonTranslationKey = isNewListingFlow
        ? 'EditAccomodationWizard.saveNewArrangementFee'
        : 'EditAccomodationWizard.saveNewArrangementFee';

      return (
        <EditAccomodationArrangementFeePanel
          {...panelProps(ARRANGEMENTFEE)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditAccomodationWizardTab(tab, values);
          }}
        />
      );
    }
    case PHOTOS: {
      const submitButtonTranslationKey = 'EditAccomodationWizard.saveNewPhotos';

      return (
        <EditAccomodationPhotosPanel
          {...panelProps(ARRANGEMENTFEE)}
          submitButtonText={intl.formatMessage({ id: submitButtonTranslationKey })}
          onSubmit={values => {
            onCompleteEditAccomodationWizardTab(tab, values);
          }}
        />
      );
    }
    default:
      return null;
  }
};

EditAccomodationWizardTab.defaultProps = {
  listing: null,
  updatedTab: null,
};

const { bool, any, func, object, oneOf, shape, string } = PropTypes;

EditAccomodationWizardTab.propTypes = {
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(SUPPORTED_TABS).isRequired,
  }).isRequired,
  errors: shape({
    createListingDraftError: object,
    publishListingError: object,
    updateListingError: object,
    showListingsError: object,
  }).isRequired,
  newListingPublished: bool.isRequired,
  history: shape({
    push: func.isRequired,
    replace: func.isRequired,
  }).isRequired,

  // We cannot use propTypes.listing since the listing might be a draft.

  handleCreateFlowTabScrolling: func.isRequired,
  onUpdateAccomodation: func.isRequired,
  onChange: func.isRequired,
  updatedTab: string,
  updateInProgress: bool.isRequired,
  intl: intlShape.isRequired,
};

export default EditAccomodationWizardTab;

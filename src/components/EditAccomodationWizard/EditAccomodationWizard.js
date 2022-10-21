import React, { Component } from 'react';
import { any, func, number, object, oneOf, shape, string } from 'prop-types';
import { compose } from 'redux';
import { injectIntl, intlShape } from '../../util/reactIntl';
import classNames from 'classnames';
import { withViewport } from '../../util/contextHelpers';
import { propTypes } from '../../util/types';
import {
  LISTING_PAGE_PARAM_TYPE_DRAFT,
  LISTING_PAGE_PARAM_TYPE_NEW,
  LISTING_PAGE_PARAM_TYPES,
} from '../../util/urlHelpers';
import { ensureCurrentUser } from '../../util/data';
import { types as sdkTypes } from '../../util/sdkLoader';
import uniqueId from 'lodash/uniqueId';
import findIndex from 'lodash/findIndex';
import { NamedRedirect, Tabs } from '..';
const { UUID } = sdkTypes;
import EditAccomodationWizardTab, {
  DESCRIPTION,
  FACILITIES,
  DISTANCE,
  TYPE,
  ROOMFACILITIES,
  PRICING,
  ARRANGEMENTFEE,
  PHOTOS
} from './EditAccomodationWizardTab';
import css from './EditAccomodationWizard.module.css';

// Show availability calendar only if environment variable availabilityEnabled is true
//const availabilityMaybe = config.enableAvailability ? [AVAILABILITY] : [];

// You can reorder these panels.
// Note 1: You need to change save button translations for new listing flow
// Note 2: Ensure that draft listing is created after the first panel
// and listing publishing happens after last panel.
export const TABS = [
  DESCRIPTION,
  FACILITIES,
  DISTANCE,
  TYPE,
  ROOMFACILITIES,
  PRICING,
  ARRANGEMENTFEE,
  PHOTOS
];
// Tabs are horizontal in small screens
const MAX_HORIZONTAL_NAV_SCREEN_WIDTH = 1023;

const tabLabel = (intl, tab) => {
  let key = null;
  if (tab === DESCRIPTION) {
    key = 'EditAccomodationWizard.tabLabelDescription';
  } else if (tab === FACILITIES) {
    key = 'EditAccomodationWizard.tabLabelFacility';
  } else if (tab === DISTANCE) {
    key = 'EditAccomodationWizard.tabLabelDistance';
  } else if (tab === TYPE) {
    key = 'EditAccomodationWizard.tabLabelType';
  } else if (tab === ROOMFACILITIES) {
    key = 'EditAccomodationWizard.tabLabelRoomFacility';
  } else if (tab === PRICING) {
    key = 'EditAccomodationWizard.tabLabelPricing';
  } else if (tab === ARRANGEMENTFEE) {
    key = 'EditAccomodationWizard.tabLabelArrangmentFee';
  } else if (tab === PHOTOS) {
    key = 'EditAccomodationWizard.tabLabelPhotos';
  }

  return intl.formatMessage({ id: key });
};

const getId = () => {
  return uniqueId();
};

/**
 * Check if a wizard tab is completed.
 *
 * @param tab wizard's tab
 * @param listing is contains some specific data if tab is completed
 *
 * @return true if tab / step is completed.
 */
const tabCompleted = (tab, listing) => {
  switch (tab) {
    case DESCRIPTION:
      return listing && Object.keys(listing).length && typeof listing.description !== 'undefined';
    case FACILITIES:
      return listing && Object.keys(listing).length && typeof listing.facilities !== 'undefined';
    case DISTANCE:
      return listing && Object.keys(listing).length && typeof listing.distance !== 'undefined';
    case TYPE:
      return listing && Object.keys(listing).length && typeof listing.type !== 'undefined';
    case ROOMFACILITIES:
      return listing && Object.keys(listing).length && typeof listing.roomfacilities !== 'undefined';
    case PRICING:
      return listing && Object.keys(listing).length && typeof listing.pricing !== 'undefined';
    case ARRANGEMENTFEE:
      return listing && Object.keys(listing).length && typeof listing.arrangmentfee !== 'undefined'
    case PHOTOS:
      return listing && Object.keys(listing).length && typeof listing.images !== 'undefined'
    default:
      return false;
  }
};

/**
 * Check which wizard tabs are active and which are not yet available. Tab is active if previous
 * tab is completed. In edit mode all tabs are active.
 *
 * @param isNew flag if a new listing is being created or an old one being edited
 * @param listing data to be checked
 *
 * @return object containing activity / editability of different tabs of this wizard
 */
const tabsActive = (isNew, listing) => {
  return TABS.reduce((acc, tab) => {
    const previousTabIndex = TABS.findIndex(t => t === tab) - 1;

    const isActive =
      previousTabIndex >= 0 ? !isNew || tabCompleted(TABS[previousTabIndex], listing) : true;
    return { ...acc, [tab]: isActive };
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
const fetchCurrentListing = (profileData, id) => {
  if (profileData?.accomodation && profileData?.accomodation?.length > 0) {
    return profileData?.accomodation.find((acco) => {
      return acco.id == id
    })
  }
  return []
}

// Create a new or edit listing through EditListingWizard
class EditAccomodationWizard extends Component {
  constructor(props) {
    super(props);

    // Having this info in state would trigger unnecessary rerendering
    this.hasScrolledToTab = false;

    this.state = {
      draftId: null,
      showPayoutDetails: false,
      imageUploadRequested: false,
      images: []
    };
    this.submittedValues = {};
    this.onImageUploadHandler = this.onImageUploadHandler.bind(this);
    this.removeImageFromArray = this.removeImageFromArray.bind(this);

    this.handleCreateFlowTabScrolling = this.handleCreateFlowTabScrolling.bind(this);
  }

  handleCreateFlowTabScrolling(shouldScroll) {
    this.hasScrolledToTab = shouldScroll;
  }

  onImageUploadHandler(file) {
    this.setState({ imageUploadRequested: true });
    const fileId = getId();
    const imageData = { file, id: fileId, imageId: null };
    // this.props.onImageUpload(imageData);
    // Show loading overlay
    this.setState({
      images: this.state.images.concat([imageData]),
    });

    // Fake image uploaded state: show image thumbnail
    setTimeout(() => {
      this.setState(prevState => {
        const images = prevState.images;
        const imageIndex = findIndex(images, i => i.id === fileId);
        const updatedImage = { ...imageData, imageId: new UUID(fileId) };
        const updatedImages = [
          ...images.slice(0, imageIndex),
          updatedImage,
          ...images.slice(imageIndex + 1),
        ];
        return {
          images: updatedImages,
        };
      });
    }, 1000);
  }

  removeImageFromArray(imageId) {
    const imageArr = this.state.images;
    const index = findIndex(imageArr, i => i.id === imageId);
    imageArr.splice(index, 1);
    this.setState({ images: imageArr });
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
      page,
      onManageDisableScrolling,
      currentUser,
      ...rest
    } = this.props;

    const selectedTab = params.tab;
    const isNewListingFlow = [LISTING_PAGE_PARAM_TYPE_NEW, LISTING_PAGE_PARAM_TYPE_DRAFT].includes(
      params.type
    );
    const rootClasses = rootClassName || css.root;
    const classes = classNames(rootClasses, className);

    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const allAccomodationData = ensuredCurrentUser?.attributes?.profile?.publicData
    const currentListing = fetchCurrentListing(allAccomodationData, params?.id)
    const imageIds = images => {
      return JSON.parse(images)
    };
    const currentListingImages = currentListing && currentListing.images ? imageIds(currentListing.images) : [];

    // Images not yet connected to the listing
    const imageOrder = page.imageOrder || [];
    const unattachedImages = imageOrder.map(i => page.images[i]);

    const allImages = currentListingImages.concat(unattachedImages);
    const removedImageIds = page.removedImageIds || [];
    const images = allImages.filter(img => {
      return !removedImageIds.includes(img.id);
    });
    const tabsStatus = tabsActive(isNewListingFlow, currentListing);
    // If selectedTab is not active, redirect to the beginning of wizard
    if (!tabsStatus[selectedTab]) {
      const currentTabIndex = TABS.indexOf(selectedTab);
      const nearestActiveTab = TABS.slice(0, currentTabIndex)
        .reverse()
        .find(t => tabsStatus[t]);

      return <NamedRedirect name="EditAccomodationPage" params={{ ...params, tab: nearestActiveTab }} />;
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
      return { name: 'EditAccomodationPage', params: { ...params, tab } };
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
              <EditAccomodationWizardTab
                {...rest}
                key={tab}
                tabId={`${id}_${tab}`}
                tabLabel={tabLabel(intl, tab)}
                tabLinkProps={tabLink(tab)}
                selected={selectedTab === tab}
                disabled={isNewListingFlow && !tabsStatus[tab]}
                tab={tab}
                intl={intl}
                params={params}
                listing={currentListing}
                marketplaceTabs={TABS}
                errors={errors}
                images={images}
                onImageUploadHandler={this.onImageUploadHandler}
                removeImageFromArray={this.removeImageFromArray}
                allAccomodationData={allAccomodationData}
                handleCreateFlowTabScrolling={this.handleCreateFlowTabScrolling}
              />
            );
          })}
        </Tabs>
      </div>
    );
  }
}

EditAccomodationWizard.defaultProps = {
  className: null,
  currentUser: null,
  rootClassName: null,
  updateInProgress: false,
};

EditAccomodationWizard.propTypes = {
  id: string.isRequired,
  className: string,
  currentUser: propTypes.currentUser,
  rootClassName: string,
  params: shape({
    id: string.isRequired,
    slug: string.isRequired,
    type: oneOf(LISTING_PAGE_PARAM_TYPES).isRequired,
    tab: oneOf(TABS).isRequired,
  }).isRequired,

  errors: shape({
    createListingDraftError: object,
    updateListingError: object,
    publishListingError: object,
    showListingsError: object,
  }).isRequired,
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
)(EditAccomodationWizard);

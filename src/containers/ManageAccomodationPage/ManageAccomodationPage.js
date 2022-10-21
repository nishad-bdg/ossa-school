import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import {
  ManageAccomodationCard,
  Page,
  PaginationLinks,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
} from '../../components';
import { TopbarContainer } from '..';

import { closeListing, openListing, getOwnListingsById } from './ManageListingsPage.duck';
import css from './ManageAccomodationPage.module.css';
import { ensureCurrentUser } from '../../util/data';

export class ManageAccomodationPageComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { listingMenuOpen: null };
    this.onToggleMenu = this.onToggleMenu.bind(this);
  }

  onToggleMenu(listing) {
    this.setState({ listingMenuOpen: listing });
  }

  render() {
    const {
      closingListing,
      closingListingError,
      listings,
      onCloseListing,
      onOpenListing,
      openingListing,
      openingListingError,
      pagination,
      queryInProgress,
      queryListingsError,
      queryParams,
      scrollingDisabled,
      intl,
      currentUser,
    } = this.props;

    const hasPaginationInfo = !!pagination && pagination.totalItems != null;
    const listingsAreLoaded = !queryInProgress && hasPaginationInfo;

    const loadingResults = (
      <h2>
        <FormattedMessage id="ManageAccomodationPage.loadingOwnListings" />
      </h2>
    );

    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const allAccomodationData = ensuredCurrentUser?.attributes?.profile?.publicData?.accomodation
    //console.log('allAccomodationData', currentUser, allAccomodationData)

    const queryError = (
      <h2 className={css.error}>
        <FormattedMessage id="ManageAccomodationPage.queryError" />
      </h2>
    );

    const noResults =
      allAccomodationData?.length === 0 ? (
        <h1 className={css.title}>
          <FormattedMessage id="ManageAccomodationPage.noResults" />
        </h1>
      ) : null;

    const heading =
      allAccomodationData?.length > 0 ? (
        <h1 className={css.title}>
          <FormattedMessage
            id="ManageAccomodationPage.youHaveListings"
            values={{ count: allAccomodationData.length }}
          />
        </h1>
      ) : (
        noResults
      );

    const page = queryParams ? queryParams.page : 1;
    const paginationLinks = null
      // listingsAreLoaded && pagination && pagination.totalPages > 1 ? (
      //   <PaginationLinks
      //     className={css.pagination}
      //     pageName="AccomodationPage"
      //     pageSearchParams={{ page }}
      //     pagination={pagination}
      //   />
      // ) : null;

    const listingMenuOpen = this.state.listingMenuOpen;
    const closingErrorListingId = !!closingListingError && closingListingError.listingId;
    const openingErrorListingId = !!openingListingError && openingListingError.listingId;

    const title = intl.formatMessage({ id: 'ManageAccomodationPage.title' });

    const panelWidth = 62.5;
    // Render hints for responsive image
    const renderSizes = [
      `(max-width: 767px) 100vw`,
      `(max-width: 1920px) ${panelWidth / 2}vw`,
      `${panelWidth / 3}vw`,
    ].join(', ');

    return (
      <Page title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="ManageAccomodationPage" />
            <UserNav selectedPageName="AccomodationPage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            {queryInProgress ? loadingResults : null}
            {queryListingsError ? queryError : null}
            <div className={css.listingPanel}>
              {heading}
              <div className={css.listingCards}>
                {allAccomodationData?.map(l => (
                  <ManageAccomodationCard
                    className={css.listingCard}
                    key={l.id}
                    listing={l}
                    isMenuOpen={!!listingMenuOpen && listingMenuOpen.id === l.id}
                    actionsInProgressListingId={openingListing || closingListing}
                    onToggleMenu={this.onToggleMenu}
                    onCloseListing={onCloseListing}
                    onOpenListing={onOpenListing}
                    hasOpeningError={openingErrorListingId === l.id}
                    hasClosingError={closingErrorListingId === l.id}
                    renderSizes={renderSizes}
                  />
                ))}
              </div>
              {paginationLinks}
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

ManageAccomodationPageComponent.defaultProps = {
  currentUser: null,
  listings: [],
  pagination: null,
  queryListingsError: null,
  queryParams: null,
  closingListing: null,
  closingListingError: null,
  openingListing: null,
  openingListingError: null,
};

const { arrayOf, bool, func, object, shape, string } = PropTypes;

ManageAccomodationPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  closingListing: shape({ uuid: string.isRequired }),
  closingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  listings: arrayOf(propTypes.ownListing),
  onCloseListing: func.isRequired,
  onOpenListing: func.isRequired,
  openingListing: shape({ uuid: string.isRequired }),
  openingListingError: shape({
    listingId: propTypes.uuid.isRequired,
    error: propTypes.error.isRequired,
  }),
  pagination: propTypes.pagination,
  queryInProgress: bool.isRequired,
  queryListingsError: propTypes.error,
  queryParams: object,
  scrollingDisabled: bool.isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  const {
    currentPageResultIds,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  } = state.ManageListingsPage;
  const userData = ensureCurrentUser(currentUser)
  const listings = getOwnListingsById(state, currentPageResultIds);
  //const listings = userData?.attributes?.profile?.publicData?.accomodation
  return {
    currentUser,
    currentPageResultIds,
    listings,
    pagination,
    queryInProgress,
    queryListingsError,
    queryParams,
    scrollingDisabled: isScrollingDisabled(state),
    openingListing,
    openingListingError,
    closingListing,
    closingListingError,
  };
};

const mapDispatchToProps = dispatch => ({
  onCloseListing: listingId => dispatch(closeListing(listingId)),
  onOpenListing: listingId => dispatch(openListing(listingId)),
});

const ManageAccomodationPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(ManageAccomodationPageComponent);

export default ManageAccomodationPage;
